import axios from "axios";
import config from "@/config/index.js";
const PostModule = {
    state() {
        return {
            postAll: [],
            postUser: [],
        };
    },
    getters: {
        getPostAll(state) {
            return state.postAll;
        },
        getPostUser(state) {
            return state.postUser;
        },
    },

    mutations: {
        DELETE_POST(state, postId) {
            for (let i = 0; i < state.postAll.length; i++) {
                if (state.postAll[i]._id == postId) {
                    state.postAll.splice(i, 1);
                }
            }

            for (let i = 0; i < state.postUser.length; i++) {
                if (state.postUser[i]._id == postId) {
                    state.postUser.splice(i, 1);
                }
            }
        },
        CREATE_POST(state, post) {
            state.postAll.unshift(post);
        },
        SET_POST_ALL(state, postList) {
            state.postAll = postList;
        },
        UPDATE_POST(state, postUpdate) {
            state.postAll = state.postAll.map((post) =>
                post._id === postUpdate._id ? postUpdate : post
            );
        },
        UPDATE_POST_USER(state, postUpdate) {
            state.postUser = state.postUser.map((post) =>
                post._id === postUpdate._id ? postUpdate : post
            );
        },

        SET_POST_USER(state, postList) {
            state.postUser = postList;
        },
    },
    actions: {
        async setPosts({ commit }) {
            try {
                const res = await axios.get(`${config.domain}/posts/get-posts`);
                commit("SET_POST_ALL", res.data.result);
            } catch (error) {
                console.log(error);
            }
        },
        async setPostsUser({ commit }, userId) {
            try {
                const res = await axios.get(
                    `${config.domain}/posts/get-posts-user`,
                    { params: { userId } }
                );
                commit("SET_POST_USER", res.data.result);
            } catch (error) {
                console.log(error);
            }
        },
        async deletePost({ commit }, postId) {
            try {
                const res = await axios.post(`${config.domain}/posts/delete`, {
                    postId,
                });

                commit("SET_NOTIFY", {
                    status: res.data.status,
                    message: res.data.message,
                });
                if (res.data.status) commit("DELETE_POST", postId);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
export default PostModule;
