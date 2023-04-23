import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    userPosts:[],
    userStories: [],
    messages: [],
    suggestUsers: [],
    notifications:[],
    messageCount:0,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },


        setUserPosts: (state, action) => {
            state.userPosts = action.payload.userPosts;
        },
        setUserPost: (state, action) => {
            const updatedPosts = state.userPosts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.userPosts = updatedPosts;
        },



        setUser: (state, action) => {
            state.user = action.payload.user;
        },
        setMessages: (state, action) => {
            state.messages = action.payload.messages;
        },
        setUserStories: (state, action) => {
            state.userStories = action.payload.userStories;
        },
        setSuggestedUsers: (state, action) => {
            state.suggestUsers = action.payload.suggestUsers;
        },
        setNotifications:(state,action)=>{
            state.notifications=action.payload.notifications
        },
        setMessageCount:(state,action)=>{
            state.messageCount=action.payload.messageCount
        }
    },
});

export const { setMode, setLogin, setLogout, setPosts, setSuggestedUsers,
                setPost, setUser, setMessages, setUserStories,setUserPost,setUserPosts,setNotifications,setMessageCount } = authSlice.actions;
export default authSlice.reducer;