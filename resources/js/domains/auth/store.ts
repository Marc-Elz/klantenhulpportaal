import axios from "axios";
import { ref, computed } from "vue";
import { getRequest, postRequest } from "../../services/http";
import { authType } from "../../services/store/storeTypes";

export const setStoredUser = (userData: any) => {
    console.log(userData);
    console.log("stringified:", JSON.stringify(userData));
    localStorage.setItem("currentUser", JSON.stringify(userData));
};

export const getStoredUser = () => {
    const userData = localStorage.getItem("currentUser");
    console.log("userdata", userData);
    return userData ? JSON.parse(userData) : null;
};

export const clearStoredUser = () => {
    localStorage.removeItem("currentUser");
};

export const authStore = () => {
    const state = ref<any>({});

    const getters = {
        getCurrentUser: () =>
            computed(() => state.value.data || getStoredUser()),
    };

    const setters = {
        setCurrentUser: (item: [authType]) => {
            console.log("item:", Object.freeze(item));
            state.value = Object.freeze(item);
            setStoredUser(item);
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
                clearStoredUser();
            }
            return response;
        },
        fetchSetUser: async () => {
            const response = await getRequest("/user");
            setters.setCurrentUser(response.data);
            return response.data;
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
    return response;
};

export const getCurrentUser = () => {
    const response = myAuthStore.getters.getCurrentUser();
    console.log("outer");
    console.log(response.value);
    return response.value;
};

export const globalUser = ref(null);
