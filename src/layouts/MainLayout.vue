<template>
  <q-layout v-if="!userStore.isLoading" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>Budget App</q-toolbar-title>

        <q-space />

        <q-avatar size="md" class="q-mr-sm">
          <img :src="userAvatar" alt="User Avatar" />
        </q-avatar>

        <div class="q-mr-sm">{{ user.name }}</div>
        <q-btn flat dense round icon="logout" @click="logout">
          Logout
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
            <q-item-label caption>info</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/category" v-permission="['1']">
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Categorías</q-item-label>
            <q-item-label caption>Manejo de Categorías</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/egress" v-permission="['1', '2']">
          <q-item-section avatar>
            <q-icon name="money_off" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Egresos</q-item-label>
            <q-item-label caption>Manejo de Egresos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/income" v-permission="['1', '2']">
          <q-item-section avatar>
            <q-icon name="attach_money" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Ingresos</q-item-label>
            <q-item-label caption>Manejo de Ingresos</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <q-page v-else class="q-pa-md">
    <q-spinner-dots color="primary" size="50px" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router";
import { useUserStore } from 'stores/user'
import { useQuasar } from 'quasar'

const leftDrawerOpen = ref(false)
const userStore = useUserStore()
const $q = useQuasar()
const router = useRouter();
const user = ref({})
const userAvatar =
  'https://imgs.search.brave.com/hSkPZoySYSeqom8IoR0Cdc0y1MpUTi33YNJJ8msmlfs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzYxNjgy/Ni9zY3JlZW5zaG90/cy8yNDYwNzg3L2Fj/dXNlcmF2YXRhcl9k/cmliYmJsZV8yX3Yy/LnBuZz9yZXNpemU9/NDAweDA'

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const fetchUser = async () => {
  await userStore.fetchUser()
  user.value = userStore.user
}

const logout = async () => {
  await userStore.logout()
  router.push("/login");
}

onMounted(fetchUser)
</script>
