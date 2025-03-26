
const Post = require("../models/Post");
const User = require("../models/User");

//create new post
exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = new Post({
      title,
      content,
      author: req.user.id
    });

    await newPost.save();
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err.message });
  }
};

//get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
};

//get single post by id
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error fetching post", error: err.message });
  }
};

//update post by id
exports.updatePost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Optional: Check if the user is the post author
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized to update this post" });

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();
    res.status(200).json({ message: "Post updated", post });
  } catch (err) {
    res.status(500).json({ message: "Error updating post", error: err.message });
  }
};

//delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized to delete this post" });

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", error: err.message });
  }
};
