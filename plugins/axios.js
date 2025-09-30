  import axios from "axios";

  export default defineNuxtPlugin((nuxtApp) => {
    const api = axios.create({
      baseURL: "http://localhost:8000/api",
    });
    nuxtApp.provide("api", api);
  });
