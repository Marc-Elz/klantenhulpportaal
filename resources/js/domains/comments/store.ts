import { storeModuleFactory } from "../../services/store";
import { commentType } from "../../services/store/storeTypes";
import { computed } from "vue";

const commentStore = storeModuleFactory<commentType>(`/comments`);

export const setTicketId = (id: number | string) => {
    commentStore.setRoute(`tickets/${id}/comments`);
    commentStore.clearAll();
};

export const getAllComments = commentStore.getters.all;
export const getCommentById = commentStore.getters.getById;

export const fetchComments = async () => {
    return await commentStore.actions.getAll();
};

export const createComment = async (newComment: commentType) => {
    return await commentStore.actions.create(newComment);
};

export const updateComment = async (
    id: number | string,
    updatedComment: commentType,
) => {
    return await commentStore.actions.update(id, updatedComment);
};

export const deleteComment = async (id: number) => {
    return await commentStore.actions.delete(id);
};

export const getCommentsSorted = computed(() => {
    return Object.values(getAllComments.value).sort(
        (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
});
