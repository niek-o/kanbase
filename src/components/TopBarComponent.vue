<template>
    <div class="h-[5vh] flex place-items-center justify-between px-5 py-2 gap-2 bg-blue-500 dark:bg-dark-secondary text-white dark:text-dark-text">
        <div class="flex flex-row flex-grow h-full place-items-center gap-2">
            <img :src="userStore.user.photoURL"
                 class="w-auto h-full rounded-full border-[1.5px] border-text-default-text dark:border-text-dark-text"
                 alt="DP">
            <h1>Signed in as {{ userStore.user.displayName }}</h1>
        </div>

        <div class="flex-grow">
        <select v-model="boardNameStore.currentBoard" class="w-32 p-2 rounded-md bg-blue-500 dark:bg-dark-primary">
            <option v-for="board in boardNameStore.boards">
                {{ board }}
            </option>
        </select>
        </div>

        <div class="flex-grow">
            <label class="relative inline-flex items-center mb-5 cursor-pointer">
                <input type="checkbox" v-model="darkModeStore.darkMode" class="sr-only peer">
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500" />
            </label>
        </div>


        <div>
            <h1 class="underline cursor-pointer text-right" @click="signOut">Sign out</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {useBoardNameStore} from "../stores/boardNameStore";
import { useDarkModeStore } from "../stores/darkModeStore";
import {useUserStore} from "../stores/userStore";

const router = useRouter();
const userStore = useUserStore();
const boardNameStore = useBoardNameStore();
const darkModeStore = useDarkModeStore();

function signOut() {
    userStore.reset();

    router.push("/sign-in");
}

</script>
