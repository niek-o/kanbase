<template>
    <div class="chip flex flex-row place-items-center justify-center px-1 w-16 h-5 border-2 rounded-full">
        <h1 class="truncate text-xs">{{ text }}</h1>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    text: string,
    color: string
}>();

const { color } = props;

function hexToRgb(hex: string) {
    hex = hex.replace("#", "");

    const red = parseInt(hex.slice(0, 2), 16);
    const green = parseInt(hex.slice(2, 4), 16);
    const blue = parseInt(hex.slice(4, 6), 16);

    return [red, green, blue];
}

const rgb = hexToRgb(color);
const brightness = Math.round((rgb[0] * 299 +
    rgb[1] * 587 +
    rgb[2] * 114) / 1000);
const textColour = (brightness > 125) ? "black" : "white";
</script>

<style scoped>
.chip {
    border-color: v-bind(color);
    background-color: v-bind(color);
    color: v-bind(textColour);
}
</style>
