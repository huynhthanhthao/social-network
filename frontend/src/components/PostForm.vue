<template>
    <div>
        <form
            class="bg-white shadow rounded-lg mb-3 p-4"
            @click="showCreate = !showCreate"
        >
            <textarea
                name="message"
                placeholder="Suy nghĩ của bạn..."
                class="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
            ></textarea>
            <footer class="flex justify-between mt-2">
                <div class="flex gap-2">
                    <span
                        class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="css-i6dzq1"
                        >
                            <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                            ></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                    </span>
                    <span
                        class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="css-i6dzq1"
                        >
                            <path
                                d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                            ></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                    </span>
                    <span
                        class="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="css-i6dzq1"
                        >
                            <polyline points="4 17 10 11 4 5"></polyline>
                            <line x1="12" y1="19" x2="20" y2="19"></line>
                        </svg>
                    </span>
                </div>
                <div
                    class="flex items-center py-2 px-4 rounded-lg text-sm bg-orange-400 text-white shadow-lg cursor-pointer"
                >
                    <img src="@/assets/send.png" class="w-5 mr-1" alt="" />
                    Đăng
                    <i class="bx bx-send"></i>
                </div>
            </footer>
        </form>
        <CreatePost v-if="showCreate" v-model:showCreate="showCreate" />
    </div>
</template>

<script>
import CreatePost from "./CreatePost.vue";
export default {
    name: "PostForm",
    components: { CreatePost },
    data() {
        return { showCreate: false };
    },
};
</script>

<style></style>
