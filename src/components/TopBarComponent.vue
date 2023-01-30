<template>
    <div class="h-[5vh] flex place-items-center justify-between px-5 py-2 gap-2 bg-blue-500 dark:bg-dark-secondary text-white dark:text-dark-text">
        <div class="flex flex-row flex-grow h-full place-items-center gap-2">
            <img :src="userStore.user.photoURL"
                 class="w-auto h-full rounded-full border-[1.5px] border-text-default-text dark:border-text-dark-text"
                 alt="USER_PROFILE_PHOTO">
            <h1>Signed in as {{ userStore.user.displayName }}</h1>
        </div>

        <div class="flex-grow">
        <select v-model="boardNameStore.currentBoard" class="w-32 bg-blue-500 dark:bg-dark-primary p-2">
            <option v-for="board in boardNameStore.boards">
                {{ board }}
            </option>
        </select>
        </div>

        <div class="flex-grow">
            <h1 class="underline cursor-pointer text-right" @click="signOut">Sign out</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {useBoardNameStore} from "../stores/boardNameStore";
import {useUserStore} from "../stores/userStore";

const router = useRouter();
const userStore = useUserStore();
const boardNameStore = useBoardNameStore();

function signOut() {
    userStore.reset();

    router.push("/sign-in");
}

</script>
