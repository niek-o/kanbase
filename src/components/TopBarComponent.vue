<template>
    <div class="h-[5vh] bg-blue-500 flex place-items-center justify-between px-5 py-2 gap-2">
        <div class="flex flex-row h-full place-items-center gap-2">
            <img :src="userStore.user.photoURL"
                 class="w-auto h-full rounded-full"
                 alt="USER_PROFILE_PHOTO">
            <h1 class="text-white">Signed in as {{ userStore.user.displayName }}</h1>
        </div>

        <select v-model="boardNameStore.currentBoard" class="bg-blue-500 text-white w-32">
            <option v-for="board in boardNameStore.boards">
                {{ board }}
            </option>
        </select>

        <div>
            <h1 class="underline text-white cursor-pointer" @click="signOut">Sign out</h1>
        </div>


    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useBoardNameStore } from "../stores/boardNameStore";
import { useUserStore } from "../stores/userStore";

const router = useRouter();
const userStore = useUserStore();
const boardNameStore = useBoardNameStore();

function signOut() {
    userStore.reset();

    router.push("/sign-in");
}

</script>
