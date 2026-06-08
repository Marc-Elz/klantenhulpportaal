import { ref, computed } from "vue";
import { getRequest, postRequest, putRequest, deleteRequest } from "../http";
import { storeType } from "./storeTypes";

export const storeModuleFactory = <T extends storeType>(moduleName: string) => {
    const state = ref<Record<number | string, T>>({});
    let apiRoute = moduleName;

    const setRoute = (route: string) => {
        apiRoute = route;
    };

    const clearAll = () => {
        state.value = {};
    };

    const getters = {
        all: computed(() => state.value),

        getById: (id: number | string) => computed(() => state.value[id]),
    };

    const setters = {
        setAll: (items: T[]) => {
            for (const item of items)
                state.value[item.id] = Object.freeze(item);
        },

        deleteByItem: (item: storeType) => {
            delete state.value[item.id];
        },
    };

    const actions = {
        getAll: async () => {
            const { data } = await getRequest(apiRoute);
            if (!data) return;
            setters.setAll(data);
        },

        create: async (item: T) => {
            const { data } = await postRequest(apiRoute, item);
            if (!data) return;
            setters.setAll(data);
        },

        update: async (id: number | string, item: T) => {
            const { data } = await putRequest(`${apiRoute}/${id}`, item);
            if (!data) return;
            setters.setAll(data);
        },

        delete: async (id: number) => {
            await deleteRequest(`${apiRoute}/${id}`);
            setters.deleteByItem({ id });
        },
    };

    return { getters, setters, actions, setRoute, clearAll};
};
