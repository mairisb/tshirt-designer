<script setup lang="ts">
import { ref } from "vue";
import PlacementDisplay from "../components/PlacementDisplay.vue";
import RectInputs from "../components/RectInputs.vue";

const currentTab = ref<string | null>(null);
</script>

<template>
  <h1 class="text-h4 mb-4">Design your T-shirt</h1>

  <v-card>
    <v-card-text><PlacementDisplay></PlacementDisplay></v-card-text>

    <v-tabs v-model="currentTab" fixed-tabs center-active>
      <v-tab value="print-areas">Placement areas</v-tab>
      <v-tab value="design">Design</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="currentTab">
        <v-window-item value="print-areas">
          <h3 class="text-h6">Front</h3>
          <RectInputs placement="front" />

          <h3 class="text-h6">Back</h3>
          <RectInputs placement="back" />

          <h3 class="text-h6">Left sleeve</h3>
          <RectInputs placement="leftSleeve" />

          <h3 class="text-h6">Right sleeve</h3>
          <RectInputs placement="rightSleeve" />
        </v-window-item>

        <v-window-item value="design">
          <h3 class="text-h6">Rectangle 1 (Front)</h3>
          <RectInputs layer="rectangle1" placement="front" />

          <h3 class="text-h6">Rectangle 2 (Front)</h3>
          <RectInputs layer="rectangle2" placement="front" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
