<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Reportes de Categorías</div>
        <CategoryChart />
      </q-card-section>
    </q-card>
    <q-table
      v-if="categoriesWithSpent.length"
      :rows="categoriesWithSpent"
      :columns="columns"
      row-key="id"
      title="Todas las Categorías"
      class="q-mt-md"
    >
      <template v-slot:body-cell-total_spent="props">
        <q-td :props="props">
          {{ formatCurrency(props.row.total_spent) }}
        </q-td>
      </template>
      <template v-slot:body-cell-remaining_budget="props">
        <q-td :props="props">
          {{ formatCurrency(props.row.limit_spending - props.row.total_spent) }}
        </q-td>
      </template>
    </q-table>
    <div v-else>No hay categorías disponibles</div>
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { formatCurrency } from "src/utils/utils";
import { useCategory } from "src/utils/composables/useCategory";
import CategoryChart from "components/CategoryChart.vue";

const { categoriesWithSpent, loadCategoriesWithSpent } = useCategory();

const columns = [
  {
    name: "name",
    required: true,
    label: "Categoría",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "limit_spending",
    required: true,
    label: "Límite de Gasto",
    align: "center",
    field: (row) => row.limit_spending,
    format: (val) => formatCurrency(val),
    sortable: true,
  },
  {
    name: "total_spent",
    required: true,
    label: "Total Gastado",
    align: "center",
    field: (row) => row.total_spent,
    format: (val) => formatCurrency(val),
    sortable: true,
  },
  {
    name: "remaining_budget",
    required: true,
    label: "Presupuesto Restante",
    align: "center",
    field: (row) => row.limit_spending - row.total_spent,
    format: (val) => formatCurrency(val),
    sortable: true,
  },
];

onMounted(() => {
  loadCategoriesWithSpent();
});
</script>
