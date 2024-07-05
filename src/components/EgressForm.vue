<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        {{ isEditMode ? "Editar Egreso" : "Crear Egreso" }}
      </div>
    </q-card-section>

    <q-card-section>
      <BaseInput
        v-model="name"
        label="Nombre"
        :error="nameError"
        @blur="validateName"
      />
      <BaseInput
        v-model="amount"
        label="Cantidad"
        type="number"
        class="q-mt-md"
        :error="amountError"
        @blur="validateAmount"
      />

      <q-select
        v-model="categoryId"
        label="Categoría"
        :options="categoryOptions"
        emit-value
        map-options
        outlined
        class="q-mt-md"
        :error="categoryError"
        @blur="validateCategory"
      />

      <q-select
        v-model="paymentMethodId"
        label="Método de Pago"
        :options="paymentMethodOptions"
        emit-value
        map-options
        outlined
        class="q-mt-md"
        :error="paymentMethodError"
        @blur="validatePaymentMethod"
      />

      <q-input
        v-model="dateEgreso"
        label="Fecha del Egreso"
        type="date"
        outlined
        class="q-mt-md"
      />

      <q-select
        v-model="status"
        label="Estatus"
        :options="statusOptions"
        emit-value
        map-options
        outlined
        class="q-mt-md"
      />

      <q-checkbox
        v-model="isFixed"
        label="¿Tu egreso es recurrente?"
        class="q-mt-md"
      />

      <q-select
        v-model="frequency"
        label="Frecuencia"
        :options="frequencyOptions"
        emit-value
        map-options
        outlined
        class="q-mt-md"
        v-if="isFixed"
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cerrar" color="primary" @click="$emit('close')" />
      <q-btn label="Guardar" color="primary" @click="validateAndSave" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref } from 'vue';
import { useEgressForm } from 'src/utils/composables/useEgressForm';
import BaseInput from 'components/BaseInput.vue';
import { useQuasar } from 'quasar';

const props = defineProps({
  initialData: Object,
});

const emit = defineEmits(['success', 'close']);
const $q = useQuasar();

const {
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
} = useEgressForm(props.initialData, emit);

onMounted(() => {
  fetchCategoryOptions();
  fetchPaymentMethodOptions();
});

const nameError = ref('');
const amountError = ref('');
const categoryError = ref('');
const paymentMethodError = ref('');

const validateName = () => {
  if (!name.value) {
    nameError.value = 'El nombre es requerido';
    return false;
  }
  nameError.value = '';
  return true;
};

const validateAmount = () => {
  if (!amount.value) {
    amountError.value = 'La cantidad es requerida';
    return false;
  }
  amountError.value = '';
  return true;
};

const validateCategory = () => {
  if (!categoryId.value) {
    categoryError.value = 'La categoría es requerida';
    return false;
  }
  categoryError.value = '';
  return true;
};

const validatePaymentMethod = () => {
  if (!paymentMethodId.value) {
    paymentMethodError.value = 'El método de pago es requerido';
    return false;
  }
  paymentMethodError.value = '';
  return true;
};

const validateAndSave = () => {
  const isNameValid = validateName();
  const isAmountValid = validateAmount();
  const isCategoryValid = validateCategory();
  const isPaymentMethodValid = validatePaymentMethod();

  if (isNameValid && isAmountValid && isCategoryValid && isPaymentMethodValid) {
    saveEgress();
  } else {
    $q.notify({
      type: 'negative',
      message: 'Por favor completa los campos requeridos.'
    });
  }
};
</script>
