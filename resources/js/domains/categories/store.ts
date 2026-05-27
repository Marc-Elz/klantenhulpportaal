import { storeModuleFactory } from "../../services/store";
import { categoryType } from "../../services/store/storeTypes";

const categoryStore = storeModuleFactory("categories");

export const getAllCategories = categoryStore.getters.all;
export const getCategoryById = categoryStore.getters.getById;

export const fetchCategories = async () => {
    return await categoryStore.actions.getAll();
};

export const createCategory = async (newCategory: categoryType) => {
    return await categoryStore.actions.create(newCategory);
};

export const updateCategory = async (
    id: number | string,
    updatedCategory: categoryType,
) => {
    return await categoryStore.actions.update(id, updatedCategory);
};

export const deleteCategory = async (id: number) => {
    return await categoryStore.actions.delete(id);
};
