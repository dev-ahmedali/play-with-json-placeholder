const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

// initial state
const initialState = {
  loading: false,
  relatedDataPosts: [],
  error: '',
};

// create async thunk
const fetchRelatedPost = createAsyncThunk(
  'relatedPosts/fetchPosts',
  async (title) => {
    console.log('post title: ', { title });
    const url = `https://jsonplaceholder.typicode.com/posts?${title
      ?.split(' ')
      ?.map((word) => `title_like=${word}`)
      .join('&')}`;
    const response = await fetch(url);
    const posts = await response.json();

    return posts;
  }
);

const relatedPostSlice = createSlice({
  name: 'relatedPost',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedPost.pending, (state, action) => {
        (state.loading = true), (error = '');
      })
      .addCase(fetchRelatedPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.relatedDataPosts = action.payload;
      })
      .addCase(fetchRelatedPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
        state.relatedDataPosts = [];
      });
  },
});

module.exports = relatedPostSlice.reducer
module.exports.fetchRelatedPost = fetchRelatedPost
module.exports.fetchRelatedPostAction = relatedPostSlice.actions
