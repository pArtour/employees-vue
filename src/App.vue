<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Employee Management</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="text-center">
      <div>Employees management</div>
    </q-footer>
  </q-layout>
</template>
