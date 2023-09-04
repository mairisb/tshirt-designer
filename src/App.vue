<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <v-app>
    <v-main>
      <v-app-bar color="primary" density="compact">
        <v-app-bar-title>T-shirt Designer</v-app-bar-title>
      </v-app-bar>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
