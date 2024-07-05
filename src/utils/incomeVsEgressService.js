import { api } from 'boot/axios';

export const fetchIncomeVsEgress = async () => {
  return await api.get('/income-vs-egress');
};
