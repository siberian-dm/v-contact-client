<script setup lang="ts">
import { computed, watch } from 'vue';

import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from '~shared/config';
import { useNumberQuery } from '~shared/hooks';
import { compareQueries } from '~shared/lib';
import { QueryParams } from '~shared/types';

const props = defineProps<{
  loading: boolean;
  total: number;
  currentQuery?: QueryParams;
  setQuery: (params: QueryParams) => void;
}>();

const page = useNumberQuery({
  field: 'page',
  defaultValue: DEFAULT_PAGE,
});
const pageSize = useNumberQuery({
  field: 'page_size',
  defaultValue: DEFAULT_PAGE_LIMIT,
});

const query = computed(() => ({
  _page: page.value,
  _limit: pageSize.value,
}));

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
  <APagination
    class="pagination"
    v-model:current="page.value"
    v-model:pageSize="pageSize.value"
    show-size-changer
    :total="props.total"
    :disabled="loading" />
</template>

<style lang="scss" src="./index.scss" />
