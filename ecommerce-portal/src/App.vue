<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';

const authStore = useAuthStore();
</script>

<template>
  <NavBar v-if="authStore.token" />
  <RouterView />
</template>
