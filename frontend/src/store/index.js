import { createStore } from "vuex";
import Notify from "./modules/Notify.js";
import Post from "./modules/Post.js";
import Account from "./modules/Account.js";
// Create a new store instance.
const store = createStore({
    modules: { Notify, Post, Account },
    state() {
        return {
            logged: false,
            isLoading: false,
        };
    },
    mutations: {
        logged(state) {
            state.logged = true;
        },
        logout(state) {
            state.logged = false;
        },
        closeLoading(state) {
            state.isLoading = false;
        },
        showLoading(state) {
            state.isLoading = true;
        },
    },
    getters: {
        getLogged(state) {
            return state.logged;
        },
        getLoading(state) {
            return state.isLoading;
        },
    },
});

export default store;
