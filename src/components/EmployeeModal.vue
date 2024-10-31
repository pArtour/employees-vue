<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import EmployeeForm from '@/components/EmployeeForm.vue';
import type { Employee } from '@/types/employee';

const props = defineProps<{ isModalOpen: boolean; employee: Employee | null; isEditMode: boolean }>();
const emit = defineEmits(['save', 'close']);

const opened = computed(() => props.isModalOpen);

const onSave = (employee: Employee) => {
  emit('save', employee);
};

const close = () => {
  emit('close');
};
</script>

<template>
  <q-dialog v-model="opened">
    <q-card style="min-width: 900px">
      <q-card-section>
        <div class="text-h6">{{ isEditMode ? 'Edit Employee' : 'Add Employee' }}</div>
      </q-card-section>
      <q-card-section>
        <EmployeeForm :employee="employee" :isEditMode="isEditMode" @save="onSave" @close="close" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
