import { boot } from "quasar/wrappers";
import axios from "axios";

// Crea la instancia de axios con la URL base de tu API
const api = axios.create({ baseURL: "http://localhost:8000/api" });

// Interceptor de solicitud para agregar el token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // para usar dentro de archivos Vue (Options API) a través de this.$axios y this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ esto te permitirá usar this.$axios (para el formulario Options API de Vue)
  // por lo que no necesariamente tendrás que importar axios en cada archivo vue

  app.config.globalProperties.$api = api;
  // ^ ^ ^ esto te permitirá usar this.$api (para el formulario Options API de Vue)
  // por lo que puedes realizar fácilmente solicitudes contra la API de tu aplicación
});

export { api };
