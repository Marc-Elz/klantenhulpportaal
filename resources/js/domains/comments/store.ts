import { storeModuleFactory } from "../../services/store";
import { commentType } from "../../services/store/storeTypes";
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