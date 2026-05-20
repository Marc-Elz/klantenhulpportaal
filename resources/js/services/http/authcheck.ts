import axios from "axios";
import { computed } from "vue";

let isAuthenticated = false;

export const checkAuthentication = computed(() => {
    axios
        .get("/api/auth-check")
        .then((response) => {
            isAuthenticated = response.data.authenticated;
        })
        .catch((error) => {
            console.error("Error checking authentication:", error);
        });
});
