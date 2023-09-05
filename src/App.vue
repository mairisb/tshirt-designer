<script setup lang="ts">
import { watch } from "vue";
import { updateLayerRectPlacement } from "./core";
import { store } from "./store";
import { Layers, Rect } from "./store/state.type";

// Update the placement rectangles for a given layer based on its front rectangle
const updateLayerFromFrontRect = (layer: keyof Layers, frontRect: Rect) => {
  updateLayerRectPlacement(layer, frontRect, "front", "back");
  updateLayerRectPlacement(layer, frontRect, "front", "leftSleeve");
  updateLayerRectPlacement(layer, frontRect, "front", "rightSleeve");
};

watch(
  () => store.state.placementAreas,
  () => {
    updateLayerFromFrontRect("rectangle1", store.state.layers.rectangle1.front);
    updateLayerFromFrontRect("rectangle2", store.state.layers.rectangle2.front);
  },
  { deep: true }
);

const watchLayerFrontRect = (layer: keyof Layers) => {
  watch(
    () => store.state.layers[layer].front,
    (frontRect) => {
      updateLayerFromFrontRect(layer, frontRect);
    },
    { deep: true }
  );
};
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
