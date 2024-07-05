<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Ingresos vs Egresos</div>
    </q-card-section>
    <q-card-section>
      <BarChart
        v-if="chartData"
        :chart-data="chartData"
        title="Ingresos vs Egresos"
        :tooltip-callbacks="tooltipCallbacks"
      />
      <div v-else>No data available</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { onMounted } from 'vue';
import { useIncomeVsEgressChart } from 'src/utils/composables/useIncomeVsEgressChart';
import BarChart from 'components/BarChart.vue';

const { chartData, tooltipCallbacks, loadIncomeVsEgress } = useIncomeVsEgressChart();

onMounted(loadIncomeVsEgress);
</script>
