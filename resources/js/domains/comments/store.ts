import { storeModuleFactory } from "../../services/store";
import { commentType } from "../../services/store/storeTypes";
import {
    deleteRequest,
    getRequest,
    postRequest,
    putRequest,
} from "../../services/http";
import { ref, computed } from "vue";

const comments = ref<any>({});

// const commentStore = storeModuleFactory(`/comments`);
let ticketId = null;
let apiRoute = "";

export const setTicketId = (id: number | string) => {
    ticketId = id;
    apiRoute = `tickets/${ticketId}/comments`;
};

export const clearComments = () => {
    comments.value = {};
};

export const getAllComments = computed(() => comments.value);
export const getCommentById = computed(
    () => (id: number | string) => comments.value[id],
);

export const fetchComments = async () => {
    const { data } = await getRequest(apiRoute);
    if (!data) return;
    setAll(data);
};

export const createComment = async (newComment: commentType) => {
    const { data } = await postRequest(apiRoute, newComment);
    if (!data) return;
    setAll(data);
};

export const updateComment = async (
    id: number | string,
    updatedComment: commentType,
) => {
    const { data } = await putRequest(`${apiRoute}/${id}`, updatedComment);
    if (!data) return;
    setAll(data);
};

export const deleteComment = async (id: number) => {
    await deleteRequest(`${apiRoute}/${id}`);
    deleteByItem(id);
};

const setAll = (items: [commentType]) => {
    for (const item of items) comments.value[item.id] = Object.freeze(item);
};

const deleteByItem = (id: number) => {
    delete comments.value[id];
};
