import { api } from 'boot/axios';

export const fetchCuentasPorPagar = async (params) => {
  return await api.get('/cuentas-por-pagar', { params });
};

export const exportCuentasPorPagar = async (params) => {
  return await api.get('/export-cuentas-por-pagar', {
    params,
    responseType: 'blob',
  });
};
