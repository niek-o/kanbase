import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useBoardNameStore } from "../stores/boardNameStore";
import { useCardStore } from "../stores/cardStore";
import { useUserStore } from "../stores/userStore";
import type { CardType } from "../types/card";

const userStore = useUserStore();
const cardStore = useCardStore();
const boardNameStore = useBoardNameStore();


const db = getFirestore();

export function updateCard(documentId: string, card: CardType) {
    if (!userStore.user) {
        return;
    }
    updateDoc(doc(db, `board_${userStore.user.uid}_${boardNameStore.currentBoard}`, documentId), card);
}
