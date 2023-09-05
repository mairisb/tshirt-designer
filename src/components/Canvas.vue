<script setup lang="ts">
import { fabric } from "fabric";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { Placements, State } from "../store/state.type";

const props = defineProps<{
  position: keyof Placements;
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
  ...defaultRectOpts,
};

const canvasRef = ref<HTMLCanvasElement | null>();
let canvas: fabric.Canvas | null = null;
let placement: fabric.Rect | null = null;
let rectangle1: fabric.Rect | null = null;
let rectangle2: fabric.Rect | null = null;

const store = useStore<State>();

onMounted(() => {
  if (canvasRef.value) {
    canvas = new fabric.Canvas(canvasRef.value, defaultCanvasOpts);
    placement = new fabric.Rect({
      ...defaultPlacementRectOpts,
      ...store.state.placementAreas[props.position],
    });
    rectangle1 = new fabric.Rect({
      ...defaultLayerRectOpts,
      fill: "#ed4642",
      clipPath: placement,
      ...store.state.layers.rectangle1[props.position],
    });
    rectangle2 = new fabric.Rect({
      ...defaultLayerRectOpts,
      fill: "#17bcb5",
      clipPath: placement,
      ...store.state.layers.rectangle2[props.position],
    });
    canvas.add(placement, rectangle1, rectangle2);
  }
});

watch(
  () => store.state.placementAreas,
  (newPlacements) => {
    if (placement) {
      placement.set(newPlacements[props.position]);
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
      rectangle1.set(newRectangle1[props.position]);
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
      rectangle2.set(newRectangle2[props.position]);
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
