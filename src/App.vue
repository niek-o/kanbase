<script setup lang="ts">
import { RouterView } from "vue-router";
import TopBarComponent from "./components/TopBarComponent.vue";
import { useUserStore } from "./stores/userStore";

const userStore = useUserStore();
</script>

<template>
    <TopBarComponent v-if="userStore.user" />
    <RouterView :class="{'h-[95vh]': userStore.user}" />
</template>
