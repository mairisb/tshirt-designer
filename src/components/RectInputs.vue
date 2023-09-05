<script setup lang="ts">
import { Layers, Placements, Rect } from "../store/state.type";
import {
  createLayerPlacementRectOptionRef,
  createPlacementAreaRectOptionRef,
} from "../store/store.utils";

const props = defineProps<{
  layer?: keyof Layers;
  placement: keyof Placements;
}>();

const createPlacementRectOptionRef = (rectOption: keyof Rect) =>
  props.layer
    ? createLayerPlacementRectOptionRef(
        props.layer,
        props.placement,
        rectOption
      )
    : createPlacementAreaRectOptionRef(props.placement, rectOption);

const left = createPlacementRectOptionRef("left");
const top = createPlacementRectOptionRef("top");
const width = createPlacementRectOptionRef("width");
const height = createPlacementRectOptionRef("height");
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
        min="1"
        variant="underlined"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-text-field
        v-model="height"
        label="height"
        type="number"
        min="1"
        variant="underlined"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
