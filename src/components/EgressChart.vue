<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Gastos por Egreso</div>
    </q-card-section>
    <q-card-section>
      <BarChart
        v-if="chartData"
        :chart-data="chartData"
        title="Gastos por Egreso"
        :tooltip-callbacks="tooltipCallbacks"
      />
      <div v-else>No data available</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { onMounted } from 'vue';
import { useEgressChart } from 'src/utils/composables/useEgressChart';
import BarChart from 'components/BarChart.vue';

const { chartData, tooltipCallbacks, loadEgresses } = useEgressChart();

onMounted(loadEgresses);
</script>
