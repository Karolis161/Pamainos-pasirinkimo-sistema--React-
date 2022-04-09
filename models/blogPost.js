const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema({
  username: String,
  name: String,
  lastname: String,
  email: String,
  password: String,
  hours: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

const BlogPost = mongoose.model("users", BlogPostSchema);

module.exports = BlogPost;
