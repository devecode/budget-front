<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md q-pt-md q-pb-md">
      <!-- Filtros de Mes y Año -->
      <div class="col-12" align="right">
        <q-select v-model="selectedMonth" :options="months" label="Mes" />
        <q-select v-model="selectedYear" :options="years" label="Año" />
        <q-btn label="Aplicar Filtro" @click="applyFilter" />
      </div>

      <!-- Top 3 Categorías -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md full-height">
          <q-card-section>
            <div class="text-h6">Top 3 Categorías</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">Categorías principales por gasto</div>
            <q-list dense>
              <q-item v-for="category in getTopCategories()" :key="category.id">
                <q-item-section avatar>
                  <q-icon :name="getIconForCategory(category.name)" />
                </q-item-section>
                <q-item-section>{{ category.name }}</q-item-section>
                <q-item-section side>
                  <span class="amount">{{ formatCurrency(category.total_spent) }}</span>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Ver Reporte" @click="goToCategoriesReport" />
          </q-card-actions>
        </q-card>
      </div>

      <!-- Salud Financiera -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md full-height">
          <q-card-section>
            <div class="text-h6">Salud Financiera</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">Resumen:</div>
            <q-list dense>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="attach_money" />
                </q-item-section>
                <q-item-section>Total Ingresos:</q-item-section>
                <q-item-section side>
                  <span class="amount">{{ formatCurrency(totalIncome) }}</span>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="money_off" />
                </q-item-section>
                <q-item-section>Total Egresos:</q-item-section>
                <q-item-section side>
                  <span class="amount">{{ formatCurrency(totalEgress) }}</span>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="account_balance" />
                </q-item-section>
                <q-item-section>Saldo Restante:</q-item-section>
                <q-item-section side>
                  <span class="amount">{{ formatCurrency(balance) }}</span>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Ver Reporte" @click="goToFinancialReport" />
          </q-card-actions>
        </q-card>
      </div>

      <!-- Métodos de Pago -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md full-height">
          <q-card-section>
            <div class="text-h6">Métodos de Pago</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">Gasto por método de pago:</div>
            <q-list dense>
              <q-item v-for="method in paymentMethodsWithSpending" :key="method.payment_method">
                <q-item-section avatar>
                  <q-icon :name="getIconForPaymentMethod(method.payment_method)" />
                </q-item-section>
                <q-item-section>{{ method.payment_method }}</q-item-section>
                <q-item-section side>
                  <span class="amount">{{ formatCurrency(method.total_spent) }}</span>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Ver Reporte" @click="goToPaymentMethods" />
          </q-card-actions>
        </q-card>
      </div>

      <!-- Cuentas por Pagar -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md full-height">
          <q-card-section>
            <div class="text-h6">Cuentas por Pagar</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">Lista de cuentas por pagar:</div>
            <q-list dense>
              <q-item v-for="account in accountsToPay" :key="account.id">
                <q-item-section avatar>
                  <q-icon name="account_balance_wallet" />
                </q-item-section>
                <q-item-section>{{ account.name }}</q-item-section>
                <q-item-section side>
                  <span class="amount">{{ formatCurrency(account.amount) }}</span>
                </q-item-section>
                <q-item-section side>{{ account.date_egreso }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Ver Reporte" @click="goToAccountsToPay" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { formatCurrency } from "src/utils/utils";
import { useDashboard } from "src/utils/composables/useDashboard";

const {
  categories,
  totalIncome,
  totalEgress,
  paymentMethodsWithSpending,
  accountsToPay,
  loadCategories,
  loadIncomeVsEgress,
  loadPaymentMethodsWithSpending,
  loadAccountsToPay,
  balance
} = useDashboard();

const selectedMonth = ref(null);
const selectedYear = ref(null);

const months = [
  { label: 'Enero', value: 1 },
  { label: 'Febrero', value: 2 },
  { label: 'Marzo', value: 3 },
  { label: 'Abril', value: 4 },
  { label: 'Mayo', value: 5 },
  { label: 'Junio', value: 6 },
  { label: 'Julio', value: 7 },
  { label: 'Agosto', value: 8 },
  { label: 'Septiembre', value: 9 },
  { label: 'Octubre', value: 10 },
  { label: 'Noviembre', value: 11 },
  { label: 'Diciembre', value: 12 }
];

const years = [
  { label: '2023', value: 2023 },
  { label: '2024', value: 2024 },
  { label: '2025', value: 2025 }
];

const getTopCategories = () => {
  return categories.value
    .slice()
    .sort((a, b) => b.total_spent - a.total_spent)
    .slice(0, 3);
};

const router = useRouter();

const goToCategoriesReport = () => {
  router.push("/category-report");
};

const goToFinancialReport = () => {
  router.push("/income-vs-egress-report");
};

const goToPaymentMethods = () => {
  router.push("/payment-methods");
};

const goToAccountsToPay = () => {
  router.push("/accounts-to-pay");
};

const categoryIcons = {
  Viajes: "flight",
  Medicamentos: "local_pharmacy",
  Alimentación: "restaurant",
  "Salud e higiene": "health_and_safety",
  Ahorros: "savings",
  "Otros gastos": "category",
  Transporte: "directions_car",
  Casa: "home",
  "American Express Ricardo": "credit_card",
  "BBVA Oro Jess": "credit_card",
};

const getIconForCategory = (categoryName) => {
  return categoryIcons[categoryName] || "category";
};

const paymentMethodIcons = {
  "Credit Card": "credit_card",
  "Debit Card": "credit_card",
  Transfer: "compare_arrows",
  Cash: "attach_money",
};

const getIconForPaymentMethod = (methodName) => {
  return paymentMethodIcons[methodName] || "payment";
};

const applyFilter = () => {
  const params = {
    month: selectedMonth.value?.value,
    year: selectedYear.value?.value,
  };
  loadCategories(params);
  loadIncomeVsEgress(params);
  loadPaymentMethodsWithSpending(params);
  loadAccountsToPay(params);
};

onMounted(() => {
  applyFilter();
});
</script>

<style scoped>
.full-height {
  height: 100%;
}

.amount {
  font-weight: bold;
  color: #007bff;
}
</style>
