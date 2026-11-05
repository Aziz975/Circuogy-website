const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, { method = "GET", body } = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      credentials: "include", // sends/receives the httpOnly session cookie
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Cannot reach the server. Check your connection and try again.");
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.message || "Something went wrong. Please try again.");
    error.status = res.status;
    error.fields = data.errors;
    throw error;
  }
  return data;
}

export const authApi = {
  login: (email, password) => request("/auth/login", { method: "POST", body: { email, password } }),
  logout: () => request("/auth/logout", { method: "POST" }),
  me: () => request("/auth/me"),
  changePassword: (email, currentPassword, newPassword) =>
    request("/auth/change-password", {
      method: "POST",
      body: { email, currentPassword, newPassword },
    }),
};

const qs = (params = {}) => {
  const q = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
  ).toString();
  return q ? `?${q}` : "";
};

export const blogApi = {
  // public site
  listPublished: (params) => request(`/blogs${qs(params)}`),
  getBySlug: (slug) => request(`/blogs/${encodeURIComponent(slug)}`),
  // admin dashboard
  adminList: (params) => request(`/admin/blogs${qs(params)}`),
  adminGet: (id) => request(`/admin/blogs/${id}`),
  create: (post) => request("/admin/blogs", { method: "POST", body: post }),
  update: (id, post) => request(`/admin/blogs/${id}`, { method: "PUT", body: post }),
  remove: (id) => request(`/admin/blogs/${id}`, { method: "DELETE" }),

 uploadImage: async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch(`${API_URL}/admin/blogs/upload`, {
      method: "POST",
      credentials: "include",
      body: fd,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Image upload failed.");
    return data;
  },

};
