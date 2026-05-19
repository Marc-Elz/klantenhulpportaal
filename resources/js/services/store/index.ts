import { ref, computed } from "vue";
import { getRequest, postRequest, putRequest, deleteRequest } from "../http";
import { storeType } from "./storeTypes";

export const storeModuleFactory = (moduleName: any) => {
    const state = ref<any>({});

    const getters = {
        all: computed(() => state.value),

        getById: (id: number | string) => computed(() => state.value[id]),
    };

    const setters = {
        setAll: (items: [storeType]) => {
            for (const item of items)
                state.value[item.id] = Object.freeze(item);
        },

        deleteByItem: (item: storeType) => {
            delete state.value[item.id];
        },
    };

    const actions = {
        getAll: async () => {
            const { data } = await getRequest(moduleName);
            if (!data) return;
            setters.setAll(data);
        },

        create: async (item: storeType) => {
            const { data } = await postRequest(moduleName, item);
            if (!data) return;
            setters.setAll(data);
        },

        update: async (id: number | string, item: storeType) => {
            const { data } = await putRequest(`${moduleName}/${id}`, item);
            if (!data) return;
            setters.setAll(data);
        },

        delete: async (id: number) => {
            await deleteRequest(`${moduleName}/${id}`);
            setters.deleteByItem({ id });
        },
    };

    return { getters, setters, actions };
};
