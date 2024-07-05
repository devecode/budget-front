<template>
  <q-page class="q-pa-md">
    <q-btn
      v-permission="['1', '2']"
      label="Crear Ingreso"
      color="primary"
      @click="openCreateIncomeModal"
      class="q-mb-md"
    />
    <q-input
      filled
      v-model="search"
      debounce="300"
      placeholder="Buscar..."
      class="q-mb-md"
    />
    <q-table :rows="filteredIncomes" :columns="computedColumns" row-key="id" title="Ingresos">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            color="primary"
            icon="edit"
            @click="openEditIncomeModal(props.row)"
          />
          <q-btn
            size="sm"
            color="negative"
            icon="delete"
            @click="confirmDeleteIncome(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="isIncomeModalOpen" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <IncomeForm
            :initial-data="currentIncome"
            @success="handleIncomeSaved"
            @close="isIncomeModalOpen = false"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            color="primary"
            @click="isIncomeModalOpen = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { formatCurrency, formatDate } from "src/utils/utils";
import { useIncome } from "src/utils/composables/useIncome";
import { useUserStore } from 'stores/user';
import IncomeForm from "components/IncomeForm.vue";

const { incomes, loadIncomes, removeIncome } = useIncome();

const isIncomeModalOpen = ref(false);
const isEditMode = ref(false);
const currentIncome = ref(null);
const search = ref("");
const userStore = useUserStore();

const columns = [
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date_ingreso",
    required: true,
    label: "Fecha del Ingreso",
    align: "center",
    field: "date_ingreso",
    format: (val) => formatDate(val),
    sortable: true,
  },
  {
    name: "amount",
    required: true,
    label: "Monto",
    align: "center",
    field: "amount",
    format: (val) => formatCurrency(val),
    sortable: true,
  },
  {
    name: "type",
    required: true,
    label: "Tipo del Ingreso",
    align: "center",
    field: "type",
    format: (val) => (val ? val.toUpperCase() : ''),
    sortable: true,
  },
];

const computedColumns = computed(() => {
  if (userStore.user?.role_id === 1) {
    return [...columns, { name: "actions", label: "Acciones", align: "right" }];
  }
  return columns;
});

const openCreateIncomeModal = () => {
  isEditMode.value = false;
  currentIncome.value = null;
  isIncomeModalOpen.value = true;
};

const openEditIncomeModal = (income) => {
  isEditMode.value = true;
  currentIncome.value = { ...income };
  isIncomeModalOpen.value = true;
};

const handleIncomeSaved = () => {
  isIncomeModalOpen.value = false;
  loadIncomes();
};

const confirmDeleteIncome = (income) => {
  currentIncome.value = income;
  removeIncome(income.id);
};

const filteredIncomes = computed(() => {
  return incomes.value.filter(income => {
    return computedColumns.value.some(column => {
      const field = typeof column.field === 'function' ? column.field(income) : income[column.field];
      return String(field).toLowerCase().includes(search.value.toLowerCase());
    });
  });
});

onMounted(loadIncomes);
</script>
