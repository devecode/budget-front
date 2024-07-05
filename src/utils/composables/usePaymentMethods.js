import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { saveAs } from 'file-saver';
import { fetchSpendingByPaymentMethod, exportSpendingDataToExcel } from '../paymentMethodsService';
import { formatCurrency } from '../utils';

export const usePaymentMethods = () => {
  const spendingData = ref([]);
  const selectedPaymentMethod = ref('');
  const startDate = ref('');
  const endDate = ref('');
  const $q = useQuasar();

  const paymentMethods = ['Credit Card', 'Debit Card', 'Transfer', 'Cash'];

  const columns = [
    { name: 'payment_method', required: true, label: 'Método de Pago', align: 'left', field: 'payment_method', sortable: true },
    { name: 'category', required: true, label: 'Categoría', align: 'left', field: 'category', sortable: true },
    { name: 'total_spent', required: true, label: 'Total Gastado', align: 'right', field: 'total_spent', sortable: true },
    { name: 'limit_spending', required: true, label: 'Límite de Gasto', align: 'right', field: 'limit_spending', sortable: true },
  ];

  const loadSpendingData = async () => {
    try {
      const response = await fetchSpendingByPaymentMethod({
        payment_method: selectedPaymentMethod.value || undefined,
        start_date: startDate.value || undefined,
        end_date: endDate.value || undefined,
      });
      spendingData.value = response.data;
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'Failed to fetch spending data',
      });
    }
  };

  const exportToExcel = async () => {
    try {
      const response = await exportSpendingDataToExcel({
        start_date: startDate.value || undefined,
        end_date: endDate.value || undefined,
        payment_method: selectedPaymentMethod.value || undefined,
      });
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'pay_methods_view.xlsx');
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'Failed to export spending data',
      });
    }
  };

  return {
    spendingData,
    selectedPaymentMethod,
    startDate,
    endDate,
    paymentMethods,
    columns,
    formatCurrency,
    loadSpendingData,
    exportToExcel,
  };
};
