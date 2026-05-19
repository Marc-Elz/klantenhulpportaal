import axios from "axios";
import { storeType } from "../store/storeTypes";

const http = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const getRequest = (endpoint: string) => http.get(endpoint);
export const postRequest = (endpoint: string, data: storeType) =>
    http.post(endpoint, data);
export const putRequest = (endpoint: string, data: storeType) =>
    http.put(endpoint, data);
export const deleteRequest = (endpoint: string) => http.delete(endpoint);
