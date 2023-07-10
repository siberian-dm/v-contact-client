import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { vContactApi, ContactDto, GetContactListParams } from '~shared/api';
import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from '~shared/config';

const initialQueryParams: GetContactListParams = {
  _page: DEFAULT_PAGE,
  _limit: DEFAULT_PAGE_LIMIT,
  _order: 'desc',
  _sort: 'id',
};

export const useContactsStore = defineStore('contacts', () => {
  const data = ref<ContactDto[]>([]);
  const total = ref(0);
  const loading = ref(false);

  const queryParams = ref<GetContactListParams>(initialQueryParams);

  function setQuery(params: GetContactListParams) {
    queryParams.value = {
      ...queryParams.value,
      ...params,
    };
  }

  function setQueryWithResetPage(params: GetContactListParams) {
    queryParams.value = {
      ...initialQueryParams,
      ...params,
    };
  }

  function resetQueryParams() {
    queryParams.value = initialQueryParams;
  }

  async function getContactList(params: GetContactListParams = {}) {
    loading.value = true;
    const response = await vContactApi.contacts.getContactList(params);
    data.value = response?.data ?? [];
    total.value = response?.meta.total ?? 0;
    loading.value = false;
  }

  return {
    data,
    total,
    loading,
    queryParams,
    getContactList,
    setQuery,
    setQueryWithResetPage,
    resetQueryParams,
  };
});

export const useContactCrudStore = defineStore('contactCrud', () => {
  const currrentEntity = ref<ContactDto | null>(null);
  const editMod = computed(() => !!currrentEntity.value);

  const loading = ref(false);

  function resetStore() {
    currrentEntity.value = null;
  }

  async function createContact(payload: Omit<ContactDto, 'id'>) {
    loading.value = true;
    try {
      loading.value = true;
      const response = await vContactApi.contacts.createContact({ payload });
      return response?.data;
    } finally {
      loading.value = false;
    }
  }

  async function getContact(id: ContactDto['id']) {
    loading.value = true;
    try {
      const response = await vContactApi.contacts.getContactById({ id });
      currrentEntity.value = response?.data ?? null;

      return response?.data;
    } finally {
      loading.value = false;
    }
  }

  async function updateContact({ id, ...rest }: Partial<ContactDto> & { id: ContactDto['id'] }) {
    loading.value = true;
    try {
      const response = await vContactApi.contacts.updateContact({ id, payload: rest });
      return response?.data;
    } finally {
      loading.value = false;
    }
  }

  async function deleteContact(id: ContactDto['id']) {
    loading.value = true;
    try {
      const response = await vContactApi.contacts.deleteContact({ id });
      return response?.data;
    } finally {
      loading.value = false;
    }
  }

  return {
    currrentEntity,
    loading,
    editMod,
    resetStore,
    getContact,
    createContact,
    updateContact,
    deleteContact,
  };
});
