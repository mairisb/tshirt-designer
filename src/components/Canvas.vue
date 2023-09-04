<script setup lang="ts">
import { fabric } from "fabric";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { Positions, State } from "../plugins/store";

const props = defineProps<{
  position: keyof Positions;
}>();

const defaultCanvasOpts: fabric.ICanvasOptions = {
  backgroundColor: "rgb(245,245,245)",
  selection: false,
};
const defaultRectOpts: fabric.IRectOptions = {
  evented: false,
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
  fill: "red",
};

const canvasRef = ref<HTMLCanvasElement | null>();
let canvas: fabric.Canvas | null = null;
let placement: fabric.Rect | null = null;
let rectangle1: fabric.Rect | null = null;

const store = useStore<State>();

onMounted(() => {
  if (canvasRef.value) {
    canvas = new fabric.Canvas(canvasRef.value, defaultCanvasOpts);
    placement = new fabric.Rect({
      ...defaultPlacementRectOpts,
      ...store.state.placements[props.position],
    });
    rectangle1 = new fabric.Rect({
      ...defaultLayerRectOpts,
      clipPath: placement,
      ...store.state.layers.rectangle1[props.position],
    });
    canvas.add(placement, rectangle1);
  }
});

watch(
  () => store.state.placements,
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
</script>

<template>
  <canvas ref="canvasRef" width="400" height="400"></canvas>
</template>
