const request = require("supertest");
const app = require("../src/app");

describe("blog API", () => {
  test("create generates a slug", async () => {
    const res = await request(app).post("/api/posts").send({ title: "Hello, World!", body: "hi", tags: ["intro"] });
    expect(res.status).toBe(201);
    expect(res.body.slug).toBe("hello-world");
  });

  test("duplicate titles get unique slugs", async () => {
    await request(app).post("/api/posts").send({ title: "Same Title" });
    const b = await request(app).post("/api/posts").send({ title: "Same Title" });
    expect(b.body.slug).toBe("same-title-2");
  });

  test("tag filter and fetch by slug", async () => {
    await request(app).post("/api/posts").send({ title: "Tagged", tags: ["x"] });
    expect((await request(app).get("/api/posts?tag=x")).body.length).toBe(1);
    expect((await request(app).get("/api/posts/tagged")).body.title).toBe("Tagged");
  });

  test("add comments", async () => {
    const { body } = await request(app).post("/api/posts").send({ title: "Discuss" });
    const res = await request(app).post(`/api/posts/${body.id}/comments`).send({ author: "me", body: "nice" });
    expect(res.status).toBe(201);
    expect(res.body.comments).toHaveLength(1);
    expect(res.body.comments[0].author).toBe("me");
  });

  test("validation and 404", async () => {
    expect((await request(app).post("/api/posts").send({ title: "" })).status).toBe(400);
    expect((await request(app).get("/api/posts/missing")).status).toBe(404);
  });
});
