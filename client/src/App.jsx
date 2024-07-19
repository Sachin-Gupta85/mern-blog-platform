import React, { useEffect, useState } from "react";
import { listPosts, createPost, deletePost } from "./api.js";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function refresh() { setPosts(await listPosts()); }
  useEffect(() => { refresh(); }, []);

  async function onAdd(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const tags = (body.match(/#(\w+)/g) || []).map((t) => t.slice(1));
    await createPost({ title: title.trim(), body, tags });
    setTitle(""); setBody(""); refresh();
  }

  return (
    <main style={{ maxWidth: 680, margin: "2rem auto", fontFamily: "system-ui" }}>
      <h1>✍️ Blog</h1>
      <form onSubmit={onAdd} style={{ display: "grid", gap: 8, marginBottom: 20 }}>
        <input aria-label="title" placeholder="Post title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea aria-label="body" placeholder="Write… (#tags supported)" value={body} onChange={(e) => setBody(e.target.value)} />
        <button type="submit">Publish</button>
      </form>
      {posts.map((p) => (
        <article key={p.id} style={{ borderBottom: "1px solid #eee", paddingBottom: 12, marginBottom: 12 }}>
          <h2>{p.title} <small style={{ color: "#888" }}>/{p.slug}</small></h2>
          <p style={{ whiteSpace: "pre-wrap" }}>{p.body}</p>
          <small>{p.tags.map((t) => `#${t}`).join(" ")} · {p.comments.length} comments</small>
          <button onClick={async () => { await deletePost(p.id); refresh(); }} style={{ float: "right" }}>Delete</button>
        </article>
      ))}
    </main>
  );
}
