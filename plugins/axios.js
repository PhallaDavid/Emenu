  import axios from "axios";

  export default defineNuxtPlugin((nuxtApp) => {
    const api = axios.create({
      baseURL: "https://54.196.237.240/api",
    });
    nuxtApp.provide("api", api);
  });
