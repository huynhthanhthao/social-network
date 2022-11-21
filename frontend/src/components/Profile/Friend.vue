<template>
    <NotFound v-if="JSON.stringify(account) === '{}'" />

    <div
        v-else
        class="friend grid grid-cols-4 animate__fadeIn animate__animated"
    >
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
import NotFound from "../NotFound.vue";
import Post from "../Post/Post.vue";
export default {
    name: "FriendComponent",
    components: { Information, Post, NotFound },

    computed: {
        ...mapGetters({ account: "getFriend", posts: "getPostUser" }),
    },
    watch: {
        async $route() {
            const { userId } = this.$route.params;
            await this.$store.dispatch("setFriend", userId);

            await this.$store.dispatch("setPosts");
            await this.$store.dispatch("setPostsUser", userId);
        },
    },

    async created() {
        const { userId } = this.$route.params;
        await this.$store.dispatch("setFriend", userId);

        await this.$store.dispatch("setPosts");
        await this.$store.dispatch("setPostsUser", userId);
    },
};
</script>

<style></style>
