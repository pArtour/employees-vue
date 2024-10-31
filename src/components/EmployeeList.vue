
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import EmployeeItem from './EmployeeItem.vue';
import type { Employee } from '@/types/employee';

defineProps<{ employees: Employee[] }>();
const emit = defineEmits(['edit', 'delete', 'addClick']);


const onEdit = (employee: Employee) => {
  emit('edit', employee);
};

const onDelete = (employeeId: number) => {
  emit('delete', employeeId);
};
</script>

<template>
  <div class="q-mt-lg">
    <h1 class="text-h3">Employees</h1>
    <q-btn label="Add Employee" color="primary" @click="emit('addClick')" class="q-mb-md" />
    <q-list bordered separator>
      <EmployeeItem
        v-for="employee in employees"
        :key="employee.id"
        :employee="employee"
        @edit="onEdit"
        @delete="onDelete"
      />
    </q-list>
  </div>
</template>
