const express = require("express");
const cors = require("cors");
const posts = require("./routes/posts");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/posts", posts);

module.exports = app;
