import { Link } from "react-router-dom";

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogCard({ blog }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink-800/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <img
        src={blog.cover_image}
        alt=""
        className="h-48 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3 text-xs uppercase tracking-wide text-ink-800/60">
          <span>{blog.category}</span>
          <time dateTime={blog.created_at}>{formatDate(blog.created_at)}</time>
        </div>
        <h2 className="font-serif text-2xl leading-tight">{blog.title}</h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-ink-800/80">{blog.excerpt}</p>
        <Link to={`/blog/${blog.slug}`} className="mt-5 text-sm font-semibold text-accent-600">
          Read More
        </Link>
      </div>
    </article>
  );
}
