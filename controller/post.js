const express = require('express');
const router = express.Router();
const store = require('../rtk/app/store');
const fetchPost = require('../rtk/features/post/postSlice');

router.get('/', _, (res) => {
  store.dispatch(fetchPost());
  const { singlePost, relatedPosts } = store.getState();
  const { singleDataPost } = singlePost;
  const { relatedDataPosts } = relatedPosts;
  res.render('index', {
    data: {
      singleDataPost,
      imgUrl: 'https://picsum.photos/200/300',
      imageTitle: 'Single Post Title',
    },
    relatedDataPosts,
    username: 'Ahmed Ali',
  });
});

module.exports = router;
