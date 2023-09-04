<script setup lang="ts">
import {
  Layers,
  Positions,
  createLayerPositionRef,
  createPlacementPositionRef,
} from "../plugins/store";

const props = defineProps<{
  layer?: keyof Layers;
  position: keyof Positions;
}>();

const createPositionRef = (rectOption: keyof fabric.Rect) =>
  props.layer
    ? createLayerPositionRef(props.layer, props.position, rectOption)
    : createPlacementPositionRef(props.position, rectOption);

const left = createPositionRef("left");
const top = createPositionRef("top");
const width = createPositionRef("width");
const height = createPositionRef("height");
</script>

<template>
  <v-row>
    <v-col cols="12" sm="6" md="3">
      <v-text-field
        v-model="left"
        label="x"
        type="number"
        variant="underlined"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-text-field
        v-model="top"
        label="y"
        type="number"
        variant="underlined"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-text-field
        v-model="width"
        label="width"
        type="number"
        variant="underlined"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-text-field
        v-model="height"
        label="height"
        type="number"
        variant="underlined"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
