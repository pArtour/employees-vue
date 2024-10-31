<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import type { FilterCriteria } from '@/types/filter-criteria';
import { Gender } from '@/types/employee'

const props = defineProps<{ initialCriteria: FilterCriteria }>();
const emit = defineEmits(['filter']);
const criteria = ref<FilterCriteria>({ ...props.initialCriteria });

const genderOptions = [Gender.male, Gender.female];



const applyFilters = () => {
  emit('filter', criteria.value);
};
</script>

<template>
  <q-form class="full-width row wrap justify-start items-center content-start q-gutter-xs" @submit.prevent="applyFilters">
    <q-input class="col-grow" v-model="criteria.name" label="Name" outlined />
    <q-input class="col-grow" v-model="criteria.department" label="Department" outlined />
    <q-input class="col-grow" v-model="criteria.salary" label="Salary" type="number" outlined />
    <q-select class="col-grow" v-model="criteria.gender" :options="genderOptions" label="Gender" outlined />
    <q-btn type="submit" class="col-all q-mt-md" label="Apply Filter" @click="applyFilters" color="primary" />
  </q-form>
</template>
