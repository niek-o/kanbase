import { defineStore } from "pinia";

export const useBoardNameStore = defineStore("BoardNameStore", {
    state: (): { boards: Array<string>, currentBoard: string } => {
        return {
            boards: [],
            currentBoard: ""
        };
    }
});
