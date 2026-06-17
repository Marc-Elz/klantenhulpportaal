import axios from "axios";
import { ref, computed } from "vue";
import { getRequest, postRequest } from "../../services/http";
import {
    authType,
    registerPayload,
    resetPasswordPayload,
    userType,
} from "../../services/store/storeTypes";
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
        register: async (data: registerPayload) => {
            const response = await postRequest("/register", data);
            return response;
        },
        forgotPassword: async (data: authType) => {
            const response = await postRequest("/forgot-password", data);
            return response;
        },
        resetPassword: async (data: resetPasswordPayload) => {
            const response = await postRequest("/reset-password", data);
            return response;
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

export const forgotPassword = async (data: string) => {
    const authdata = {
        email: data,
        password: "",
        id: 1,
    };
    const response = myAuthStore.actions.forgotPassword(authdata);
    return response;
};

export const resetPassword = async (data: resetPasswordPayload) => {
    const response = myAuthStore.actions.resetPassword(data);
    return response;
};

export const register = async (data: registerPayload) => {
    const response = myAuthStore.actions.register(data);
    return response;
};
