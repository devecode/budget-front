<template>
  <q-page class="q-pa-md">
    <q-form @submit.prevent="loadSpendingData" class="q-mb-md">
      <q-select v-model="selectedPaymentMethod" :options="paymentMethods" label="Método de Pago" class="q-mb-sm" />
      <q-input v-model="startDate" label="Fecha de inicio" type="date" filled class="q-mb-sm" />
      <q-input v-model="endDate" label="Fecha de fin" type="date" filled class="q-mb-sm" />
      <q-btn label="Buscar" type="submit" color="primary" />
      <q-btn label="Exportar a Excel" color="secondary" icon="file_download" @click="exportToExcel" />
    </q-form>
    <q-table :rows="spendingData" :columns="columns" row-key="category">
      <template v-slot:body-cell-total_spent="props">
        <q-td :props="props">
          {{ formatCurrency(props.row.total_spent) }}
        </q-td>
      </template>
      <template v-slot:body-cell-limit_spending="props">
        <q-td :props="props">
          {{ formatCurrency(props.row.limit_spending) }}
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePaymentMethods } from 'src/utils/composables/usePaymentMethods';

const {
  spendingData,
  selectedPaymentMethod,
  startDate,
  endDate,
  paymentMethods,
  columns,
  formatCurrency,
  loadSpendingData,
  exportToExcel,
} = usePaymentMethods();

onMounted(loadSpendingData);
</script>
