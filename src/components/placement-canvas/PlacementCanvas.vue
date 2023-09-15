<script setup lang="ts">
import { fabric } from "fabric";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { Placements, State } from "../../store/state.type";
import {
  defaultCanvasOpts,
  defaultLayerRectOpts,
  defaultPlacementRectOpts,
} from "./default-fabric-opts";

const props = defineProps<{
  placement: keyof Placements;
}>();

const canvasRef = ref<HTMLCanvasElement | null>();
let canvas: fabric.Canvas | null = null;
let placementArea: fabric.Rect | null = null;
let rectangle1: fabric.Rect | null = null;
let rectangle2: fabric.Rect | null = null;

const store = useStore<State>();

const watchPlacementsUpdateRect = (
  placementsToWatch: Placements,
  rectToUpdate: fabric.Rect | null
) => {
  watch(
    () => placementsToWatch,
    (newPlacements: Placements) => {
      if (rectToUpdate) {
        rectToUpdate.set(newPlacements[props.placement]);
      }
      if (canvas) {
        canvas.renderAll();
      }
    },
    { deep: true }
  );
};

onMounted(() => {
  if (canvasRef.value) {
    canvas = new fabric.Canvas(canvasRef.value, defaultCanvasOpts);
    placementArea = new fabric.Rect({
      ...defaultPlacementRectOpts,
      ...store.state.placementAreas[props.placement],
    });
    rectangle1 = new fabric.Rect({
      ...defaultLayerRectOpts,
      fill: "#ed4642",
      clipPath: placementArea,
      ...store.state.layers.rectangle1[props.placement],
    });
    rectangle2 = new fabric.Rect({
      ...defaultLayerRectOpts,
      fill: "#17bcb5",
      clipPath: placementArea,
      ...store.state.layers.rectangle2[props.placement],
    });
    canvas.add(placementArea, rectangle1, rectangle2);
  }

  watchPlacementsUpdateRect(store.state.placementAreas, placementArea);
  watchPlacementsUpdateRect(store.state.layers.rectangle1, rectangle1);
  watchPlacementsUpdateRect(store.state.layers.rectangle2, rectangle2);
});
</script>

<template>
  <canvas ref="canvasRef" width="400" height="400"></canvas>
</template>
