<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        {{ isEditMode ? "Editar Ingreso" : "Crear Ingreso" }}
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
        label="Monto"
        type="number"
        class="q-mt-md"
        :error="amountError"
        @blur="validateAmount"
      />

      <q-checkbox
        v-model="isFixed"
        label="¿Es un ingreso recurrente?"
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
      <q-input
        v-model="dateIngreso"
        label="Fecha del ingreso"
        type="date"
        outlined
        class="q-mt-md"
      />
      <q-input
        v-model="type"
        label="Tipo"
        :disable="true"
        class="q-mt-md"
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cerrar" color="primary" @click="$emit('close')" />
      <q-btn label="Guardar" color="primary" @click="validateAndSave" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { useIncomeForm } from 'src/utils/composables/useIncomeForm';
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
  frequency,
  type,
  isEditMode,
  isFixed,
  dateIngreso,
  frequencyOptions,
  saveIncome,
} = useIncomeForm(props.initialData, emit);

const nameError = ref('');
const amountError = ref('');

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
    amountError.value = 'El monto es requerido';
    return false;
  }
  amountError.value = '';
  return true;
};

const validateAndSave = () => {
  const isNameValid = validateName();
  const isAmountValid = validateAmount();

  if (isNameValid && isAmountValid) {
    saveIncome();
  } else {
    $q.notify({
      type: 'negative',
      message: 'Por favor completa los campos requeridos.'
    });
  }
};
</script>
