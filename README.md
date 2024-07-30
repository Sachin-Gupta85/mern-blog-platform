# ✍️ mern-blog-platform — blog with comments (MERN + Python)

> Publish posts with tags and threaded comments; posts get clean slugs. **React** + **Express** + **MongoDB**, with **Python** content utilities and a cross-stack test harness.

![React](https://img.shields.io/badge/React-18-61dafb)
![Express](https://img.shields.io/badge/Express-4-000000)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248)
![Tests](https://img.shields.io/badge/tests-jest%20%2B%20pytest%20%2B%20vitest-brightgreen)

## ✨ Features
- Posts with auto-generated **unique slugs**, tags, and embedded comments.
- Tag filter (`?tag=`), fetch a post by slug, add comments.
- **Python companion** (`pytools/markdown_tools.py`): slugify (matching the
  server), reading-time estimate, and word-boundary excerpts (pytest).
- Express API tested with Jest + mongodb-memory-server.

## 🚀 Run
```bash
docker compose up --build
cd client && npm install && npm run dev
```

## ✅ Test
```bash
./run_harness.sh      # jest (5) + pytest (3) + vitest (1)
```

## 🔌 API
`GET /api/posts?tag=` · `POST /api/posts` · `GET /api/posts/{slug}` ·
`POST /api/posts/{id}/comments` · `DELETE /api/posts/{id}`

## 📝 License
MIT — see [LICENSE](LICENSE).
