import { api } from "boot/axios";

export const fetchCategoriesWithSpent = async (params) => {
  return await api.get("/categories-with-spent", { params });
};

export const fetchIncomeVsEgress = async (params) => {
  return await api.get("/income-vs-egress", { params });
};

export const fetchPaymentMethodsWithSpending = async (params) => {
  return await api.get("/spending-by-payment-method", { params });
};

export const fetchAccountsToPay = async (params) => {
  return await api.get("/accounts-payable", { params });
};
