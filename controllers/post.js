const Post = require("../models/post");
const Tag = require("../models/tags");

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
  const { editTag, content } = req.body;
  Post.findByIdAndUpdate(
    req.params.postId,
    {
      $pull: { tags: editTag },
      content: content,
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(500).json({ msg: "Server Error" });
      }
      return res.status(200).json(result);
    }
  );
};
