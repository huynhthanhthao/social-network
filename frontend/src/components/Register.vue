<template>
    <div class="register animate__fadeIn animate__animated">
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
                        Tạo Tài Khoản
                    </h1>
                    <p
                        class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer"
                    >
                        Tạo tài khoản để sử dụng cách dịch vụ mà không cần trả
                        phí
                    </p>
                </div>
                <div class="space-y-4">
                    <input
                        type="text"
                        placeholder="Họ và tên"
                        class="block text-sm py-3 px-4 rounded-lg w-full border outline-slate-300"
                        v-model="name"
                    />
                    <input
                        v-model="username"
                        type="text"
                        placeholder="Tên người dùng"
                        class="block text-sm py-3 px-4 rounded-lg w-full border outline-slate-300"
                    />
                    <input
                        v-model="password"
                        type="password"
                        placeholder="Mật khẩu"
                        class="block text-sm py-3 px-4 rounded-lg w-full border outline-slate-300"
                    />
                </div>
                <div class="text-center mt-6">
                    <button
                        @click="handleRegister"
                        class="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl hover:bg-purple-600 transition"
                    >
                        Tạo tài khoản
                    </button>
                    <p class="mt-4 text-sm">
                        Bạn đã có tài khoản?
                        <router-link
                            to="/login"
                            class="underline cursor-pointer"
                        >
                            Đăng nhập</router-link
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
    name: "RegisterComponent",
    data() {
        return { name: "", username: "", password: "" };
    },
    methods: {
        async handleRegister() {
            const res = await axios.post(`${config.domain}/auth/register`, {
                name: this.name.trim(),
                username: this.username.trim(),
                password: this.password.trim(),
            });
            this.$store.commit("SET_NOTIFY", {
                status: res.data.status,
                message: res.data.message,
            });

            if (res.data.status) this.$router.push("/login");
        },
    },
};
</script>

<style></style>
