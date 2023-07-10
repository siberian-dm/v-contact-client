<script setup lang="ts">
import debounce from 'lodash.debounce';
import { computed, ref, watch } from 'vue';

import { useStringQuery } from '~shared/hooks';
import { compareQueries } from '~shared/lib';
import { QueryParams } from '~shared/types';

const props = defineProps<{
  loading: boolean;
  setQuery: (params: QueryParams) => void;
}>();

const text = useStringQuery({
  field: 'q',
});

const debouncedText = ref(text.value);

const query = computed(() => ({
  q: debouncedText.value,
}));

const debouncedInput = debounce((e) => {
  debouncedText.value = e.target.value;
}, 600);

watch(
  () => query.value,
  (query, prevQuery) => {
    if (compareQueries({ query, prevQuery })) {
      props.setQuery(query);
    }
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <AInputSearch v-model:value="text.value" @change="debouncedInput" placeholder="Поиск" />
</template>
