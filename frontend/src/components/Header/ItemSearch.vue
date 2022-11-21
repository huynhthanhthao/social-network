<template>
    <div
        class="my-1 p-1 flex w-full transform cursor-pointer flex-col justify-between rounded-md bg-white bg-opacity-75 text-slate-800 transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg"
    >
        <router-link :to="'/friend/' + friend._id">
            <div class="flex w-full flex-row lg:w-3/12">
                <div class="relative flex flex-col">
                    <div
                        class="flex h-12 w-12 flex-shrink-0 flex-col justify-center rounded-full bg-slate-200 bg-opacity-50"
                    >
                        <img
                            :src="friend.urlAvatar"
                            class="z-10 h-12 w-12 rounded-full object-cover shadow hover:shadow-xl"
                            alt="Rocky Balboa"
                        />
                    </div>
                </div>

                <div class="ml-4 self-center">
                    <div
                        class="w-full truncate text-base font-bold leading-5 tracking-tight text-gray-800"
                    >
                        {{ friend.name }}
                    </div>
                    <div class="text-sm text-slate-500">
                        {{ friend.username }}
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "ItemSearch",
    props: ["friend"],
};
</script>

<style></style>
