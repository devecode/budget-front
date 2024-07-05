import { ref } from 'vue';
import { fetchCuentasPorPagar, exportCuentasPorPagar } from '../cuentasService';
import { useQuasar } from 'quasar';
import { saveAs } from 'file-saver';
import { formatCurrency, formatDate } from 'src/utils/utils';

export const useCuentasPorPagar = () => {
  const cuentasPorPagar = ref([]);
  const startDate = ref('');
  const endDate = ref('');
  const $q = useQuasar();

  const columns = [
    {
      name: 'name',
      required: true,
      label: 'Nombre',
      align: 'center',
      field: (row) => row.name,
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: 'category',
      required: true,
      label: 'Categoría',
      align: 'center',
      field: (row) => row.category.name,
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: 'amount',
      required: true,
      label: 'Monto',
      align: 'center',
      field: 'amount',
      format: (val) => formatCurrency(val),
      sortable: true,
    },
    {
      name: 'date_egreso',
      required: true,
      label: 'Fecha de Pago',
      align: 'center',
      field: 'date_egreso',
      format: (val) => formatDate(val),
      sortable: true,
    },
    {
      name: 'payment_method',
      required: true,
      label: 'Método de Pago',
      align: 'center',
      field: (row) => row.payment_method.name,
      format: (val) => `${val}`,
      sortable: true,
    },
  ];

  const loadCuentasPorPagar = async () => {
    try {
      const response = await fetchCuentasPorPagar({
        start_date: startDate.value,
        end_date: endDate.value,
      });
      cuentasPorPagar.value = response.data;
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'Failed to fetch cuentas por pagar',
      });
    }
  };

  const exportCuentas = async () => {
    try {
      const response = await exportCuentasPorPagar({
        start_date: startDate.value,
        end_date: endDate.value,
      });
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'cuentas_por_pagar.xlsx');

      startDate.value = '';
      endDate.value = '';
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'Failed to export cuentas por pagar',
      });
    }
  };

  return {
    cuentasPorPagar,
    startDate,
    endDate,
    columns,
    loadCuentasPorPagar,
    exportCuentas,
  };
};
