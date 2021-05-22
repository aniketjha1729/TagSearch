const Post = require("../models/post");

//@type:POST
//@desc:creating Post
exports.createPost = (req, res) => {
  const { tags, content } = req.body;
  const newPost = new Post({
    content,
    tags: Array.isArray(tags)
      ? tags
      : tags.split(",").map((tags) => tags.trim()),
  });
  newPost
    .save()
    .then((newPost) => {
      res.status(200).json(newPost);
    })
    .catch((err) => {
      console.log(err);
    });
};

//@type:GET
//@desc:get All Posts
exports.getAllPost = (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
};

//@type:GET
//@desc:get Posts by specific tagName
exports.getPostByTag = (req, res) => {
  Post.find({ tags: { $in: [ req.params.tags] } }).then((filterPost) => {
    return res.status(200).json(filterPost);
  });
};

//@type:GET
//@desc:get Posts by specific postId
exports.getPostById = (req, res) => {
  Post.findById(req.params.postId).then((post) => {
    return res.status(200).json(post);
  });
};

//@type:PUT
//@desc:edit Post
exports.editPost = (req, res) => {
  const { tags, content } = req.body;
  let editedPost = {
    content,
    tags: Array.isArray(tags)
      ? tags
      : tags.split(",").map((tags) => tags.trim()),
  };
  Post.findByIdAndUpdate(
    req.params.postId,
    { $set: editedPost },
    { new: true },
    (err, post) => {
      if (!err) {
        return res.status(200).json(post);
      } else {
        return res.status(500).json({ msg: "Server Error" });
      }
    }
  );
};

//@type:DELETE
//@desc:delete Post by specific Id
exports.deletePost = (req, res) => {
  Post.findByIdAndRemove(req.params.postId, (err, delPost) => {
    if (!err) {
      return res.status(200).json({ msg: "Deletion Successful" });
    } else {
      return res.status(500).json({ msg: "Server Error" });
    }
  });
};
