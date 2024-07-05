<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Top 3 Categories by Spending</div>
    </q-card-section>
    <q-card-section>
      <BarChart
        v-if="chartData"
        :chart-data="chartData"
        title="Top 3 Categories by Spending"
        :tooltipCallbacks="tooltipCallbacks"
      />
      <div v-else>No data available</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { onMounted } from "vue";
import { useCategoryChart } from "src/utils/composables/useCategoryChart";
import BarChart from "components/BarChart.vue";

const { chartData, tooltipCallbacks, loadTopCategories } = useCategoryChart();

onMounted(loadTopCategories);
</script>
