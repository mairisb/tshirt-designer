<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { Positions, State, UPDATE_PLACEMENT } from "../plugins/store";

const props = defineProps<{
  position: keyof Positions;
}>();

const store = useStore<State>();

const createPositionRefObj = (
  position: keyof Positions,
  bar: keyof fabric.Rect
) =>
  computed({
    get: () => store.state.placements[position][bar],
    set: (value) => {
      store.commit(UPDATE_PLACEMENT, {
        key: position,
        value: {
          [bar]: value,
        },
      });
    },
  });

const left = createPositionRefObj(props.position, "left");
const top = createPositionRefObj(props.position, "top");
const width = createPositionRefObj(props.position, "width");
const height = createPositionRefObj(props.position, "height");
</script>

<template>
  <v-row>
    <v-col cols="12" sm="6" md="3">
      <v-text-field
        type="number"
        label="x"
        variant="underlined"
        v-model="left"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-text-field
        type="number"
        label="y"
        variant="underlined"
        v-model="top"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-text-field
        type="number"
        label="width"
        variant="underlined"
        v-model="width"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-text-field
        type="number"
        label="height"
        variant="underlined"
        v-model="height"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
