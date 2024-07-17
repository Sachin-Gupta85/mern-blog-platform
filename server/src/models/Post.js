const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  { author: { type: String, default: "anon", trim: true }, body: { type: String, required: true, trim: true } },
  { timestamps: true, _id: true }
);

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true },
    body: { type: String, default: "" },
    tags: { type: [String], default: [] },
    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true }
);

postSchema.set("toJSON", {
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("Post", postSchema);
