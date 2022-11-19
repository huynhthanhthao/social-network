<template>
    <div class="create-post animate__fadeIn animate__animated z-10">
        <div class="status_modal">
            <form>
                <div class="status_header">
                    <h5 class="m-0 font-bold fs text-lg">Tạo bài viết</h5>
                    <span @click="closeCreate">&times;</span>
                </div>

                <div class="status_body">
                    <textarea
                        name="content"
                        placeholder="Suy nghĩ của bạn..."
                        v-model="content"
                    ></textarea>
                    <!-- Show images -->
                    <div
                        class="show_images flex justify-center mx-0"
                        v-if="image.url"
                    >
                        <div id="file_img">
                            <img :src="image.url" height="40" />
                        </div>
                    </div>

                    <div class="input_images cursor-pointer" v-if="!image.url">
                        <div class="file_upload">
                            <img
                                src="../assets/picture.png"
                                width="40"
                                class="ml-[20px] cursor-pointer"
                                @click="showImage"
                            />

                            <label
                                for="file"
                                class="font-thin cursor-pointer hover:text-sky-700"
                            >
                                Tải ảnh lên
                            </label>
                            <input
                                type="file"
                                name="file"
                                id="file"
                                accept="image/*"
                                @change="showImage"
                            />
                        </div>
                    </div>
                </div>

                <div class="mt-3 relative h-[35px]">
                    <div class="absolute right-0 flex items-center">
                        <button
                            @click="createPost"
                            type="submit"
                            class="flex items-center py-2 px-4 rounded-lg text-sm bg-orange-400 text-gray-50 hover:bg-sky-700 transition shadow-lg"
                        >
                            <img
                                src="@/assets/send.png"
                                class="w-5 mr-1"
                                alt=""
                            />

                            Đăng
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import config from "@/config/index.js";
export default {
    name: "CreatePost",
    data() {
        return {
            image: {
                file: null,
                url: "",
            },
            file: {},
            content: "",
        };
    },
    methods: {
        closeCreate() {
            this.$emit("update:showCreate", false);
        },
        showImage(e) {
            const file = e.target.files[0];
            this.file = file;
            this.image.file = file;
            this.image.url = URL.createObjectURL(file);
        },
        async createPost(e) {
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

                const url = detailImage.secure_url;

                // Save post in database
                const token = localStorage.getItem("token");
                const res = await axios.post(
                    `${config.domain}/posts/create`,
                    {
                        content: this.content,
                        url,
                    },
                    { headers: { Authorization: "Bearer " + token } }
                );
                this.$store.commit("closeLoading");
                this.$store.commit("SET_NOTIFY", {
                    status: res.data.status,
                    message: res.data.message,
                });
                // Change store
                if (res.data.status) {
                    this.$store.commit("CREATE_POST", res.data.result);
                }

                this.closeCreate();
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped>
.status_modal {
    position: fixed;
    top: 0;
    left: 0;
    background: #0008;
    z-index: 99;
    width: 100%;
    height: 100vh;
    overflow: auto;
}
.status_modal form {
    max-width: 650px;
    width: 100%;
    background: white;
    margin: 2% auto;
    padding: 20px;
    border-radius: 5px;
}
.status_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    transform: translateY(-13px);
}
.status_header span {
    font-size: 2rem;
    font-weight: 900;
    cursor: pointer;
    transform: translateY(-5px);
}
.status_body textarea {
    width: 100%;
    min-height: 70px;
    border: none;
    outline: none;
    resize: none;
}
.status_body .input_images {
    display: flex;
    justify-content: center;
    margin: 10px 0;
}
.status_body .input_images i {
    font-size: 2rem;
    cursor: pointer;
}
.status_body .input_images .file_upload {
    overflow: hidden;
    margin: 0px auto;
    position: relative;
}
.status_body .input_images .file_upload #file {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}
.status_body .show_images {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    place-items: center;
    padding: 10px 0;
    grid-gap: 10px;
}
.status_body .show_images #file_img {
    position: relative;
    width: 100%;
}
.status_body .show_images #file_img img {
    display: block;
    object-fit: contain;
    width: 100%;
    border-radius: 5px;
    max-height: 300px;
}
.status_body .show_images #file_img span {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 4;
    background: white;
    color: crimson;
    padding: 10px 14px;
    border: 3px solid crimson;
    border-radius: 50%;
    font-size: 10px;
    font-weight: bolder;
    cursor: pointer;
}
.status_body .stream span {
    position: absolute;
    top: -10px;
    right: 5px;
    color: crimson;
    font-size: 2rem;
    font-weight: 900;
    cursor: pointer;
}
.status_body .dropdown-menu {
    transform: translate3d(-153px, -190px, 0px) !important;
}
</style>
