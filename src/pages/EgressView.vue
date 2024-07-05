<template>
  <q-page class="q-pa-md" align="right">
    <q-btn
      label="Crear Egreso"
      color="primary"
      @click="openCreateEgressModal"
      class="q-mb-md"
    />
    <q-input
      filled
      v-model="search"
      debounce="300"
      placeholder="Buscar..."
      @input="fetchEgresses"
      class="q-mb-md"
    />
    <q-select
      v-model="selectedCategory"
      :options="categories"
      option-value="id"
      option-label="name"
      label="Filtrar por Categoría"
      @update:model-value="fetchEgresses"
      class="q-mb-md"
    />
    <q-select
      v-model="selectedPaymentMethod"
      :options="paymentMethods"
      option-value="id"
      option-label="name"
      label="Filtrar por Método de Pago"
      @update:model-value="fetchEgresses"
      class="q-mb-md"
    />
    <q-btn
      label="Limpiar Filtros"
      color="secondary"
      @click="clearFilters"
      class="q-mb-md"
    />
    <q-table :rows="egresses" :columns="computedColumns" row-key="id" title="Egresos">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            color="primary"
            icon="edit"
            @click="openEditEgressModal(props.row)"
          />
          <q-btn
            size="sm"
            color="negative"
            icon="delete"
            @click="confirmDeleteEgress(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="isEgressModalOpen" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <EgressForm
            :initial-data="currentEgress"
            @success="handleEgressSaved"
            @close="isEgressModalOpen = false"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isDeleteModalOpen" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Confirmar Eliminación</div>
          <p>¿Desea eliminar solo este egreso o todos los egresos recurrentes relacionados?</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" @click="isDeleteModalOpen = false" />
          <q-btn label="Eliminar Solo Este" color="negative" @click="deleteEgress(false)" />
          <q-btn label="Eliminar Todos" color="negative" @click="deleteEgress(true)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { formatCurrency, formatDate } from "src/utils/utils";
import { useEgress } from "src/utils/composables/useEgress";
import { useUserStore } from 'stores/user';
import EgressForm from "components/EgressForm.vue";
import axios from 'axios';
import { api } from 'boot/axios'

const { removeEgress } = useEgress();

const isEgressModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isEditMode = ref(false);
const currentEgress = ref(null);
const search = ref("");
const selectedCategory = ref(null);
const selectedPaymentMethod = ref(null);
const categories = ref([]);
const paymentMethods = ref([]);
const egresses = ref([]);
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
    name: "category",
    required: true,
    label: "Categoría",
    align: "center",
    field: (row) => row.category.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "amount",
    required: true,
    label: "Monto del Egreso",
    align: "center",
    field: "amount",
    format: (val) => formatCurrency(val),
    sortable: true,
  },
  {
    name: "is_fixed",
    required: true,
    label: "Es Fijo",
    align: "center",
    field: "is_fixed",
    format: (val) => (val ? "Sí" : "No"),
    sortable: true,
  },
  {
    name: "date_egreso",
    required: true,
    label: "Fecha de Egreso",
    align: "center",
    field: "date_egreso",
    format: (val) => formatDate(val),
    sortable: true,
  },
  {
    name: "status",
    required: true,
    label: "Estatus",
    align: "center",
    field: "status",
    format: (val) => val.toUpperCase(),
    sortable: true,
  },
  {
    name: "payment_method",
    required: true,
    label: "Método de Pago",
    align: "center",
    field: (row) => row.payment_method.name,
    format: (val) => `${val}`,
    sortable: true,
  },
];

const computedColumns = computed(() => {
  if (userStore.user?.role_id === 1) {
    return [...columns, { name: "actions", label: "Acciones", align: "right" }];
  }
  return columns;
});

const openCreateEgressModal = () => {
  isEditMode.value = false;
  currentEgress.value = null;
  isEgressModalOpen.value = true;
};

const openEditEgressModal = (egress) => {
  isEditMode.value = true;
  currentEgress.value = { ...egress };
  isEgressModalOpen.value = true;
};

const handleEgressSaved = () => {
  isEgressModalOpen.value = false;
  fetchEgresses();
};

const confirmDeleteEgress = (egress) => {
  currentEgress.value = egress;
  isDeleteModalOpen.value = true;
};

const deleteEgress = async (deleteAllRelated) => {
  await removeEgress(currentEgress.value.id, deleteAllRelated);
  isDeleteModalOpen.value = false;
  fetchEgresses();
};

const fetchEgresses = async () => {
  const params = {
    search: search.value,
    category_id: selectedCategory.value,
    payment_method_id: selectedPaymentMethod.value,
  };
  const response = await api.get('/egresses', { params });
  egresses.value = response.data;
};

const loadCategories = async () => {
  const response = await api.get('/categories');
  categories.value = response.data;
};

const loadPaymentMethods = async () => {
  const response = await api.get('/payment-methods');
  paymentMethods.value = response.data;
};

const clearFilters = () => {
  search.value = "";
  selectedCategory.value = null;
  selectedPaymentMethod.value = null;
  fetchEgresses();
};

onMounted(async () => {
  await fetchEgresses();
  await loadCategories();
  await loadPaymentMethods();
});
</script>
