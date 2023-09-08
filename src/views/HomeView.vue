<template>
    <div class="w-full h-full flex flex-row flex-wrap justify-start gap-12 p-10 pt-16 dark:bg-dark-background">
        <template v-for="status in cardStore.statuses">
            <ColumnComponent :status="status" @drag-card="onDragCard" @drop="onDropCard(status)" @dragover.prevent
                             @dragenter.prevent />
        </template>
        <button class="text-3xl self-start text-default-text dark:text-dark-text" @click="addStatus">+</button>
    </div>
</template>

<script setup lang="ts">
import ColumnComponent from "../components/ColumnComponent.vue";
import { useCardStore } from "../stores/cardStore";
import type { CardType } from "../types/card";
import { updateCard } from "../utils/cardLogic";


const cardStore = useCardStore();
cardStore.init();

let currentCard: { card: CardType, documentId: string };

function onDragCard(ctx: any) {
    const crd = cardStore.cards.find(i => i.documentId === ctx.documentId);
    if (crd) {
        currentCard = crd;
    }
}

function onDropCard(status: string) {
    if (currentCard) {
        const card = cardStore.cards.find(i => i.documentId === currentCard.documentId);

        if (!card) {
            return;
        }
        card.card.card_status = status;

        updateCard(currentCard.documentId, card.card)
    }
}

// function addStatus() {
//     const current_statuses = cardStore.statuses
//
//
// }
</script>

<style>

</style>
