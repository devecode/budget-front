<template>
  <div>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Expenses Breakdown</div>
      </q-card-section>
      <q-card-section
        v-if="chartData && chartData.labels && chartData.labels.length"
      >
        <Bar :data="chartData" :options="chartOptions" />
      </q-card-section>
      <q-card-section v-else>
        <q-spinner color="primary" />
      </q-card-section>
    </q-card>
    <q-card class="q-pa-md q-mt-md">
      <q-card-section>
        <div class="text-h6">Total Expenses</div>
      </q-card-section>
      <q-card-section
        v-if="
          totalChartData &&
          totalChartData.labels &&
          totalChartData.labels.length
        "
      >
        <Doughnut :data="totalChartData" :options="chartOptions" />
      </q-card-section>
      <q-card-section v-else>
        <q-spinner color="primary" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { Bar, Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "ExpenseChart",
  components: {
    Bar,
    Doughnut,
  },
  props: {
    expenses: {
      type: Array,
      required: true,
    },
    remainingBudget: {
      type: Number,
      required: true,
    },
  },
  computed: {
    chartData() {
      if (!this.expenses || this.expenses.length === 0) return null;
      const labels = this.expenses.map((expense) => expense.name);
      const data = this.expenses.map((expense) => parseFloat(expense.amount));
      console.log("Chart Data Amounts:", data);

      return {
        labels: labels,
        datasets: [
          {
            label: "Expenses",
            backgroundColor: "#42A5F5",
            data: data,
          },
        ],
      };
    },
    totalChartData() {
      if (!this.expenses || this.expenses.length === 0) return null;
      const total = this.expenses.reduce(
        (acc, expense) => acc + parseFloat(expense.amount),
        0
      );

      return {
        labels: ["Spent", "Remaining"],
        datasets: [
          {
            data: [total, this.remainingBudget],
            backgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      };
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>

<style scoped>
.q-pa-md {
  height: 300px;
}
.q-mt-md {
  margin-top: 20px;
}
</style>
