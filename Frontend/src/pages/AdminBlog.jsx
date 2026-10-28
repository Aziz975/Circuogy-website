
import React, { useState } from "react";

import {
  Upload,
  BookOpen,
  Plus,
  Search,
  Pencil,
  Trash2,
  LockKeyhole,
  LogOut,
  Image as ImageIcon,
  Save,
  Send,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../lib/api";

const initialArticle = {
  id: 6,
  category: "Founder Growth",
  author: "Saeem Rizvi",
  date: "Oct 24, 2026",
  title: "Circularity Is India's Competitive Advantage",
  image: "/images/India’s Circularity Advantage.png",
  description:
    "Why India can leapfrog the mine-heavy path and lead in circular critical minerals.",
  content: "",
  status: "draft",
};

const emptyArticle = {
  id: null,
  category: "",
  author: "",
  date: new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }),
  title: "",
  image: "",
  description: "",
  content: "",
  status: "draft",
};

export default function AdminBlog({ blogs: initialBlogs = [] }) {
  const navigate = useNavigate();

const handleLogout = async () => {
  if (!window.confirm("Are you sure you want to log out?")) return;

  try {
    await authApi.logout();
  } catch (err) {
    console.error("Logout failed:", err);
  } finally {
    navigate("/admin", { replace: true });
  }
};
  const [blogs, setBlogs] = useState(() =>
    initialBlogs.length > 0 ? initialBlogs : [initialArticle]
  );

  const [form, setForm] = useState({ ...initialArticle });
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [nextId, setNextId] = useState(() => {
    const maxId = Math.max(
      6,
      ...initialBlogs.map((blog) => Number(blog.id) || 0)
    );
    return maxId + 1;
  });

  const updateField = (field, value) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === "title" && editingId === null) {
        updated.slug = value
          .toLowerCase()
          .trim()
          .replace(/['’]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      }

      return updated;
    });
  };

  const resetForm = () => {
    setForm({ ...emptyArticle });
    setEditingId(null);
  };

  const handleSubmit = (status) => {
    if (!form.title.trim()) {
      alert("Please enter an article title.");
      return;
    }

    if (!form.category) {
      alert("Please select a category.");
      return;
    }

    const article = {
      ...form,
      id: editingId ?? nextId,
      title: form.title.trim(),
      status,
    };

    if (editingId !== null) {
      setBlogs((prev) =>
        prev.map((blog) =>
          blog.id === editingId ? article : blog
        )
      );
    } else {
      setBlogs((prev) => [article, ...prev]);
      setNextId((prev) => prev + 1);
    }

    resetForm();
  };

  const handleEdit = (blog) => {
    setForm({
      ...emptyArticle,
      ...blog,
      slug:
        blog.slug ||
        (blog.title || "")
          .toLowerCase()
          .trim()
          .replace(/['’]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
    });

    setEditingId(blog.id);

    document.getElementById("create-article")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) {
      return;
    }

    setBlogs((prev) => prev.filter((blog) => blog.id !== id));

    if (editingId === id) {
      resetForm();
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const query = search.toLowerCase();

    return [
      blog.title,
      blog.author,
      blog.category,
      blog.description,
    ].some((value) => (value || "").toLowerCase().includes(query));
  });

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-800">
      {/* ================= HEADER ================= */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-8">
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-teal-700">
              CIRCULOGY
            </p>
            <h1 className="mt-1 text-xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
           

           <button
  type="button"
  onClick={handleLogout}
  className="flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
>
  <LogOut size={17} />
  Logout
</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-12 px-5 py-8 md:px-8 md:py-10">
        {/* ================= BLOG MANAGEMENT ================= */}
        <section id="articles">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold tracking-wider text-teal-700">
                CONTENT MANAGEMENT
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Your Articles
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View and manage your Circulogy journal articles.
              </p>
            </div>

            <a
              href="#create-article"
              onClick={resetForm}
              className="flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
            >
              <Plus size={18} />
              Create Article
            </a>
          </div>

          {/* Search bar */}
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5">
            <Search size={19} className="text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by article title, author, or category..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Existing articles */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <BookOpen size={19} className="text-teal-700" />
                <h3 className="font-semibold text-slate-900">
                  All Blog Posts
                </h3>
              </div>

              <span className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800">
                {filteredBlogs.length} articles
              </span>
            </div>

            {filteredBlogs.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px] text-left">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Article</th>
                      <th className="px-5 py-4 font-semibold">Author</th>
                      <th className="px-5 py-4 font-semibold">Category</th>
                      <th className="px-5 py-4 font-semibold">Date</th>
                      <th className="px-5 py-4 font-semibold">Status</th>
                      <th className="px-5 py-4 text-right font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredBlogs.map((blog) => (
                      <tr
                        key={blog.id}
                        className="transition hover:bg-slate-50/70"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {blog.image ? (
                              <img
                                src={blog.image}
                                alt={blog.imageCaption || blog.title || ""}
                                className="h-12 w-16 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                                <ImageIcon size={20} />
                              </div>
                            )}

                            <div className="max-w-xs">
                              <p className="font-semibold text-slate-800">
                                {blog.title || "Untitled Article"}
                              </p>

                              <p className="mt-1 truncate text-xs text-slate-400">
                                {blog.description || "No description"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {blog.author || "—"}
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-block rounded-full bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-800">
                            {blog.category || "Uncategorized"}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-500">
                          {blog.date || "—"}
                        </td>

                       

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                              blog.status === "published"
                                ? "bg-green-50 text-green-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {blog.status || "published"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(blog)}
                              aria-label={`Edit ${blog.title || "article"}`}
                              className="rounded-lg border border-slate-200 p-2.5 text-slate-600 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(blog.id)}
                              aria-label={`Delete ${blog.title || "article"}`}
                              className="rounded-lg border border-slate-200 p-2.5 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  <BookOpen size={25} />
                </div>

                <h3 className="font-semibold text-slate-900">
                  No articles to display
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  {search
                    ? "No articles match your search. Try another keyword."
                    : "Create your first journal article using the editor below."}
                </p>

                <a
                  href="#create-article"
                  onClick={resetForm}
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-800"
                >
                  <Plus size={17} />
                  Create an article
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ================= CREATE / EDIT ARTICLE ================= */}
        <section id="create-article" className="scroll-mt-8">
          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold tracking-wider text-teal-700">
              CONTENT EDITOR
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              {editingId !== null ? "Edit Article" : "Create a New Article"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Share fresh perspectives, practical insights, and ideas that help
              founders and businesses grow.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit("published");
            }}
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_35px_rgba(15,23,42,0.04)] md:p-9"
          >
            <div className="space-y-7">
              {/* Article ID and Date */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Article ID
                  </label>

                  <input
                    type="number"
                    value={form.id ?? ""}
                    readOnly
                    placeholder="Generated automatically"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-500 outline-none"
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    IDs are assigned automatically to new articles.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Publication Date
                  </label>

                  <input
                    type="text"
                    value={form.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    placeholder="Oct 24, 2026"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                  />
                </div>
              </div>

              {/* Article Title */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Article Title
                </label>

                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Give your article a compelling title"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                />
              </div>

            
              {/* Author and Category */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Author Name
                  </label>

                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => updateField("author", e.target.value)}
                    placeholder="Enter author name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Category
                  </label>

                  <select
                    required
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    <option value="Startup Mentoring">
                      Startup Mentoring
                    </option>
                    <option value="Founder Growth">Founder Growth</option>
                    <option value="STRATEGY & SCALE">
                      Strategy &amp; Scale
                    </option>
                    <option value="Digital India">Digital India</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Short Description
                </label>

                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    updateField("description", e.target.value)
                  }
                  placeholder="Write a short introduction to your article..."
                  className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                />
              </div>

              {/* Content */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Article Content
                </label>

                <textarea
                  rows={9}
                  value={form.content}
                  onChange={(e) => updateField("content", e.target.value)}
                  placeholder="Start writing your article..."
                  className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3.5 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                />
              </div>

              {/* Image */}
             
{/* Direct Cover Image Upload */}
<div>
  <label className="mb-2 block text-sm font-semibold text-slate-800">
    Cover Image
  </label>

  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-5">
    {form.image ? (
      <div className="space-y-4">
        <img
          src={form.image}
          alt={form.imageCaption || form.title || "Cover preview"}
          className="max-h-64 w-full rounded-xl border border-slate-200 object-cover"
        />

        <div className="flex flex-wrap gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            <ImageIcon size={17} />
            Change Image

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                if (
                  !["image/png", "image/jpeg", "image/webp"].includes(
                    file.type
                  )
                ) {
                  alert("Please select a PNG, JPG, or WebP image.");
                  e.target.value = "";
                  return;
                }

                if (file.size > 5 * 1024 * 1024) {
                  alert("Image size must be less than 5 MB.");
                  e.target.value = "";
                  return;
                }

                const reader = new FileReader();

                reader.onload = () => {
                  updateField("image", reader.result);
                };

                reader.readAsDataURL(file);
                e.target.value = "";
              }}
            />
          </label>

          <button
            type="button"
            onClick={() => updateField("image", "")}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Remove Image
          </button>
        </div>
      </div>
    ) : (
      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 py-7 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
          <ImageIcon size={24} strokeWidth={1.7} />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-800">
            Upload your article cover image
          </p>
          <p className="mt-1 text-xs text-slate-500">
            PNG, JPG, or WebP · Maximum 5 MB
          </p>
        </div>

        <span className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white">
          <Upload size={17} />
          Choose Image
        </span>

        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            if (
              !["image/png", "image/jpeg", "image/webp"].includes(
                file.type
              )
            ) {
              alert("Please select a PNG, JPG, or WebP image.");
              e.target.value = "";
              return;
            }

            if (file.size > 5 * 1024 * 1024) {
              alert("Image size must be less than 5 MB.");
              e.target.value = "";
              return;
            }

            const reader = new FileReader();

            reader.onload = () => {
              updateField("image", reader.result);
            };

            reader.readAsDataURL(file);
            e.target.value = "";
          }}
        />
      </label>
    )}
  </div>
</div>

            

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Article Status
                </label>

                <p className="text-sm leading-6 text-slate-500">
                  Save Draft keeps the article as a draft in this dashboard.
                  Publish Article marks it as published.
                </p>
              </div>

              {/* Form buttons */}
              <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => handleSubmit("draft")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Save size={17} />
                  Save Draft
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
                >
                  <Send size={17} />
                  {editingId !== null ? "Update Article" : "Publish Article"}
                </button>

                {editingId !== null && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>
          </form>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Circulogy. Admin Dashboard.
        </footer>
      </main>
    </div>
  );
}
