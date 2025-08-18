import { useRouter } from 'vue-router'

export const useAuthGuard = () => {
  const router = useRouter()
  if (process.client && !localStorage.getItem('token')) {
    router.replace('/login')
  }
}

export const getUserInfo = async () => {

    try {
        const { $api } = useNuxtApp();
        const response = await $api.get('/Auth');
        return response.data;
    } catch {
        return null;
    }
};