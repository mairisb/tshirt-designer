<script setup lang="ts">
import { ref, watch } from "vue";
import Canvas from "../components/Canvas.vue";
import RectInputs from "../components/RectInputs.vue";
import {
  Layers,
  Placements,
  Rect,
  UPDATE_LAYER_RECT,
  store,
} from "../plugins/store";
import { onMounted } from "vue";

const currentTab = ref<string | null>(null);

const doMagic = (
  layer: keyof Layers,
  placement: keyof Placements,
  rect: Rect
) => {
  // Magic goes here

  return rect;
};

const updateLayerPlacementRect = (
  layer: keyof Layers,
  placement: keyof Placements,
  rect: Rect
) => {
  const magicRect = doMagic(layer, placement, rect);
  store.commit(UPDATE_LAYER_RECT, {
    layer,
    placement,
    data: magicRect,
  });
};

const updateLayerRect = (layer: keyof Layers, rect: Rect) => {
  updateLayerPlacementRect(layer, "back", rect);
  updateLayerPlacementRect(layer, "leftSleeve", rect);
  updateLayerPlacementRect(layer, "rightSleeve", rect);
};

onMounted(() => {
  const rect1 = store.state.layers.rectangle1.front;
  const rect2 = store.state.layers.rectangle2.front;

  updateLayerRect("rectangle1", rect1);
  updateLayerRect("rectangle2", rect2);
});

watch(
  () => store.state.layers.rectangle1.front,
  (newRect1) => {
    updateLayerRect("rectangle1", newRect1);
  },
  { deep: true }
);
watch(
  () => store.state.layers.rectangle2.front,
  (newRect2) => {
    updateLayerRect("rectangle2", newRect2);
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
