<script setup lang="ts">
import { ref, watch } from "vue";
import Canvas from "../components/Canvas.vue";
import RectInputs from "../components/RectInputs.vue";
import { UPDATE_LAYER_RECT, store } from "../plugins/store";

const currentTab = ref<string | null>(null);

watch(
  () => store.state.layers.rectangle1.front,
  (newRectangle1Front) => {
    store.commit(UPDATE_LAYER_RECT, {
      layer: "rectangle1",
      position: "back",
      data: newRectangle1Front,
    });
    store.commit(UPDATE_LAYER_RECT, {
      layer: "rectangle1",
      position: "leftSleeve",
      data: newRectangle1Front,
    });
    store.commit(UPDATE_LAYER_RECT, {
      layer: "rectangle1",
      position: "rightSleeve",
      data: newRectangle1Front,
    });
  },
  { deep: true }
);
watch(
  () => store.state.layers.rectangle2.front,
  (newRectangle2Front) => {
    store.commit(UPDATE_LAYER_RECT, {
      layer: "rectangle2",
      position: "back",
      data: newRectangle2Front,
    });
    store.commit(UPDATE_LAYER_RECT, {
      layer: "rectangle2",
      position: "leftSleeve",
      data: newRectangle2Front,
    });
    store.commit(UPDATE_LAYER_RECT, {
      layer: "rectangle2",
      position: "rightSleeve",
      data: newRectangle2Front,
    });
  },
  { deep: true }
);
</script>

<template>
  <h1 class="text-h4 mb-4">Design your T-shirt</h1>

  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" class="d-flex justify-center">
          <Canvas position="front"></Canvas>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-center">
          <Canvas position="back"></Canvas>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-center">
          <Canvas position="leftSleeve"></Canvas>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-center">
          <Canvas position="rightSleeve"></Canvas>
        </v-col>
      </v-row>
    </v-card-text>

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
