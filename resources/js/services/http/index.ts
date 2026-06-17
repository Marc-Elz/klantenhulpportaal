import axios from "axios";
import { destroyErrors, destroyMessage } from "../error";
import { setErrorBag, setMessage } from "../error";
import { storeType, authType, resetPasswordPayload } from "../store/storeTypes";

const http = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const getRequest = (endpoint: string) => http.get(endpoint);
export const postRequest = (
    endpoint: string,
    data: storeType | authType | resetPasswordPayload,
) => http.post(endpoint, data);
export const putRequest = (endpoint: string, data: storeType | authType) =>
    http.put(endpoint, data);
export const deleteRequest = (endpoint: string) => http.delete(endpoint);

http.interceptors.request.use(
    (config) => {
        destroyErrors(); // Wis oude fouten voordat een nieuw verzoek wordt uitgevoerd
        destroyMessage(); // Wis oude "messages" voordat een nieuw verzoek wordt uitgevoerd
        return config;
    },
    (error) => Promise.reject(error),
);

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 422) {
            setErrorBag(error.response.data.errors);
            setMessage(error.response.data.message);
        }
        if (error.response && error.response.status === 403) {
            setMessage(error.response.data.email); //
        }
        return Promise.reject(error);
    },
);
