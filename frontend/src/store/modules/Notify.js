const NotifyModule = {
    state() {
        return {
            notify: {
                show: false,
                status: false,
                message: "",
            },
        };
    },
    getters: {
        getNotify(state) {
            return state.notify;
        },
    },

    mutations: {
        SET_NOTIFY(state, notify) {
            state.notify = notify;
            state.notify.show = true;

            setTimeout(() => {
                state.notify.show = false;
            }, 3000);
        },
        CLOSE_NOTIFY(state) {
            state.notify.show = false;
        },
    },
};
export default NotifyModule;
