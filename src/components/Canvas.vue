<script setup lang="ts">
import { fabric } from "fabric";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { IStore } from "../plugins/store";

const store = useStore<IStore>();

const canvasRef1 = ref<HTMLCanvasElement | null>();
const canvasRef2 = ref<HTMLCanvasElement | null>();

let canvas1: fabric.Canvas | null = null;
let canvas2: fabric.Canvas | null = null;

onMounted(() => {
  if (canvasRef1.value && canvasRef2.value) {
    canvas1 = new fabric.Canvas(canvasRef1.value, {
      backgroundColor: "rgb(245,245,245)",
    });
    canvas2 = new fabric.Canvas(canvasRef2.value, {
      backgroundColor: "rgb(245,245,245)",
    });

    const frontPlacement = new fabric.Rect({
      fill: "blue",
      ...store.state.front,
    });

    canvas1.add(frontPlacement);
  }
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="6" class="d-flex justify-center">
      <canvas ref="canvasRef1" width="400" height="400"></canvas>
    </v-col>
    <v-col cols="12" md="6" class="d-flex justify-center">
      <canvas ref="canvasRef2" width="400" height="400"></canvas>
    </v-col>
  </v-row>
</template>
