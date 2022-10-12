const { configureStore } = require('@reduxjs/toolkit');
const { createLogger } = require('redux-logger');
const postReducer = require('../features/post/postSlice');

const logger = createLogger();
// configure store
const store = configureStore({
  reducer: {
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware().concat(logger);
  },
});

module.exports = store;
