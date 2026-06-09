import { storeModuleFactory } from "../../services/store";
import { noteType } from "../../services/store/storeTypes";
import { computed } from "vue";

const noteStore = storeModuleFactory<noteType>(`/notes`);

export const setTicketId = (id: number | string) => {
    noteStore.setRoute(`tickets/${id}/notes`);
    noteStore.clearAll();
};

export const getAllNotes = noteStore.getters.all;
export const getNoteById = noteStore.getters.getById;

export const fetchNotes = async () => {
    return await noteStore.actions.getAll();
};

export const createNote = async (newNote: noteType) => {
    return await noteStore.actions.create(newNote);
};

export const updateNote = async (
    id: number | string,
    updatedNote: noteType,
) => {
    return await noteStore.actions.update(id, updatedNote);
};

export const deleteNote = async (id: number) => {
    return await noteStore.actions.delete(id);
};

export const getNotesSorted = computed(() => {
    return Object.values(getAllNotes.value).sort(
        (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
});
