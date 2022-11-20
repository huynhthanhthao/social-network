<template>
    <div class="comment">
        <div class="text-black px-4 py-2 antialiased flex items-center">
            <router-link
                :to="'/friend/' + comment.userCommentId"
                @click="scrollToTop"
            >
                <img
                    class="rounded-full h-8 w-8 mr-2 mt-1"
                    :src="comment.urlAvatar"
            /></router-link>
            <div>
                <div class="bg-gray-100 rounded-lg px-4 pt-2 pb-2.5">
                    <div class="font-semibold text-sm leading-relaxed">
                        {{ comment.name }}
                    </div>
                    <div class="text-xs leading-snug md:leading-normal">
                        {{ comment.content }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CommentComponent",
    props: ["comment"],
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },
    },
};
</script>

<style></style>
