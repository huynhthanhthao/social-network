<template>
    <div
        class="card mx-auto bg-white shadow-xl hover:shadow py-2 rounded mb-3 p-4 w-[300px] max-h-[400px] flex flex-col justify-between"
    >
        <img
            class="w-32 h-32 mx-auto rounded-full border-8 border-white"
            :src="account.urlAvatar"
            alt=""
        />
        <div class="text-center mt-2 text-3xl font-medium">
            {{ account.name }}
        </div>

        <div class="text-center font-normal text-lg">
            ({{ account.username }})
        </div>
        <div
            class="text-sm leading-normal text-gray-400 flex justify-center items-center"
        >
            <svg
                viewBox="0 0 24 24"
                class="mr-1"
                width="16"
                height="16"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {{ account.address }}
        </div>
        <div class="px-6 text-center mt-2 font-light text-sm">
            <p>
                {{ account.story }}
            </p>
        </div>
        <router-link
            to="/update/"
            v-if="account._id != this.$route.params.userId"
        >
            <div
                class="mt-4 flex items-center bg-[#e4e6eb] p-2 text-dark mx-auto hover:bg-slate-400 w-44 rounded"
            >
                <img src="@/assets/edit.png" class="w-5 mr-1" alt="" />
                Cập nhật thông tin
            </div>
        </router-link>
        <hr class="mt-4" />
        <div class="flex p-4">
            <div class="w-1/2 text-center">
                <span class="font-bold">{{ posts.length }}</span> Bài viết
            </div>
            <div class="w-0 border border-gray-300"></div>
            <div class="w-1/2 text-center">
                <span class="font-bold">{{ likes }}</span> Lượt thích
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "InformationComponent",
    computed: {
        likes() {
            let likes = 0;
            this.posts.forEach((post) => {
                likes += post.likes.length;
            });
            return likes;
        },
    },
    props: ["account", "posts"],
};
</script>

<style></style>
