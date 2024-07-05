import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { createIncome, updateIncome } from '../incomeService';

export const useIncomeForm = (initialData, emit) => {
  const name = ref("");
  const amount = ref(0);
  const frequency = ref("");
  const type = ref("variable");
  const isEditMode = ref(false);
  const isFixed = ref(false);
  const dateIngreso = ref("");

  const frequencyOptions = [
    { label: "SEMANAL", value: "weekly" },
    { label: "QUINCENAL", value: "biweekly" },
    { label: "MENSUAL", value: "monthly" },
  ];

  const $q = useQuasar();

  const resetForm = () => {
    name.value = "";
    amount.value = 0;
    frequency.value = "";
    dateIngreso.value = "";
    type.value = "variable";
    isFixed.value = false;
  };

  watch(
    () => initialData,
    (newVal) => {
      if (newVal) {
        name.value = newVal.name;
        amount.value = newVal.amount;
        frequency.value = newVal.frequency;
        dateIngreso.value = newVal.date_ingreso;
        type.value = newVal.type;
        isEditMode.value = true;
        isFixed.value = newVal.is_fixed;
      } else {
        resetForm();
        isEditMode.value = false;
      }
    },
    { immediate: true }
  );

  watch(
    isFixed,
    (newVal) => {
      type.value = newVal ? "fixed" : "variable";
    },
    { immediate: true }
  );

  const saveIncome = async () => {
    try {
      const payload = {
        name: name.value,
        frequency: isFixed.value ? frequency.value : null,
        amount: amount.value,
        date_ingreso: dateIngreso.value,
        type: type.value,
        is_fixed: isFixed.value,
      };
      if (isEditMode.value && initialData) {
        await updateIncome(initialData.id, payload);
        $q.notify({
          type: "positive",
          message: "Ingresos actualizados",
        });
      } else {
        await createIncome(payload);
        $q.notify({
          type: "positive",
          message: "Ingreso creado correctamente",
        });
      }
      resetForm();
      emit("success");
    } catch (error) {
      $q.notify({
        type: "negative",
        message: `Failed to ${isEditMode.value ? "update" : "create"} income`,
      });
      console.error("Error saving income:", error);
    }
  };

  return {
    name,
    amount,
    frequency,
    type,
    isEditMode,
    isFixed,
    dateIngreso,
    frequencyOptions,
    saveIncome,
  };
};
