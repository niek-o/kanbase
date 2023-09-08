<template>
    <div class="w-[24rem] rounded-full rounded-md bg-gray-200 dark:bg-dark-primary text-default-text dark:text-dark-text">
        <div class="h-[3rem] w-full bg-gray-300 dark:bg-dark-secondary grid grid-cols-2 items-center px-4 rounded-t-md">
            <h1 class="text-3xl">{{ status }}</h1>
            <button class="text-3xl justify-self-end hover:text-blue-900 hover:scale-125 ease-in-out duration-100"
                    @click="newCard">+
            </button>
        </div>
        <div class="w-full min-h-[45rem] flex flex-col p-4 gap-4">
            <CardComponent :card="card"
                           v-for="card in cardStore.cards.filter(c => c.card.card_status === status)"
                           :key="card.documentId"
                           draggable="true"
                           @dragstart="this.$emit('drag-card', card)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { ref } from "vue";
import { useBoardNameStore } from "../stores/boardNameStore";
import { useCardStore } from "../stores/cardStore";
import { useUserStore } from "../stores/userStore";
import CardComponent from "./CardComponent.vue";

const props = defineProps<{
    status: string;
}>();

const userStore = useUserStore();
const cardStore = useCardStore();
const boardNameStore = useBoardNameStore();

const newStatus = ref();

const db = getFirestore();

function newCard() {
    if (!userStore.user) {
        return;
    }

    // addDoc(collection(db, `board_${userStore.user.uid}_test`), {
    //     title: "",
    //     description: "",
    //     card_status: props.status,
    //     assignee: {
    //         name: userStore.user.displayName,
    //         profile_picture: userStore.user.photoURL
    //     },
    //     due_date: new Date(),
    //     tags: null
    // });

    addDoc(collection(db, `board_${userStore.user.uid}_${boardNameStore.currentBoard}`), {
        title: "",
        description: "",
        card_status: props.status,
        assignee: null,
        due_date: null,
        tags: null,
        timestamp: new Date()
    });
}
</script>
