<script setup lang="ts">
import { fabric } from "fabric";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { State } from "../plugins/store";

const defaultCanvasOpts: fabric.ICanvasOptions = {
  backgroundColor: "rgb(245,245,245)",
  selection: false,
};

const defaultRectOpts: fabric.IRectOptions = {
  objectCaching: false,
};
const defaultPlacementRectOpts: fabric.IRectOptions = {
  ...defaultRectOpts,
  stroke: "gray",
  fill: "transparent",
  evented: false,
};
const defaultLayerRectOpts: fabric.IRectOptions = {
  ...defaultRectOpts,
};

const frontCanvasRef = ref<HTMLCanvasElement | null>();
const backCanvasRef = ref<HTMLCanvasElement | null>();

let frontCanvas: fabric.Canvas | null = null;
let backCanvas: fabric.Canvas | null = null;

let frontPlacement: fabric.Rect | null = null;
let backPlacement: fabric.Rect | null = null;

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

    frontCanvas.add(frontPlacement);
    backCanvas.add(backPlacement);
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
