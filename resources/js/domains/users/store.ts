import { storeModuleFactory } from "../../services/store";
import { userType } from "../../services/store/storeTypes";
import { computed } from "vue";

const userStore = storeModuleFactory("users");

export const getAllUsers = userStore.getters.all;
export const getUserById = userStore.getters.getById;

export const fetchUsers = async () => {
    return await userStore.actions.getAll();
};

export const createUser = async (newUser: userType) => {
    return await userStore.actions.create(newUser);
};

export const updateUser = async (
    id: number | string,
    updatedUser: userType,
) => {
    return await userStore.actions.update(id, updatedUser);
};

export const deleteUser = async (id: number) => {
    return await userStore.actions.delete(id);
};

export const getAllAdmins = computed(() => {
    const users = getAllUsers;
    return Object.values(users.value).filter((user) => user.role === "admin");
});
