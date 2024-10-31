<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue'
import { type Employee, Gender } from '@/types/employee'

const props = defineProps<{ employee: Employee | null; isEditMode: boolean }>()
const emit = defineEmits(['save', 'close'])

const formEmployee = ref<Omit<Employee, 'id'>>({
  name: '',
  department: '',
  age: 18,
  salary: 0,
  location: '',
  gender: Gender.male,
})

const genderOptions = [Gender.male, Gender.female]

watch(
  () => props.employee,
  newEmployee => {
    formEmployee.value = newEmployee ? { ...newEmployee } : formEmployee.value
  },
  { immediate: true },
)

const submitForm = () => {
  emit('save', formEmployee.value)
}

const close = () => emit('close')
</script>

<template>
  <q-form @submit.prevent="submitForm">
    <q-input
      v-model="formEmployee.name"
      label="Name"
      :rules="[val => !!val || 'Field is required']"
      outlined
    />
    <q-input
      v-model="formEmployee.department"
      label="Department"
      :rules="[val => !!val || 'Field is required']"
      outlined
    />
    <q-input
      v-model="formEmployee.age"
      label="Age"
      type="number"
      :rules="[val => !!val || 'Field is required', val => val > 18 && val < 65 || 'Invalid age']"
      outlined
    />
    <q-input
      v-model="formEmployee.salary"
      label="Salary ($)"
      type="number"
      :rules="[val => !!val || 'Field is required']"
      outlined
    />
    <q-input
      v-model="formEmployee.location"
      label="Location"
      :rules="[val => !!val || 'Field is required']"
      outlined
    />
    <q-select
      v-model="formEmployee.gender"
      :options="genderOptions"
      label="Gender"
      :rules="[val => !!val || 'Field is required']"
      outlined
    />
    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="negative" @click="close" />
      <q-btn label="Save" color="primary" type="submit" />
    </q-card-actions>
  </q-form>
</template>
