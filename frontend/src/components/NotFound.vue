<template>
    <div
        class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16"
    >
        <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
            <div class="relative">
                <h1 class="my-2 text-white font-bold text-2xl">
                    Có vẻ như bạn đang truy cập vào đường dẫn không hợp lệ!
                </h1>
                <p class="my-2 text-white">
                    Xin lỗi vì điều đó! Vui lòng truy cập trang chủ của chúng
                    tôi để đến nơi bạn cần đến.
                </p>
                <button
                    class="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-slate-800 text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                >
                    <router-link to="/">Về trang chủ</router-link>
                </button>
                <!-- <div>
                    <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                </div> -->
            </div>
        </div>
        <div>
            <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
        </div>
    </div>
</template>

<script>
export default {
    name: "NotFound",
};
</script>

<style></style>
