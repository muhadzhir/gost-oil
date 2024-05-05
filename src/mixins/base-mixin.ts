import {ref} from "vue";

export const  useBaseMixin = () => {
  const loading = ref(false)
  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading
  }
  return {
    loading,
    setLoading
  }
}