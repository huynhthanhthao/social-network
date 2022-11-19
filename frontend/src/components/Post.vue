<template>
    <div class="bg-white shadow rounded-lg mb-3 z-2">
        <div class="flex flex-row justify-between items-center px-2 py-3 mx-3">
            <div class="flex">
                <div
                    class="w-auto h-auto rounded-full border-2 border-green-500"
                >
                    <router-link :to="'/friend/' + post.accountId">
                        <img
                            class="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                            alt="User avatar"
                            :src="post.urlAvatar"
                        />
                    </router-link>
                </div>
                <div class="flex flex-col mb-2 ml-4 mt-1">
                    <div class="text-gray-600 text-sm font-semibold">
                        {{ post.name }}
                    </div>
                    <div class="flex w-full mt-1">
                        <div
                            class="text-blue-700 font-base text-xs mr-1 cursor-pointer"
                        >
                            Fookbace
                        </div>
                        <div class="text-gray-400 font-thin text-xs">
                            {{ time }}
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="relative"
                @click="this.showDelete = !this.showDelete"
                v-if="user._id == post.accountId"
            >
                <img
                    src="@/assets/option.png"
                    class="w-5 h-5 hover:opacity-50 cursor-pointer"
                    alt=""
                />
                <button
                    class="absolute w-[132px] bg-red-500 text-gray-50 hover:bg-red-400 py-2 mt-1 font-medium px-2 rounded inline-flex items-center"
                    v-if="showDelete"
                    @click="handleDeletePost"
                >
                    <img src="@/assets/garbage.png" class="w-6 mr-1" alt="" />
                    Xóa bài viết
                </button>
            </div>
        </div>
        <div class="border-b border-gray-100"></div>

        <div class="text-gray-900 font-normal mb-2 mx-3 p-2">
            {{ post.content }}
        </div>

        <div class="flex justify-center items-center mx-auto">
            <div class="text-gray-400 font-medium text-sm mb-7 px-2">
                <img
                    class="rounded block h-[500px] w-[500px]"
                    :src="post.url"
                />
            </div>
        </div>
        <div class="flex justify-start mb-4 border-t border-gray-100">
            <div class="flex justify-start items-center w-full mt-1 pt-2 pr-5">
                <span
                    class="transition ease-out duration-300 ml-5 hover:bg-gray-50 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer"
                >
                    <img
                        v-if="loved"
                        src="@/assets/heart.png"
                        class="w-6 animate__heartBeat animate__animated"
                        alt=""
                        @click="handleUnLove"
                    />
                    <img
                        v-else
                        src="@/assets/heart-dark.png"
                        class="w-6"
                        alt=""
                        @click="handleLove"
                    />
                </span>
                <span class="ml-2 mt-1 text-gray-600"
                    >{{ post.likes.length }} lượt thích</span
                >
            </div>
        </div>
        <div class="flex w-full border-t border-gray-100">
            <div class="mt-3 mx-5 w-full flex justify-end text-xs"></div>
        </div>
        <!-- /// -->

        <div
            class="comment"
            v-for="(comment, index) in post.comments"
            :key="index"
        >
            <Comment :comment="comment" />
        </div>
        <form
            @submit="handleComment"
            class="relative flex items-center self-center w-full p-4 overflow-hidden text-gray-600 focus-within:text-gray-400"
        >
            <img
                class="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                alt="User avatar"
                :src="user.urlAvatar"
            />
            <span
                class="absolute inset-y-0 right-0 mr-2 flex items-center pr-6 cursor-pointer"
            >
                <img
                    src="@/assets/send.png"
                    @click="handleComment"
                    class="w-5"
                />
            </span>
            <input
                type="search"
                class="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                style="border-radius: 25px"
                placeholder="Viết bình luận..."
                autocomplete="off"
                v-model="message"
            />
        </form>
    </div>
</template>

<script>
import Comment from "./Comment.vue";
import moment from "moment";
import axios from "axios";
import config from "@/config/index.js";
import { mapGetters } from "vuex";

export default {
    name: "PostComponent",
    components: { Comment },
    data() {
        return { showDelete: false, message: "", loved: false };
    },
    props: ["post"],
    computed: {
        time() {
            return moment(this.post.createdAt).fromNow();
        },

        ...mapGetters({ user: "getAccount" }),
    },
    mounted() {
        const userId = localStorage.getItem("userId");

        if (this.post.likes.includes(userId)) this.loved = true;
        else this.loved = false;
    },

    methods: {
        handleDeletePost() {
            this.$store.dispatch("deletePost", this.post._id);
        },
        async handleLove() {
            const userId = localStorage.getItem("userId");

            try {
                const likes = [userId, ...this.post.likes];
                this.$store.commit("UPDATE_POST", { ...this.post, likes });
                this.$store.commit("UPDATE_POST_USER", { ...this.post, likes });
                await axios.get(`${config.domain}/posts/love`, {
                    params: { _id: this.post._id, userId },
                });
                this.loved = true;
            } catch (error) {
                console.log(error);
            }
        },
        async handleUnLove() {
            const userId = localStorage.getItem("userId");

            try {
                const likes = this.post.likes.filter((like) => like !== userId);
                this.$store.commit("UPDATE_POST", { ...this.post, likes });
                this.$store.commit("UPDATE_POST_USER", { ...this.post, likes });

                await axios.get(`${config.domain}/posts/un-love`, {
                    params: { _id: this.post._id, userId },
                });
                this.loved = false;
            } catch (error) {
                console.log(error);
            }
        },
        async handleComment(e) {
            try {
                e.preventDefault();

                // Tao 1 comment moi de dua vao store
                const comments = [
                    ...this.post.comments,

                    {
                        content: this.message,
                        name: this.user.name,
                        urlAvatar: this.user.urlAvatar,
                    },
                ];

                // Cap nhat lai post in store
                this.$store.commit("UPDATE_POST", {
                    ...this.post,
                    comments,
                });

                this.$store.commit("UPDATE_POST_USER", {
                    ...this.post,
                    comments,
                });

                // Cap nhat len db
                await axios.post(`${config.domain}/posts/comment`, {
                    accountId: this.user._id,
                    content: this.message,
                    postId: this.post._id,
                });

                this.message = "";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style></style>
