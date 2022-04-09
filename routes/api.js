const express = require("express");
const router = express.Router();
const BlogPost = require("../models/blogPost");

router.get("/", (req, res) => {
  BlogPost.find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
