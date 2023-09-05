<script setup lang="ts">
import { watchPlacementAreas, watchLayerFrontRect } from "./core";

watchPlacementAreas();
watchLayerFrontRect("rectangle1");
watchLayerFrontRect("rectangle2");
</script>

<template>
  <v-app>
    <v-main>
      <v-app-bar color="primary" density="compact">
        <v-app-bar-title>T-shirt designer</v-app-bar-title>
      </v-app-bar>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
