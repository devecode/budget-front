<template>
  <q-page class="q-pa-md">
    <q-form @submit.prevent="exportCuentas" class="q-mb-md" align="right">
      <q-input v-model="startDate" label="Fecha de inicio" type="date" filled class="q-mb-sm" />
      <q-input v-model="endDate" label="Fecha de fin" type="date" filled class="q-mb-sm" />
      <q-btn label="Exportar Cuentas por Pagar" type="submit" color="primary" icon="file_download" >
        <template v-slot:append>
          <q-icon name="file_download" />
        </template>
      </q-btn>
    </q-form>
    <q-table :rows="cuentasPorPagar" :columns="columns" row-key="id" title="Cuentas por Pagar">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn size="sm" color="primary" icon="edit" @click="editEgress(props.row)" />
          <q-btn size="sm" color="negative" icon="delete" @click="deleteEgress(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCuentasPorPagar } from 'src/utils/composables/useCuentasPorPagar';

const { cuentasPorPagar, startDate, endDate, columns, loadCuentasPorPagar, exportCuentas } = useCuentasPorPagar();

onMounted(loadCuentasPorPagar);
</script>
