<template>
    <div class="home grid grid-cols-4 animate__fadeIn animate__animated">
        <HomeLeft :account="account" :posts="postUser" />
        <div class="col-span-3 ml-4">
            <PostForm />
            <div v-for="post in postList" :key="post._id">
                <Post :post="post" />
            </div>
        </div>
    </div>
</template>

<script>
import PostForm from "./PostForm.vue";
import Post from "../Post/Post.vue";
import HomeLeft from "./HomeLeft.vue";
import { mapGetters } from "vuex";
export default {
    name: "HomeComponent",
    components: { PostForm, Post, HomeLeft },
    computed: {
        ...mapGetters({
            postList: "getPostAll",
            postUser: "getPostUser",
            account: "getAccount",
        }),
    },
    async created() {
        const userId = localStorage.getItem("userId");
        await this.$store.dispatch("setPosts");
        await this.$store.dispatch("setPostsUser", userId);
    },
};
</script>

<style></style>
