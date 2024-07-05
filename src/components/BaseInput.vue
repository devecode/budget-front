<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="updateValue"
    :label="label"
    :type="type"
    :error="!!error"
    :error-message="error"
    outlined
  />
</template>

<script setup>
import { defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: "text",
  },
  error: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(["update:modelValue"]);

const updateValue = (value) => {
  emits("update:modelValue", value);
};

watch(
  () => props.modelValue,
  (newValue) => {
  }
);
</script>
