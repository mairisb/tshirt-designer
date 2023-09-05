<script setup lang="ts">
import { watch } from "vue";
import { updateLayerRectPlacement } from "./core/core.utils";
import { store } from "./store";
import { Layers, Rect } from "./store/state.type";

const updateLayerRects = (layer: keyof Layers, rect: Rect) => {
  updateLayerRectPlacement(layer, rect, "front", "back");
  updateLayerRectPlacement(layer, rect, "front", "leftSleeve");
  updateLayerRectPlacement(layer, rect, "front", "rightSleeve");
};

watch(
  () => store.state.layers.rectangle1.front,
  (newRect1) => {
    updateLayerRects("rectangle1", newRect1);
  },
  { deep: true }
);
watch(
  () => store.state.layers.rectangle2.front,
  (newRect2) => {
    updateLayerRects("rectangle2", newRect2);
  },
  { deep: true }
);

watch(
  () => store.state.placementAreas,
  () => {
    updateLayerRects("rectangle1", store.state.layers.rectangle1.front);
    updateLayerRects("rectangle2", store.state.layers.rectangle2.front);
  },
  { deep: true }
);
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
