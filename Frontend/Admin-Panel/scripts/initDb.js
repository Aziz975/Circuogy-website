// Creates the database (if missing) and all tables from sql/schema.sql.
// Also upgrades an EXISTING blogs table by adding any missing columns,
// so it is safe to re-run:  npm run db:init
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import env from '../config/env.js';

// column name -> ALTER statement (run only when the column is missing)
const BLOG_COLUMNS = {
  author: 'ALTER TABLE blogs ADD COLUMN author VARCHAR(255) NULL AFTER category',
  publication_date: 'ALTER TABLE blogs ADD COLUMN publication_date VARCHAR(30) NULL AFTER author',
  description: 'ALTER TABLE blogs ADD COLUMN description TEXT NULL AFTER publication_date',
  image: 'ALTER TABLE blogs ADD COLUMN image VARCHAR(500) NULL AFTER content',
};

(async () => {
  if (!/^[A-Za-z0-9_]+$/.test(env.db.database)) {
    console.error('DB_NAME may only contain letters, numbers and underscores.');
    process.exit(1);
  }

  const conn = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    multipleStatements: true,
  });

  try {
    await conn.query(
      `CREATE DATABASE IF NOT EXISTS \`${env.db.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    await conn.query(`USE \`${env.db.database}\``);
    const sql = fs.readFileSync(
      path.join(path.dirname(fileURLToPath(import.meta.url)), '../sql/schema.sql'),
      'utf8'
    );
    await conn.query(sql);

    // Upgrade an older blogs table (created from the previous schema).
    const [existing] = await conn.query('SHOW COLUMNS FROM blogs');
    const have = new Set(existing.map((c) => c.Field));

    for (const [column, alter] of Object.entries(BLOG_COLUMNS)) {
      if (!have.has(column)) {
        await conn.query(alter);
        have.add(column);
        console.log(`Added blogs.${column}`);

        // Carry over data from the old column names, if they exist.
        if (column === 'description' && have.has('excerpt')) {
          await conn.query('UPDATE blogs SET description = excerpt WHERE description IS NULL');
        }
        if (column === 'image' && have.has('cover_image')) {
          await conn.query('UPDATE blogs SET image = cover_image WHERE image IS NULL');
        }
      }
    }

    console.log(`Database "${env.db.database}" is ready.`);
  } catch (err) {
    console.error('Database setup failed:', err.message);
    process.exitCode = 1;
  } finally {
    await conn.end();
  }
})();

