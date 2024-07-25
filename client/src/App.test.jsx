import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "./App.jsx";

describe("Blog App", () => {
  beforeEach(() => vi.restoreAllMocks());
  it("renders a post with its slug and comment count", async () => {
    globalThis.fetch = vi.fn(() => Promise.resolve({
      ok: true, status: 200,
      json: async () => [{ id: "1", title: "Hello", slug: "hello", body: "hi", tags: ["intro"], comments: [{}] }],
    }));
    render(<App />);
    await waitFor(() => expect(screen.getByText("Hello")).toBeInTheDocument());
    expect(screen.getByText(/1 comments/)).toBeInTheDocument();
  });
});
