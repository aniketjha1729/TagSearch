const express = require("express");
const router = express.Router();

//Importing controllers form "../controllers"
const {
  createPost,
  getAllPost,
  getPostByTag,
  getPostById,
  editPost,
  deletePost,
} = require("../controllers/post");

//End Point: http://localhost:5000/post/create
router.post("/create", createPost);
//End Point: http://localhost:5000/post/allPost
router.get("/allPost", getAllPost);
//End Point: http://localhost:5000/post/getPostByTag/(tagsName)
router.get("/getPostByTag/:tags", getPostByTag);
//End Point: http://localhost:5000/post/getPostById/(postId)
router.get("/getPostById/:postId", getPostById);
//End Point: http://localhost:5000/post/edit/(postId)
router.put("/edit/:postId", editPost);
//End Point: http://localhost:5000/post/delete/(postId)
router.delete("/delete/:postId", deletePost);

module.exports = router;
