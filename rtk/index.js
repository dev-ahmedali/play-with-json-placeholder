const store = require("./app/store");
const { fetchPost } = require("./features/post/postSlice");

// subscribe to state changes
store.subscribe(() => {
    console.log(store.getState());
})

// dispatch actions
store.dispatch(fetchPost())