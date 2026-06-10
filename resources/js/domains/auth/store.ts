import axios from "axios";
import { ref, computed } from "vue";
import { getRequest, postRequest } from "../../services/http";
import { authType, userType } from "../../services/store/storeTypes";
import { unMountTickets } from "../tickets/store";

const authStore = () => {
    const state = ref<userType | null>(null);

    const getters = {
        getCurrentUser: computed(() => state.value),
    };

    const setters = {
        setCurrentUser: (item: userType) => {
            state.value = Object.freeze(item);
        },
    };

    const actions = {
        authenticate: async (data: authType) => {
            await axios.get("/sanctum/csrf-cookie");
            const response = await postRequest("/login", data);
            return response;
        },
        logout: async (data: authType) => {
            const response = await postRequest("/logout", data);
            if (response && response.status === 200) {
                state.value = null;
            }
            return response;
        },
        fetchSetUser: async () => {
            try {
                const response = await getRequest("/user");
                setters.setCurrentUser(response.data);
                return response.data;
            } catch {
                return null;
            }
        },
    };

    return { getters, actions };
};

const myAuthStore = authStore();

export const fetchSetUser = async () => {
    const response = myAuthStore.actions.fetchSetUser();
    return response;
};

export const authenticate = async (data: authType) => {
    const response = myAuthStore.actions.authenticate(data);
    return response;
};

export const logout = async (data: authType) => {
    const response = myAuthStore.actions.logout(data);
    unMountTickets();
    return response;
};

export const getCurrentUser = myAuthStore.getters.getCurrentUser;

export const isAdmin = computed(
    () => getCurrentUser.value && getCurrentUser.value["role"] === "admin",
);
