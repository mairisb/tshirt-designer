<script setup lang="ts">
import { fabric } from "fabric";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { State, UPDATE_LAYER } from "../plugins/store";

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

const frontCanvasRef = ref<HTMLCanvasElement | null>();
const backCanvasRef = ref<HTMLCanvasElement | null>();

let frontCanvas: fabric.Canvas | null = null;
let backCanvas: fabric.Canvas | null = null;

let frontPlacement: fabric.Rect | null = null;
let backPlacement: fabric.Rect | null = null;

let frontRect1: fabric.Rect | null = null;
let backRect1: fabric.Rect | null = null;

const store = useStore<State>();

onMounted(() => {
  if (frontCanvasRef.value && backCanvasRef.value) {
    frontCanvas = new fabric.Canvas(frontCanvasRef.value, defaultCanvasOpts);
    backCanvas = new fabric.Canvas(backCanvasRef.value, defaultCanvasOpts);

    frontPlacement = new fabric.Rect({
      ...defaultPlacementRectOpts,
      ...store.state.placements.front,
    });
    backPlacement = new fabric.Rect({
      ...defaultPlacementRectOpts,
      ...store.state.placements.back,
    });

    frontRect1 = new fabric.Rect({
      ...defaultLayerRectOpts,
      clipPath: frontPlacement,
      ...store.state.layers.rectangle1.front,
    });
    backRect1 = new fabric.Rect({
      ...defaultLayerRectOpts,
      clipPath: backPlacement,
      ...store.state.layers.rectangle1.back,
    });

    frontCanvas.add(frontPlacement, frontRect1);
    backCanvas.add(backPlacement, backRect1);
  }
});

watch(
  () => store.state.placements,
  (placement) => {
    if (frontPlacement && backPlacement) {
      frontPlacement.set(placement.front);
      backPlacement.set(placement.back);
    }
    if (frontCanvas && backCanvas) {
      frontCanvas.renderAll();
      backCanvas.renderAll();
    }
  },
  { deep: true }
);

watch(
  () => store.state.layers.rectangle1.front,
  (rectangle1Front) => {
    store.commit(UPDATE_LAYER, {
      layer: "rectangle1",
      position: "back",
      data: rectangle1Front,
    });
  },
  { deep: true }
);

watch(
  () => store.state.layers.rectangle1,
  (rectangle1) => {
    if (frontRect1 && backRect1) {
      frontRect1.set(rectangle1.front);
      backRect1.set(rectangle1.back);
    }
    if (frontCanvas && backCanvas) {
      frontCanvas.renderAll();
      backCanvas.renderAll();
    }
  },
  { deep: true }
);
</script>

<template>
  <v-row>
    <v-col cols="12" md="6" class="d-flex justify-center">
      <canvas ref="frontCanvasRef" width="400" height="400"></canvas>
    </v-col>
    <v-col cols="12" md="6" class="d-flex justify-center">
      <canvas ref="backCanvasRef" width="400" height="400"></canvas>
    </v-col>
  </v-row>
</template>
