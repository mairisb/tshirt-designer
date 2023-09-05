<script setup lang="ts">
import {
  Layers,
  Placements,
  Rect,
  createLayerPlacementRectOptionRef,
  createPlacementAreaRectOptionRef,
} from "../plugins/store";

const props = defineProps<{
  layer?: keyof Layers;
  placement: keyof Placements;
}>();

const createPositionRef = (rectOption: keyof Rect) =>
  props.layer
    ? createLayerPlacementRectOptionRef(
        props.layer,
        props.placement,
        rectOption
      )
    : createPlacementAreaRectOptionRef(props.placement, rectOption);

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
        min="0"
        variant="underlined"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-text-field
        v-model="height"
        label="height"
        type="number"
        min="0"
        variant="underlined"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
