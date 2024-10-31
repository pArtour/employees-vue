<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useEmployeeStore } from '@/stores/employees'
import { useRoute, useRouter } from 'vue-router'
import EmployeeList from '@/components/EmployeeList.vue'
import EmployeeFilter from '@/components/EmployeeFilter.vue'
import EmployeeModal from '@/components/EmployeeModal.vue'
import { type Employee, Gender } from '@/types/employee'
import type { FilterCriteria } from '@/types/filter-criteria'

const employeeStore = useEmployeeStore()
const route = useRoute()
const router = useRouter()


const employees = computed(() => employeeStore.employees)
const filterCriteria = computed(() => employeeStore.filterCriteria)


const getEmployees = async () => {
  await employeeStore.getEmployees()
}


const applyFilter = async (criteria: FilterCriteria) => {
  employeeStore.setFilterCriteria(criteria);
  updateUrlWithFilters(criteria)
  await getEmployees()
}


const updateUrlWithFilters = (criteria: FilterCriteria) => {
  router.replace({
    query: {
      name: criteria.name || undefined,
      department: criteria.department || undefined,
      salary: criteria.salary !== null && criteria.salary !== undefined && !isNaN(criteria.salary) ? String(criteria.salary) : undefined,
      gender: criteria.gender || undefined,
    },
  })
}


watch(
  () => route.query,
  newQuery => {
    employeeStore.setFilterCriteria({
      name: newQuery.name || undefined,
      department: newQuery.department || undefined,
      age: newQuery.age ? Number(newQuery.age) : undefined,
      salary: newQuery.salary ? Number(newQuery.salary) : undefined,
      gender: newQuery.gender || undefined,
    })
    getEmployees()
  },
  { immediate: true },
)


const isModalOpen = ref(false)
const isEditMode = ref(false)
const modalEmployee = ref<Employee | null>(null)

const openAddModal = () => {
  modalEmployee.value = {
    name: '',
    department: '',
    age: 18,
    salary: 0,
    location: '',
    gender: Gender.male,
  }
  isEditMode.value = false
  isModalOpen.value = true
}

const openEditModal = (employee: Employee) => {
  modalEmployee.value = { ...employee }
  isEditMode.value = true
  isModalOpen.value = true
}

const saveEmployee = async (employee: Employee) => {
  if (isEditMode.value) {
    await employeeStore.updateEmployee(employee)
  } else {
    await employeeStore.addEmployee(employee)
  }
  closeModal()
}

const closeModal = () => {
  isModalOpen.value = false
}

const deleteEmployee = async (id: number) => {
  await employeeStore.deleteEmployee(id)
}
</script>

<template>
  <q-page class="q-pa-md">
    <EmployeeFilter :initialCriteria="filterCriteria" @filter="applyFilter" />
    <EmployeeList
      :employees="employees"
      @edit="openEditModal"
      @delete="deleteEmployee"
      @add-click="openAddModal"
    />
    <EmployeeModal
      v-model:isModalOpen="isModalOpen"
      :employee="modalEmployee"
      :isEditMode="isEditMode"
      @save="saveEmployee"
      @close="closeModal"
    />
  </q-page>
</template>

<style scoped>
.q-mt-md {
  margin-top: 1rem;
}
</style>
