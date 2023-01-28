<template>
    <div class="chip flex flex-row place-items-center justify-center px-1 w-16 h-5 border-2 rounded-full">
        <h1 class="truncate text-xs">{{ text }}</h1>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    text: string,
    color: string
}>()

const { color } = props
</script>

<style scoped>
.chip {
    border-color: v-bind(color);
    color: v-bind(color);
}
</style>
