<template>
    <div class="login animate__fadeIn animate__animated">
        <div
            class="min-h-screen bg-purple-400 flex justify-center items-center"
        >
            <div
                class="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"
            ></div>

            <div class="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                <div>
                    <h1
                        class="text-3xl font-bold text-center mb-4 cursor-pointer"
                    >
                        Đăng nhập
                    </h1>
                    <p
                        class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer"
                    >
                        Đăng nhập để sử dụng cách dịch vụ mà không cần trả phí
                    </p>
                </div>
                <div class="space-y-4">
                    <input
                        type="text"
                        placeholder="Tên người dùng"
                        class="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        v-model="username"
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        class="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        v-model="password"
                    />
                </div>
                <div class="text-center mt-6">
                    <button
                        class="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl hover:bg-purple-600 transition"
                        @click="handleLogin"
                    >
                        Đăng nhập
                    </button>
                    <p class="mt-4 text-sm">
                        Bạn chưa có tài khoản?
                        <router-link
                            to="/register"
                            class="underline cursor-pointer"
                        >
                            Đăng ký</router-link
                        >
                    </p>
                </div>
            </div>
            <div
                class="w-40 h-40 absolute bg-purple-300 rounded-full top-50 right-12 hidden md:block"
            ></div>
            <div
                class="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"
            ></div>
        </div>
    </div>
</template>

<script>
import config from "../config/index";
import axios from "axios";
export default {
    name: "LoginComponent",
    data() {
        return { username: "", password: "" };
    },
    methods: {
        async handleLogin() {
            const res = await axios.post(`${config.domain}/auth/login`, {
                username: this.username,
                password: this.password,
            });
            this.$store.commit("SET_NOTIFY", {
                status: res.data.status,
                message: res.data.message,
            });

            if (res.data.status) {
                localStorage.setItem("token", res.data.accessToken);
                localStorage.setItem("userId", res.data.userId);

                this.$store.dispatch("setAccount", res.data.userId);
                this.$store.commit("logged");
                this.$router.push("/");
            }
        },
    },
};
</script>

<style></style>
