import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: "https://18.209.44.212/api",
  });
  nuxtApp.provide("api", api);
});
