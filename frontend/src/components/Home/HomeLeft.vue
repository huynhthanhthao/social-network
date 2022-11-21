<template>
    <div class="bg-white w-[300px] shadow rounded-lg p-4 max-h-[365px]">
        <div class="flex flex-col gap-1 text-center items-center">
            <img
                class="h-32 w-32 bg-white p-2 rounded-full shadow"
                :src="account.urlAvatar"
                alt=""
            />
            <p class="text-center text-2xl font-medium">
                {{ account.name }}
            </p>
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
                    <path
                        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                    ></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {{ account.address }}
            </div>
        </div>
        <div class="flex justify-center items-center gap-2 my-3">
            <div class="font-semibold text-center mx-4">
                <p class="text-black">{{ posts.length }}</p>
                <span class="text-gray-400">Bài viết</span>
            </div>
            <div class="font-semibold text-center mx-4">
                <p class="text-black">{{ likes }}</p>
                <span class="text-gray-400">Lượt thích</span>
            </div>
        </div>
        <router-link :to="'/profile/'"
            ><button
                class="flex items-center bg-purple-400 p-2 rounded text-white mx-auto hover:bg-purple-500"
            >
                <img src="@/assets/eye.png" class="w-5 mr-1" alt="" />
                Xem chi tiết
            </button></router-link
        >
    </div>
</template>

<script>
export default {
    name: "HomeLeft",

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
