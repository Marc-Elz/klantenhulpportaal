import { getRequest, postRequest } from "../../services/http";
import { authType } from "../../services/store/storeTypes";
import axios from "axios";

export const fetchUser = async () => {
    return await getRequest("/user");
};

export const authenticate = async (data: authType) => {
    await axios.get("/sanctum/csrf-cookie");
    const response = await postRequest("/login", data);
    return response;
};

export const logout = async (data: authType) => {
    const response = await postRequest("/logout", data);
    return response;
};
