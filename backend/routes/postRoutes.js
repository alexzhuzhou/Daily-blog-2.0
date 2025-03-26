const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const verifyToken = require("../middleware/verifyToken");

//public routes
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);

//protected routes
router.post("/", verifyToken, postController.createPost);
router.put("/:id", verifyToken, postController.updatePost);
router.delete("/:id", verifyToken, postController.deletePost);

module.exports = router;
