<template>
  <q-page class="q-pa-md">
    <q-btn
      label="Crear Categoría"
      color="primary"
      @click="openCreateCategoryModal"
      class="q-mb-md"
    />
    <q-table
      :rows="categories"
      :columns="columns"
      row-key="id"
      title="Categorías"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            color="primary"
            icon="edit"
            @click="openEditCategoryModal(props.row)"
          />
          <q-btn
            size="sm"
            color="negative"
            icon="delete"
            @click="removeCategory(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="isCategoryModalOpen" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <CategoryForm
            :initial-data="currentCategory"
            @success="handleCategorySaved"
            @close="isCategoryModalOpen = false"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { formatCurrency } from "src/utils/utils";
import { useCategory } from "src/utils/composables/useCategory";
import CategoryForm from "components/CategoryForm.vue";

const { categories, loadCategories, removeCategory } = useCategory();

const isCategoryModalOpen = ref(false);
const isEditMode = ref(false);
const currentCategory = ref(null);

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
    name: "limit_spending",
    required: true,
    label: "Límite de Gasto",
    align: "center",
    field: "limit_spending",
    format: (val) => formatCurrency(val),
    sortable: true,
  },
  { name: "actions", label: "Acciones", align: "right" },
];

const openCreateCategoryModal = () => {
  isEditMode.value = false;
  currentCategory.value = null;
  isCategoryModalOpen.value = true;
};

const openEditCategoryModal = (category) => {
  isEditMode.value = true;
  currentCategory.value = { ...category };
  isCategoryModalOpen.value = true;
};

const handleCategorySaved = () => {
  isCategoryModalOpen.value = false;
  loadCategories();
};

onMounted(loadCategories);
</script>
