<template>
    <div class="update-infor animate__fadeIn animate__animated">
        <dh-component>
            <form id="login" @submit="handleUpdateInfor">
                <div class="bg-white dark:bg-white-800 px-[70px]">
                    <div
                        class="container mx-auto bg-white white:bg-gray-800 rounded"
                    >
                        <div
                            class="xl:w-full border-b border-gray-300 white:border-gray-700 py-5 bg-white"
                        >
                            <div
                                class="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center"
                            >
                                <p class="text-2xl font-bold text-gray-800">
                                    Profile
                                </p>
                                <div
                                    class="ml-2 cursor-pointer text-gray-800 dark:text-gray-400"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="16"
                                        height="16"
                                    >
                                        <path
                                            class="heroicon-ui"
                                            d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="mx-auto">
                            <div class="mx-auto xl:mx-0">
                                <div class="rounded relative mt-8 h-48">
                                    <img
                                        src="https://images.unsplash.com/photo-1618004912476-29818d81ae2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                                        alt=""
                                        class="w-full h-full object-cover rounded absolute shadow"
                                    />
                                    <div
                                        class="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded"
                                    ></div>

                                    <div
                                        class="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center"
                                    >
                                        <img
                                            :src="
                                                image.url
                                                    ? image.url
                                                    : account.urlAvatar
                                            "
                                            alt=""
                                            class="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
                                        />
                                        <input
                                            id="file"
                                            type="file"
                                            class="hidden"
                                            @change="showImage"
                                        />
                                        <div
                                            class="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0"
                                        ></div>
                                        <label
                                            for="file"
                                            class="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="icon icon-tabler icon-tabler-edit"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                />
                                                <path
                                                    d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"
                                                />
                                                <path
                                                    d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"
                                                />
                                                <line
                                                    x1="16"
                                                    y1="5"
                                                    x2="19"
                                                    y2="8"
                                                />
                                            </svg>
                                            <p class="text-xs text-gray-100">
                                                Chọn ảnh
                                            </p>
                                        </label>
                                    </div>
                                </div>
                                <div class="flex justify-between">
                                    <div class="w-1/2">
                                        <div class="mt-16 flex flex-col w-full">
                                            <label
                                                for="username"
                                                class="pb-2 text-sm font-bold text-gray-800"
                                                >Tên đầy đủ</label
                                            >
                                            <input
                                                tabindex="0"
                                                type="text"
                                                id="username"
                                                name="username"
                                                required
                                                class="border border-gray-300 dark:border-gray-700 text-gray-800 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500"
                                                v-model="account.name"
                                            />
                                        </div>
                                        <div class="mt-6 flex flex-col w-full">
                                            <label
                                                for="address"
                                                class="pb-2 text-sm font-bold text-gray-800"
                                                >Địa chỉ</label
                                            >
                                            <input
                                                tabindex="0"
                                                type="text"
                                                id="address"
                                                name="address"
                                                required
                                                class="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-800"
                                                placeholder="Nhập địa chỉ..."
                                                v-model="account.address"
                                            />
                                        </div>
                                    </div>
                                    <div class="w-1/2 px-3">
                                        <div class="mt-16 flex flex-col w-full">
                                            <label
                                                for="phoneNumber"
                                                class="pb-2 text-sm font-bold text-gray-800"
                                                >Số điện thoại</label
                                            >
                                            <input
                                                tabindex="0"
                                                type="text"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                required
                                                class="border pl-3 py-3 dark:border-gray-700 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-800"
                                                placeholder="Nhập số điện thoại..."
                                                v-model="account.phoneNumber"
                                            />
                                        </div>
                                        <div class="mt-6 flex flex-col w-full">
                                            <label
                                                for="address"
                                                class="pb-2 text-sm font-bold text-gray-800"
                                                >Giới tính</label
                                            >
                                            <select
                                                class="pl-3 py-[11px] border dark:border-gray-700 rounded"
                                                v-model="account.gender"
                                            >
                                                <option value="male">
                                                    Nam
                                                </option>
                                                <option value="female">
                                                    Nữ
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-8 flex flex-col w-full">
                                    <label
                                        for="about"
                                        class="pb-2 text-sm font-bold text-gray-800"
                                        >Giới thiệu</label
                                    >
                                    <textarea
                                        id="about"
                                        name="about"
                                        required
                                        class="bg-transparent border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-800"
                                        placeholder="Mô tả về bạn..."
                                        rows="5"
                                        v-model="account.story"
                                        maxlength="60"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container mx-auto w-11/12 xl:w-full">
                        <div
                            class="w-full py-4 sm:px-0 bg-white flex justify-start"
                        >
                            <router-link
                                :to="'/profile/'"
                                class="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 text-black rounded px-6 py-2 text-xs mr-4 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                            >
                                Hủy
                            </router-link>
                            <button
                                role="button"
                                aria-label="Save form"
                                class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm"
                                type="submit"
                            >
                                Lưu thông tin
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </dh-component>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import config from "@/config/index.js";

export default {
    name: "UpdateInfor",
    computed: { ...mapGetters({ account: "getAccount" }) },
    data() {
        return {
            image: {
                url: "",
                file: null,
            },
            file: {},
        };
    },
    created() {
        const userId = localStorage.getItem("userId");
        this.$store.dispatch("setAccount", userId);
    },
    methods: {
        async handleUpdateInfor(e) {
            try {
                e.preventDefault();
                this.$store.commit("showLoading");

                // Save image in the cloudinary
                const CLOUDINARY_UPLOAD_PRESET = "qle01vei";
                const formData = new FormData();
                formData.append("file", this.file);
                formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
                const CLOUDINARY_URL =
                    "https://api.cloudinary.com/v1_1/drjynwuyt/upload";

                const detailImage = await fetch(CLOUDINARY_URL, {
                    method: "POST",
                    body: formData,
                }).then((data) => {
                    return data.json();
                });

                const urlAvatar = detailImage.secure_url;

                console.log(this.account);

                // update in database
                const res = await axios.patch(
                    `${config.domain}/accounts/update-infor`,
                    {
                        userId: this.account._id,
                        name: this.account.name,
                        phoneNumber: this.account.phoneNumber,
                        address: this.account.address,
                        gender: this.account.gender,
                        story: this.account.story,
                        urlAvatar: urlAvatar,
                    }
                );

                this.$store.commit("closeLoading");

                // set notify
                this.$store.commit("SET_NOTIFY", {
                    status: res.data.status,
                    message: res.data.message,
                });
            } catch (error) {
                console.log(error);
            }
        },
        showImage(e) {
            const file = e.target.files[0];
            this.image.file = file;
            this.image.url = URL.createObjectURL(file);

            this.file = file;
        },
    },
};
</script>

<style>
.checkbox:checked {
    /* Apply class right-0*/
    right: 0;
}
.checkbox:checked + .toggle-label {
    /* Apply class bg-indigo-700 */
    background-color: #4c51bf;
}
</style>
