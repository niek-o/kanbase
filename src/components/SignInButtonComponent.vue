<template>
    <div>
        <div @click="signIn"
             class="border-white text-white border-2 w-40 h-20 text-3xl rounded-md flex flex-row justify-between px-4 place-items-center cursor-pointer">
            <GoogleIcon />
            <h1>Login</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import GoogleIcon from "./icons/GoogleIcon.vue";

const router = useRouter();
const userStore = useUserStore();

async function signIn() {
    await userStore.login();
    if (userStore.user) {
        router.push("/");
    }
}
</script>
