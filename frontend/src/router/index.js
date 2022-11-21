import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home/Home.vue";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Profile from "../components/Profile/Profile.vue";
import Update from "../components/Profile/UpdateInfor.vue";
import NotFound from "../components/NotFound.vue";
import Friend from "../components/Profile/Friend.vue";

const routes = [
    { path: "/", name: "home", component: Home },
    { path: "/register", name: "register", component: Register },
    { path: "/login", name: "login", component: Login },
    { path: "/profile/", name: "profile", component: Profile },
    { path: "/update/", name: "update", component: Update },
    { path: "/notfound", name: "notfound", component: NotFound },
    { path: "/friend/:userId", name: "friend", component: Friend },
];

// 3. Create the router instance and pass the `routes` option

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active-link",
});

let flat = 0;
router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem("token");

    if (
        !token &&
        to.path !== "/login" &&
        to.path !== "/register" &&
        to.path !== "/notfound"
    ) {
        next("/login");
    } else if (token && flat == 0) {
        if (to.path == "/login" || to.path == "/register") next("/");
        else if (
            to.name != "home" &&
            to.name != "profile" &&
            to.name != "update" &&
            to.name != "friend" &&
            to.name != "notfound"
        ) {
            flat = 1;
            next("/notfound");
        }
    }
    next();
});

export default router;
