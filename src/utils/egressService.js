import { api } from "boot/axios";

export const fetchEgresses = async () => {
  return await api.get("/egresses");
};

export const deleteEgress = async (id, deleteAllRelated) => {
  return await api.delete(`/egresses/${id}`, {
    params: { delete_all: deleteAllRelated },
  });
};

export const fetchCategories = async () => {
  return await api.get('/categories');
};

export const fetchPaymentMethods = async () => {
  return await api.get('/payment-methods');
};

export const createEgress = async (data) => {
  return await api.post('/egresses', data);
};

export const updateEgress = async (id, data) => {
  return await api.put(`/egresses/${id}`, data);
};
