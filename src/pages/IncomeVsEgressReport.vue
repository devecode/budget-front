<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Reporte de Ingresos vs Egresos</div>
        <IncomeVsEgressChart />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import IncomeVsEgressChart from "components/IncomeVsEgressChart.vue";
</script>
