import { collection, doc, getDoc, getFirestore, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import type { CardType } from "../types/card";
import { useBoardNameStore } from "./boardNameStore";
import { useUserStore } from "./userStore";

export const useCardStore = defineStore("CardStore", {
    state: (): cardStore => {
        return {
            statuses: [],
            cards: []
        };
    },
    actions: {
        async init() {
            const db = getFirestore();
            const userStore = useUserStore();
            const boardNameStore = useBoardNameStore();

            if (userStore.user) {

                const firebaseUser = await getDoc(doc(db, "users", userStore.user.uid));
                
                if (firebaseUser.exists()) {
                    const userdata = firebaseUser.data();
                    boardNameStore.boards = userdata.boards;
                    boardNameStore.currentBoard = localStorage.getItem("board") ? localStorage.getItem("board") : userdata.boards[0];

                    userdata.boards.forEach((board: string) => {
                        if (userStore.user) {
                            getDoc(doc(db, `board_${userStore.user.uid}_${board}`, "board_base")).then(data => {
                                if (!data.exists() && userStore.user) {
                                    setDoc(doc(db, `board_${userStore.user.uid}_${board}`, "board_base"), {
                                        statuses: ["To-do", "In progress", "On hold", "Finished"],
                                        timestamp: new Date()
                                    });
                                }
                            });
                        }
                    });
                }

                startListener(boardNameStore.currentBoard);
                boardNameStore.$subscribe((mutation, state) => {
                    startListener(state.currentBoard);
                });
            }
        }
    }
});

type cardStore = {
    statuses: Array<string>
    cards: Array<{ documentId: string, card: CardType }>
}

function startListener(board: string) {
    localStorage.setItem("board", board);

    const db = getFirestore();
    const userStore = useUserStore();
    const cardStore = useCardStore();

    if (userStore.user) {
        const q = query(collection(db, `board_${userStore.user.uid}_${board}`), orderBy("timestamp", "desc"));


        onSnapshot(q, (querySnapshot) => {
            const cardsArray: Array<{ documentId: string, statuses: Array<string>, card: CardType }> = [];
            querySnapshot.forEach((doc) => {
                if (doc.id === "board_base") {
                    return cardStore.statuses = doc.data().statuses;
                }
                cardsArray.push({ documentId: doc.id, statuses: cardStore.statuses, card: <CardType>doc.data() });
            });

            cardStore.cards = cardsArray;
        });
    }
}
