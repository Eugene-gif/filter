import { ref } from 'vue';

export function useLoading() {
  const loading = ref(false);

  const load = {
    start: () => {
      loading.value = true;
    },
    end: () => {
      loading.value = false;
    },
    toggle: () => {
      loading.value = !loading.value;
    },
  };

  return {
    loading,
    load
  };
}
