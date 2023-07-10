import { computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';

type UseStringQueryParams = {
  field: string;
  defaultValue?: string;
};

export function useStringQuery({ field, defaultValue }: UseStringQueryParams) {
  const router = useRouter();
  const route = useRoute();

  const reset = async function () {
    const query = { ...route.query };
    delete query[field];
    await router.replace({ ...route, query });
  };

  const value = computed({
    get() {
      const value = route.query[field] ?? defaultValue;
      if (value) return String(value);
      return undefined;
    },
    set(value) {
      if (value) {
        router.replace({
          ...route,
          query: { ...route.query, [field]: value },
        });
      } else {
        reset();
        return;
      }
    },
  });

  return reactive({
    value: value,
    reset: reset,
  });
}
