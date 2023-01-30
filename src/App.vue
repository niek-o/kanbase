<script setup lang="ts">
import { RouterView } from "vue-router";
import TopBarComponent from "./components/TopBarComponent.vue";
import { useUserStore } from "./stores/userStore";

const userStore = useUserStore();
</script>

<template>
    <div :class="{'dark': true}">
        <TopBarComponent v-if="userStore.user" />
        <RouterView />
    </div>
</template>
