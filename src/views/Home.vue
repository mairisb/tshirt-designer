<script setup lang="ts">
import { ref } from "vue";
import Canvas from "../components/Canvas.vue";
import LayoutPlacementForm from "../components/LayoutPlacementForm.vue";

const tab = ref<string | null>(null);
</script>

<template>
  <h1 class="text-h4 mb-4">Design your T-shirt</h1>
  <v-card>
    <v-card-text><Canvas></Canvas></v-card-text>

    <v-tabs v-model="tab" fixed-tabs center-active>
      <v-tab value="print-area">Print area</v-tab>
      <v-tab value="design">Design</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab" class="pt-0">
        <v-window-item value="print-area">
          <h3 class="text-h6">Front</h3>
          <LayoutPlacementForm />
          <h3 class="text-h6">Back</h3>
          <LayoutPlacementForm />
          <h3 class="text-h6">Left sleeve</h3>
          <LayoutPlacementForm />
          <h3 class="text-h6">Right sleeve</h3>
          <LayoutPlacementForm />
        </v-window-item>
        <v-window-item value="design">
          <h3 class="text-h6">Rectangle 1</h3>
          <LayoutPlacementForm />
          <h3 class="text-h6">Rectangle 2</h3>
          <LayoutPlacementForm />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
