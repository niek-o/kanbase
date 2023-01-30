<template>
    <div class="w-full h-full flex flex-row flex-wrap justify-start gap-12 p-10 dark:bg-dark-background">
        <template v-for="status in cardStore.statuses">
            <ColumnComponent :status="status"/>
        </template>
        <button class="text-3xl self-start" @click="addStatus">+</button>
    </div>
</template>

<script setup lang="ts">
import ColumnComponent from "../components/ColumnComponent.vue";
import {useCardStore} from "../stores/cardStore";


const cardStore = useCardStore();
cardStore.init();

// function addStatus() {
//     const current_statuses = cardStore.statuses
//
//
// }
</script>

<style>

</style>
