const express = require("express");
const Post = require("../models/Post");
const { slugify } = require("../slug");

const router = express.Router();

router.get("/", async (req, res) => {
  const q = req.query.tag ? { tags: req.query.tag } : {};
  res.json(await Post.find(q).sort({ createdAt: -1 }));
});

router.post("/", async (req, res) => {
  const { title, body = "", tags = [] } = req.body;
  if (!title || !title.trim()) return res.status(400).json({ error: "title required" });
  const base = slugify(title) || "post";
  let slug = base;
  for (let i = 2; await Post.findOne({ slug }); i++) slug = `${base}-${i}`;
  const post = await Post.create({ title: title.trim(), slug, body, tags });
  res.status(201).json(post);
});

router.get("/:slug", async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) return res.status(404).json({ error: "not found" });
  res.json(post);
});

router.post("/:id/comments", async (req, res) => {
  const { author, body } = req.body;
  if (!body || !body.trim()) return res.status(400).json({ error: "comment body required" });
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: { author: author || "anon", body: body.trim() } } },
    { new: true, runValidators: true }
  );
  if (!post) return res.status(404).json({ error: "not found" });
  res.status(201).json(post);
});

router.delete("/:id", async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ error: "not found" });
  res.status(204).end();
});

module.exports = router;
