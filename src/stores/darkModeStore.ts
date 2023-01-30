import { defineStore } from "pinia";

export const useDarkModeStore = defineStore("DarkModeStore", {
    state: (): { darkMode: boolean } => {
        return {
            darkMode: window.matchMedia("(prefers-color-scheme:dark)").matches,
        };
    }
});
