const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');
const fetch = require('node-fetch');
const { fetchRelatedPost } = require('../relatedPosts/relatedPostSlice');

// initial State
const initialState = {
  loading: false,
  singleDataPost: {},
  error: '',
};

// create async thunk
const fetchPost = createAsyncThunk(
  'post/fetchPosts',
  async (_, { dispatch }) => {
    const randomPostId = Math.floor(Math.random() * 100 || 1);
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/10' + randomPostId
    );
    const posts = await response.json();
    dispatch(fetchRelatedPost(post.title))

    return posts;
  }
);

const postSlice = createSlice({
  name: 'singlePost',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state, action) => {
        state.loading = true, 
        state.error = '';
      })

      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.singlePost = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        (state.loading = false),
          (state.singlePost = []),
          (state.error = action.payload.message);
      });
  },
});

module.exports = postSlice.reducer;
module.exports.fetchPost = fetchPost;
