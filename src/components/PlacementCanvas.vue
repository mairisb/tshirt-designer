<script setup lang="ts">
import { fabric } from "fabric";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { Placements, State } from "../store/state.type";

const props = defineProps<{
  placement: keyof Placements;
}>();

const defaultCanvasOpts: fabric.ICanvasOptions = {
  backgroundColor: "rgb(245,245,245)",
  selection: false,
};
const defaultRectOpts: fabric.IRectOptions = {
  evented: false,
  originX: "center",
  originY: "center",
};
const defaultPlacementRectOpts: fabric.IRectOptions = {
  ...defaultRectOpts,
  absolutePositioned: true,
  objectCaching: false,
  fill: "transparent",
  stroke: "gray",
};
const defaultLayerRectOpts: fabric.IRectOptions = {
  fill: "red",
  ...defaultRectOpts,
};

const canvasRef = ref<HTMLCanvasElement | null>();
let canvas: fabric.Canvas | null = null;
let placementArea: fabric.Rect | null = null;
let rectangle1: fabric.Rect | null = null;
let rectangle2: fabric.Rect | null = null;

const store = useStore<State>();

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
});

watch(
  () => store.state.placementAreas,
  (newPlacements) => {
    if (placementArea) {
      placementArea.set(newPlacements[props.placement]);
    }
    if (canvas) {
      canvas.renderAll();
    }
  },
  { deep: true }
);
watch(
  () => store.state.layers.rectangle1,
  (newRectangle1) => {
    if (rectangle1) {
      rectangle1.set(newRectangle1[props.placement]);
    }
    if (canvas) {
      canvas.renderAll();
    }
  },
  { deep: true }
);
watch(
  () => store.state.layers.rectangle2,
  (newRectangle2) => {
    if (rectangle2) {
      rectangle2.set(newRectangle2[props.placement]);
    }
    if (canvas) {
      canvas.renderAll();
    }
  },
  { deep: true }
);
</script>

<template>
  <canvas ref="canvasRef" width="400" height="400"></canvas>
</template>
