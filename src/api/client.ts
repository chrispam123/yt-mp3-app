import axios from 'axios';

// Creamos una instancia configurada de Axios
export const apiClient = axios.create({
  // Expo inyecta automáticamente las variables que empiezan por EXPO_PUBLIC_
  baseURL: process.env.EXPO_PUBLIC_API_URL,

  // Si tu API Gateway o Lambda tarda más de 10 segundos, abortamos para no colgar la app
  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
  },
});
