import axios from "axios";
import config from "@/config/index.js";
const AccountModule = {
    state() {
        return {
            account: {
                _id: "",
                username: "",
                name: "",
                address: "",
                gender: false,
                story: "",
                urlAvatar: "",
            },
            friend: {},
        };
    },
    getters: {
        getAccount(state) {
            return state.account;
        },
        getFriend(state) {
            return state.friend;
        },
    },

    mutations: {
        SET_ACCOUNT(state, account) {
            state.account = account;
        },
        SET_FRIEND(state, friend) {
            state.friend = friend;
        },
    },
    actions: {
        async setAccount({ commit }, userId) {
            const res = await axios.get(
                `${config.domain}/accounts/get-account`,
                { params: { userId } }
            );

            commit("SET_ACCOUNT", res.data.result);
        },
        async setFriend({ commit }, userId) {
            const res = await axios.get(
                `${config.domain}/accounts/get-account`,
                { params: { userId } }
            );

            commit("SET_FRIEND", res.data.result);
        },
    },
};
export default AccountModule;
