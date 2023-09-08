<template>
    <div class="flex flex-row place-items-center max-w-[8rem] h-8 space-x-1 p-1 pr-3 bg-gray-300 dark:bg-dark-primary rounded-full">
        <img :src="assignee.profile_picture"
             alt="ASSIGNEE_PROFILE_PIC"
             class="w-5 h-5 rounded-full">
        <h1 class="truncate text-sm text-default-text dark:text-dark-text">{{ assignee.name }}</h1>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    assignee: {
        name: string,
        profile_picture: string
    }
}>();
</script>
