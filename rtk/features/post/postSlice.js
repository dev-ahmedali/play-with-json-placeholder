const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');
const fetch = require('node-fetch');

// initial State
const initialState = {
  loading: false,
  singlePost: {},
  error: '',
};

// create async thunk
const fetchPost = createAsyncThunk('post/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/10');
  const posts = await response.json();

  return posts;
});

const postSlice = createSlice({
  name: 'Post',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state, action) => {
        (state.loading = true), (state.error = '');
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
