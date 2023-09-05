<script setup lang="ts">
import PlacementCanvas from "../components/PlacementCanvas.vue";
</script>
<template>
  <v-row>
    <v-col cols="12" md="6" class="d-flex justify-center">
      <PlacementCanvas placement="front"></PlacementCanvas>
    </v-col>
    <v-col cols="12" md="6" class="d-flex justify-center">
      <PlacementCanvas placement="back"></PlacementCanvas>
    </v-col>
    <v-col cols="12" md="6" class="d-flex justify-center">
      <PlacementCanvas placement="leftSleeve"></PlacementCanvas>
    </v-col>
    <v-col cols="12" md="6" class="d-flex justify-center">
      <PlacementCanvas placement="rightSleeve"></PlacementCanvas>
    </v-col>
  </v-row>
</template>
