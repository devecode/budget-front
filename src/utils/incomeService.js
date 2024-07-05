import { api } from "boot/axios";

export const fetchIncomes = async () => {
  return await api.get("/incomes");
};

export const createIncome = async (data) => {
  return await api.post('/incomes', data);
};

export const updateIncome = async (id, data) => {
  return await api.put(`/incomes/${id}`, data);
};

export const deleteIncome = async (id) => {
  return await api.delete(`/incomes/${id}`);
};
