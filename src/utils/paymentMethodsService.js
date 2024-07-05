import { api } from 'boot/axios';

export const fetchSpendingByPaymentMethod = async (params) => {
  return await api.get('/payment-method-view', { params });
};

export const exportSpendingDataToExcel = async (params) => {
  return await api.get('/export-payment-method-view', {
    params,
    responseType: 'blob',
  });
};
