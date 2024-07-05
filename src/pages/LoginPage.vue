<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="email" label="Email" type="email" outlined />
        <q-input
          v-model="password"
          label="Password"
          type="password"
          outlined
          class="q-mt-md"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Login" color="primary" @click="login" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { api } from "boot/axios";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.post("/login", {
          email: this.email,
          password: this.password,
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        this.$router.push("/");
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: "Invalid email or password",
        });
      }
    },
  },
};
</script>
