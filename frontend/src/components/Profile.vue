<template>
    <div class="profile grid grid-cols-4 animate__fadeIn animate__animated">
        <Information :posts="posts" :account="account" />
        <div class="post-list col-span-3 ml-4">
            <div v-for="post in posts" :key="post._id">
                <Post :post="post" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Information from "./Information.vue";
import Post from "./Post.vue";
export default {
    name: "ProfileComponent",
    components: { Information, Post },
    computed: {
        ...mapGetters({ account: "getAccount", posts: "getPostUser" }),
    },

    async created() {
        const userId = localStorage.getItem("userId");
        await this.$store.dispatch("setAccount", userId);

        await this.$store.dispatch("setPosts");
        await this.$store.dispatch("setPostsUser", userId);
    },
};
</script>

<style></style>
