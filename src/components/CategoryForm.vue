<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        {{ isEditMode ? "Editar Categoría" : "Crear Categoría" }}
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
        v-model="limitSpending"
        label="Límite de Gasto"
        type="number"
        class="q-mt-md"
        :error="limitError"
        @blur="validateLimitSpending"
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cerrar" color="primary" @click="$emit('close')" />
      <q-btn label="Guardar" color="primary" @click="validateAndSave" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { useCategoryForm } from "src/utils/composables/useCategoryForm";
import BaseInput from "components/BaseInput.vue";
import { useQuasar } from 'quasar';

const props = defineProps({
  initialData: Object,
});

const emit = defineEmits(["success", "close"]);
const $q = useQuasar();
const { name, limitSpending, isEditMode, saveCategory } = useCategoryForm(props.initialData, emit);

const nameError = ref('');
const limitError = ref('');

const validateName = () => {
  if (!name.value) {
    nameError.value = 'El nombre es requerido';
    return false;
  }
  nameError.value = '';
  return true;
};

const validateLimitSpending = () => {
  if (!limitSpending.value) {
    limitError.value = 'El límite de gasto es requerido';
    return false;
  }
  limitError.value = '';
  return true;
};

const validateAndSave = () => {
  const isNameValid = validateName();
  const isLimitValid = validateLimitSpending();

  if (isNameValid && isLimitValid) {
    saveCategory();
  } else {
    $q.notify({
      type: 'negative',
      message: 'Por favor completa los campos requeridos.'
    });
  }
};
</script>
