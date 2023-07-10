import { UnwrapRef, reactive, toRefs } from 'vue';

type UseFetchDataParams<T, D> = {
  cb: (params: D) => Promise<T> | undefined;
};

export const useApi = <T = unknown, D = unknown>({ cb }: UseFetchDataParams<T, D>) => {
  const state = reactive<{
    loading: boolean;
    response: T | null | undefined;
  }>({
    loading: false,
    response: null,
  });

  const fn = async (params: D) => {
    state.loading = true;
    try {
      const response = await cb(params);
      const unwrappedResult: UnwrapRef<T> = response as UnwrapRef<T>;
      state.response = unwrappedResult;

      return response;
    } finally {
      state.loading = false;
    }
  };

  return { ...toRefs(state), fn };
};
