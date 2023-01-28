import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, type User } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
    state: (): authUser => {
        return {
            user: null
        };
    },
    actions: {
        reset() {
            this.user = null;
            signOut(getAuth());
        },
        async login() {
            const provider = new GoogleAuthProvider();

            try {
                const auth = getAuth();
                const result = await signInWithPopup(auth, provider).catch(e => {
                    console.error(e);
                });

                if (!result || !result.user) {
                    return;
                }

                this.user = result.user;
            } catch (err) {
                return console.error(err);
            }

            const db = getFirestore();

            const user = await getDoc(doc(db, "users", this.user.uid));

            if (user.exists()) {
                updateDoc(doc(db, "users", this.user.uid), {
                    name: this.user.displayName,
                    profile_picture: this.user.photoURL,
                    last_sign_on: new Date()
                });
            }
            else {
                setDoc(doc(db, "users", this.user.uid), {
                    name: this.user.displayName,
                    uid: this.user.uid,
                    email: this.user.email,
                    profile_picture: this.user.photoURL,
                    last_sign_on: new Date(),
                    boards: ["kanban"]
                });
            }
        }
    }
});

interface authUser {
    user: User | null;
}
