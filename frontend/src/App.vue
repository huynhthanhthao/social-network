<template>
    <div id="app" class="bg-purple-400 min-h-screen">
        <Loading />

        <div>
            <Nav v-if="logged" />
            <div
                :class="
                    !logged
                        ? ' '
                        : 'contain w-[85%] grid grid-cols-1 mx-auto mt-4'
                "
            >
                <router-view></router-view>
            </div>
        </div>
        <Notify />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Nav from "./components/Nav.vue";
import Notify from "./components/Notify.vue";
import Loading from "./components/Loading.vue";

export default {
    name: "App",
    components: { Nav, Notify, Loading },

    created() {
        const userId = localStorage.getItem("userId");
        if (localStorage.getItem("token")) this.$store.commit("logged");
        else this.$store.commit("logout");

        this.$store.dispatch("setAccount", userId);
    },
    computed: { ...mapGetters({ logged: "getLogged" }) },
};
</script>

<style>
html {
    scroll-behavior: smooth;
}
</style>
