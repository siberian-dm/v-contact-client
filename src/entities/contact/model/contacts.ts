import { defineStore } from 'pinia';
import { ref } from 'vue';
import { vContactApi, ContactDto } from '~shared/api';

export const useContactsStore = defineStore('contacts', () => {
  const data = ref<ContactDto[]>([]);
  const loading = ref({
    item: false,
    list: false,
  });

  async function getContactList() {
    loading.value.list = true;
    try {
      const response = await vContactApi.contacts.getContactList();
      data.value = response?.data ?? [];
    } finally {
      loading.value.list = false;
    }
  }

  async function createContact(payload: Omit<ContactDto, 'id'>) {
    loading.value.item = true;
    try {
      loading.value.item = true;
      const response = await vContactApi.contacts.createContact({ payload });
      return response.data;
      // data.value = [response.data, ...data.value];
    } finally {
      loading.value.item = false;
    }
  }

  async function getContact(id: ContactDto['id']) {
    loading.value.item = true;
    try {
      const response = await vContactApi.contacts.getContactById({ id });
      return response.data;
    } finally {
      loading.value.item = false;
    }
  }

  async function updateContact({ id, ...rest }: Partial<ContactDto> & { id: ContactDto['id'] }) {
    loading.value.item = true;
    try {
      const response = await vContactApi.contacts.updateContact({ id, payload: rest });
      return response.data;
      // const index = data.value.findIndex((item) => item.id == response.data.id);
      // data.value = [...data.value.slice(0, index), response.data, ...data.value.slice(index + 1)];
    } finally {
      loading.value.item = false;
    }
  }

  async function deleteContact(id: ContactDto['id']) {
    loading.value.item = true;
    try {
      const response = await vContactApi.contacts.deleteContact({ id });
      return response.data;
      // data.value = data.value.filter((item) => item.id === response.data.id);
    } finally {
      loading.value.item = false;
    }
  }

  return { data, loading, getContact, getContactList, createContact, updateContact, deleteContact };
});
