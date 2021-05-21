const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPost,
  getPostByTag,
  getPostById,
  editPost,
  deletePost,
} = require("../controllers/post");

router.post("/create", createPost);
router.get("/allPost", getAllPost);
router.get("/getPostByTag", getPostByTag);
router.get("/getPostById/:postId", getPostById);
router.put("/edit/:postId", editPost);
router.delete("/delete/:postId", deletePost);

module.exports = router;
