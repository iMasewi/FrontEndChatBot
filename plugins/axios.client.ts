import axios from 'axios';
import { useRuntimeConfig } from '#app';
import { TokenStorage } from '../utils/tokenStorage';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const api = axios.create({
    baseURL: config.public.apiBase
  });

  api.interceptors.request.use((request) => {
    if (process.client) {
      const token = TokenStorage.getBearerToken();
      if (token) {
        request.headers.Authorization = token;
      }
    }
    return request;
  });

  return {
    provide: {
      api
    }
  };
});