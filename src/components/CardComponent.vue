<template>
    <div class="h-52 p-2 grid grid-rows-5 gap-2 rounded-md shadow-sm hover:scale-105 ease-in-out duration-100 bg-white dark:bg-dark-secondary text-default-text dark:text-dark-text">
        <div class="order-1 flex flex-row">
            <input type="text"
                   class="text-2xl bg-white dark:bg-dark-secondary text-default-text dark:text-dark-text"
                   v-model="cardDocument.card.title"
                   @change="updateCard">
            <button @click="removeCard"
                    class="text-3xl place-self-end hover:text-blue-900 hover:scale-125 ease-in-out duration-100 text-center w-full">
                -
            </button>
        </div>

        <textarea
                class="order-2 row-span-2 text-md text-clip overflow-hidden resize-none bg-white dark:bg-dark-secondary text-default-text dark:text-dark-text"
                v-model="cardDocument.card.description"
                @change="updateCard" />

        <div class="order-4 flex flex-row place-items-end gap-1 overflow-hidden">
            <TagChipComponent v-if="cardDocument.card.tags"
                              v-for="tag in cardDocument.card.tags"
                              :text="tag.name"
                              :color="tag.color" />
        </div>

        <div class="order-5 flex place-items-end justify-between">
            <input type="date"
                   v-model="cardDocument.card.due_date"
                   @change="updateCard"
                   class="bg-white dark:bg-dark-secondary text-default-text dark:text-dark-text">
            <select v-model="cardDocument.card.card_status"
                    @change="updateCard"
                    class="bg-white dark:bg-dark-secondary text-default-text dark:text-dark-text">
                <option v-for="status in cardStore.statuses">{{ status }}</option>
            </select>
            <AssigneeChipComponent
                    v-if="cardDocument.card.assignee"
                    :assignee="cardDocument.card.assignee" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { ref } from "vue";
import { useBoardNameStore } from "../stores/boardNameStore";
import { useCardStore } from "../stores/cardStore";
import { useUserStore } from "../stores/userStore";
import type { CardType } from "../types/card";
import AssigneeChipComponent from "./AssigneeChipComponent.vue";
import TagChipComponent from "./TagChipComponent.vue";

const props = defineProps<{
    card: {
        documentId: string;
        card: CardType;
    }
}>();

const userStore = useUserStore();
const cardStore = useCardStore();
const boardNameStore = useBoardNameStore();

const cardDocument = ref(props.card);

const db = getFirestore();

function updateCard() {
    if (!userStore.user) {
        return;
    }
    updateDoc(doc(db, `board_${userStore.user.uid}_${boardNameStore.currentBoard}`, props.card.documentId), cardDocument.value.card);
}

function removeCard() {
    if (!userStore.user) {
        return;
    }
    deleteDoc(doc(db, `board_${userStore.user.uid}_${boardNameStore.currentBoard}`, props.card.documentId));
}
</script>
