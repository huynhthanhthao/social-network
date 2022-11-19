<template>
    <nav
        class="bg-white w-full flex relative shadow justify-between items-center px-8 h-16"
    >
        <!-- logo -->
        <router-link to="/">
            <img src="@/assets/logo.png" class="w-10 h-10 cursor-pointer" />
        </router-link>
        <!-- end logo -->

        <!-- search bar -->
        <!-- <div class="hidden sm:block flex-shrink flex-grow-0 justify-start px-2"> -->

        <div class="relative hidden sm:block flex-shrink flex-grow-0 z-1">
            <input
                type="text"
                class="bg-purple-white bg-gray-100 rounded-lg border-0 p-3 w-full"
                placeholder="Tìm kiếm bạn bè..."
                style="min-width: 400px"
                v-model="searchQuery"
                @input="isSearching = true"
            />
            <div class="absolute top-0 right-0 p-4 pr-3 text-purple-lighter">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                </svg>
            </div>
            <div class="item-search relative" v-if="searchQuery">
                <div
                    class="w-[100%] rounded bg-slate-200 shadow-2xl flex flex-col justify-center items-center absolute z-[1] py-1 px-2"
                >
                    <p v-if="isSearching" class="text-slate-800 font-semibold">
                        Đang tìm kiếm...
                    </p>
                    <p
                        v-else-if="friendsSearch.length == 0"
                        class="text-slate-800 font-semibold"
                    >
                        Không có kết quả.
                    </p>
                    <ItemSearch
                        v-for="friend in friendsSearch"
                        :key="friend._id"
                        v-else
                        :friend="friend"
                    />
                </div>
            </div>
        </div>

        <!-- end search bar -->

        <!-- login -->
        <div class="flex-initial">
            <div class="flex justify-end items-center relative">
                <div class="block" @click="showLogout = !showLogout">
                    <div class="inline relative">
                        <button
                            type="button"
                            class="py-1 inline-flex items-center relative px-2 border rounded-full hover:shadow-lg"
                        >
                            <div class="pl-1 pr-3">
                                <svg
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="presentation"
                                    focusable="false"
                                    style="
                                        display: block;
                                        fill: none;
                                        height: 16px;
                                        width: 16px;
                                        stroke: currentcolor;
                                        stroke-width: 3;
                                        overflow: visible;
                                    "
                                >
                                    <g fill="none" fill-rule="nonzero">
                                        <path d="m2 16h28"></path>
                                        <path d="m2 24h28"></path>
                                        <path d="m2 8h28"></path>
                                    </g>
                                </svg>
                            </div>

                            <div class="block">
                                <img
                                    :src="account.urlAvatar"
                                    alt=""
                                    class="rounded-full w-7 h-7"
                                />
                            </div>
                            <button
                                class="absolute z-[1] flex align-top top-11 left-[-20px] w-[125px] p-2 bg-white text-lg shadow rounded hover:bg-orange-300 hover:text-white"
                                v-if="showLogout"
                            >
                                <img
                                    src="@/assets/logout.png"
                                    class="w-5 mr-2"
                                    alt=""
                                />

                                <div class="text-base" @click="logout">
                                    Đăng xuất
                                </div>
                            </button>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end login -->
    </nav>
</template>

<script>
import axios from "axios";
import config from "@/config/index";
import { mapGetters } from "vuex";
import ItemSearch from "./ItemSearch.vue";
import _ from "lodash";
export default {
    name: "NavComponent",
    components: { ItemSearch },
    data() {
        return {
            showLogout: false,
            isSearching: false,
            friendsSearch: [],
            searchQuery: "",
            showResult: false,
        };
    },
    methods: {
        logout() {
            this.$router.push("/login");
            this.$store.commit("logout");
            localStorage.clear();
        },
    },
    computed: mapGetters({ account: "getAccount" }),
    watch: {
        searchQuery: _.debounce(async function (query) {
            const res = await axios.get(
                `${config.domain}/accounts/search-account`,
                { params: { searchQuery: query } }
            );
            this.isSearching = false;
            this.showResult = true;
            this.friendsSearch = res.data.result;
        }, 1000),
    },
};
</script>

<style></style>
