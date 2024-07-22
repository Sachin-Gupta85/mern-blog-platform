const BASE = import.meta.env?.VITE_API_URL || "";
async function req(path, opts) {
  const res = await fetch(`${BASE}/api${path}`, {
    headers: { "Content-Type": "application/json" }, ...opts });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.status === 204 ? null : res.json();
}
export const listPosts = (tag = "") => req(`/posts${tag ? `?tag=${tag}` : ""}`);
export const createPost = (p) => req("/posts", { method: "POST", body: JSON.stringify(p) });
export const addComment = (id, c) => req(`/posts/${id}/comments`, { method: "POST", body: JSON.stringify(c) });
export const deletePost = (id) => req(`/posts/${id}`, { method: "DELETE" });
