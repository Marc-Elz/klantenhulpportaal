import axios from "axios";
import { ref, computed } from "vue";
import { getRequest, postRequest } from "../../services/http";
import { authType } from "../../services/store/storeTypes";

const authStore = () => {
    const state = ref<any>({});

    const getters = {
        getCurrentUser: () => computed(() => state.value),
    };

    const setters = {
        setCurrentUser: (items: [authType]) => {
            // for (const item of items)
            //     state.value[item.id] = Object.freeze(item);
            state.value = Object.freeze(items);
            console.log(state.value);
            console.log(state.value.data);
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
            return response;
        },
        fetchuser: async () => {
            const data = await getRequest("/user");
            setters.setCurrentUser(data);
            return data;
        },
    };

    return { getters, actions };
};

const myAuthStore = authStore();

export const fetchUser = async () => {
    const response = myAuthStore.actions.fetchuser();
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

export const getCurrentUser = async () => {
    const response = myAuthStore.getters.getCurrentUser();
    console.log(response);
    return response;
};
