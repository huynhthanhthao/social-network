<template>
    <!-- component -->
    <div
        v-if="isShowLoading"
        class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-500 opacity-75 flex flex-col items-center justify-center"
    >
        <div>
            <div
                style="border-top-color: transparent"
                class="w-16 h-16 border-4 border-red-400 border-double rounded-full animate-spin"
            ></div>
        </div>
        <h5 class="text-white mt-3">Loading...</h5>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "LoadingComponent",
    computed: mapGetters({ isShowLoading: "getLoading" }),
};
</script>

<style></style>
