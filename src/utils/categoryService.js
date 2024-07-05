import { api } from "boot/axios";

export const fetchCategories = async () => {
  return await api.get("/categories");
};

export const deleteCategory = async (id) => {
  return await api.delete(`/categories/${id}`);
};

export const fetchCategoriesWithSpent = async () => {
  return await api.get("/categories-with-spent");
};

export const fetchTopCategories = async () => {
  return await api.get("/top-categories");
};

export const createCategory = async (data) => {
  return await api.post("/categories", data);
};

export const updateCategory = async (id, data) => {
  return await api.put(`/categories/${id}`, data);
};
