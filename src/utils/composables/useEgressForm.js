import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { fetchCategories, fetchPaymentMethods, createEgress, updateEgress } from '../egressService';

export const useEgressForm = (initialData, emit) => {
  const name = ref("");
  const amount = ref(0);
  const categoryId = ref(null);
  const paymentMethodId = ref(null);
  const dateEgreso = ref("");
  const status = ref("");
  const isFixed = ref(false);
  const frequency = ref("");
  const isEditMode = ref(false);

  const categoryOptions = ref([]);
  const paymentMethodOptions = ref([]);
  const frequencyOptions = [
    { label: "Semanal", value: "weekly" },
    { label: "Quincenal", value: "biweekly" },
    { label: "Mensual", value: "monthly" },
  ];
  const statusOptions = [
    { label: "PAGADO", value: "pagado" },
    { label: "PENDIENTE", value: "pendiente" },
  ];

  const $q = useQuasar();

  const fetchCategoryOptions = async () => {
    try {
      const response = await fetchCategories();
      categoryOptions.value = response.data.map((category) => ({
        label: category.name,
        value: category.id,
      }));
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Failed to fetch categories",
      });
    }
  };

  const fetchPaymentMethodOptions = async () => {
    try {
      const response = await fetchPaymentMethods();
      paymentMethodOptions.value = response.data.map((method) => ({
        label: method.name,
        value: method.id,
      }));
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Failed to fetch payment methods",
      });
    }
  };

  const resetForm = () => {
    name.value = "";
    amount.value = 0;
    categoryId.value = null;
    paymentMethodId.value = null;
    dateEgreso.value = "";
    status.value = "";
    isFixed.value = false;
    frequency.value = "";
  };

  watch(
    () => initialData,
    (newVal) => {
      if (newVal) {
        name.value = newVal.name;
        amount.value = newVal.amount;
        categoryId.value = newVal.category_id;
        paymentMethodId.value = newVal.payment_method_id;
        dateEgreso.value = newVal.date_egreso;
        status.value = newVal.status;
        isFixed.value = newVal.is_fixed;
        frequency.value = newVal.frequency || "";
        isEditMode.value = true;
      } else {
        resetForm();
        isEditMode.value = false;
      }
    },
    { immediate: true }
  );

  const saveEgress = async () => {
    try {
      const payload = {
        name: name.value,
        category_id: categoryId.value,
        amount: amount.value,
        date_egreso: dateEgreso.value,
        status: status.value,
        payment_method_id: paymentMethodId.value,
        is_fixed: isFixed.value,
        frequency: isFixed.value ? frequency.value : null,
      };

      if (isEditMode.value && initialData) {
        await updateEgress(initialData.id, payload);
        $q.notify({
          type: "positive",
          message: "Egreso actualizado correctamente",
        });
      } else {
        await createEgress(payload);
        $q.notify({
          type: "positive",
          message: "Egreso creado correctamente",
        });
      }
      resetForm();
      emit("success");
    } catch (error) {
      $q.notify({
        type: "negative",
        message: `No se pudo ${isEditMode.value ? "actualizar" : "crear"} el egreso`,
      });
    }
  };

  return {
    name,
    amount,
    categoryId,
    paymentMethodId,
    dateEgreso,
    status,
    isFixed,
    frequency,
    isEditMode,
    categoryOptions,
    paymentMethodOptions,
    frequencyOptions,
    statusOptions,
    fetchCategoryOptions,
    fetchPaymentMethodOptions,
    saveEgress,
  };
};
