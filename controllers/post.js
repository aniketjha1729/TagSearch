const Post = require("../models/post");

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

exports.getAllPost = (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getPostByTag = (req, res) => {
  const { tags } = req.body;
  Post.find({ tags: { $in: [tags] } }).then((filterPost) => {
    return res.status(200).json(filterPost);
  });
};

exports.getPostById = (req, res) => {
  Post.findById(req.params.postId).then((post) => {
    return res.status(200).json(post);
  });
};

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

exports.deletePost = (req, res) => {
  Post.findByIdAndRemove(req.params.postId, (err, delPost) => {
    if (!err) {
      return res.status(200).json({ msg: "Deletion Successful" });
    } else {
      return res.status(500).json({ msg: "Server Error" });
    }
  });
};
