<script setup lang="ts">
import { RouterView } from "vue-router";
import TopBarComponent from "./components/TopBarComponent.vue";
import { useDarkModeStore } from "./stores/darkModeStore";
import { useUserStore } from "./stores/userStore";

const userStore = useUserStore();
const darkModeStore = useDarkModeStore();
</script>

<template>
    <div :class="{'dark': darkModeStore.darkMode}">
        <TopBarComponent v-if="userStore.user" />
        <RouterView />
    </div>
</template>
