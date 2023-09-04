<script setup lang="ts">
import { ref } from "vue";
import Canvas from "../components/Canvas.vue";
import LayoutPlacementForm from "../components/LayoutPlacementForm.vue";

const currentTab = ref<string | null>(null);
</script>

<template>
  <h1 class="text-h4 mb-4">Design your T-shirt</h1>

  <v-card>
    <v-card-text><Canvas></Canvas></v-card-text>

    <v-tabs v-model="currentTab" fixed-tabs center-active>
      <v-tab value="print-areas">Placement areas</v-tab>
      <v-tab value="designs">Designs</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="currentTab" class="pt-0">
        <v-window-item value="print-areas">
          <h3 class="text-h6">Front</h3>
          <LayoutPlacementForm position="front" />

          <h3 class="text-h6">Back</h3>
          <LayoutPlacementForm position="back" />

          <h3 class="text-h6">Left sleeve</h3>
          <LayoutPlacementForm position="leftSleeve" />

          <h3 class="text-h6">Right sleeve</h3>
          <LayoutPlacementForm position="rightSleeve" />
        </v-window-item>

        <v-window-item value="designs">
          <h3 class="text-h6">Rectangle 1</h3>
          <LayoutPlacementForm layer="rectangle1" position="front" />

          <h3 class="text-h6">Rectangle 2</h3>
          <LayoutPlacementForm layer="rectangle2" position="front" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
