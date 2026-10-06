<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { startSessionTimeout } from '@/plugins/sessionTimeout'

onMounted(() => {
  startSessionTimeout()
})
</script>
