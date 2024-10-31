<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Employee } from '@/types/employee';

const props = defineProps<{ employee: Employee }>();
const emit = defineEmits(['edit', 'delete']);

const editEmployee = () => {
  emit('edit', props.employee);
};

const deleteEmployee = () => {
  emit('delete', props.employee.id);
};
</script>

<template>
  <q-item >
    <q-item-section>
      <q-item-label>{{ employee.name }}</q-item-label>
      <q-item-label caption>
        Department: {{ employee.department }}, Age: {{ employee.age }}, Salary: ${{ employee.salary }}
      </q-item-label>
    </q-item-section>

    <q-item-section side class="flex">
      <q-btn flat icon="edit" color="primary" @click="editEmployee" />
      <q-btn flat icon="delete" color="negative" @click="deleteEmployee" />
    </q-item-section>
  </q-item>
</template>

<style scoped>
.q-item {
  margin-bottom: 0.5rem;
}
</style>
