<script setup lang="ts">
import { IStore } from "@/plugins/store";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore<IStore>();

const left = computed({
  get: () => store.state.front.left,
  set: (value) => {
    store.commit("updateFront", {
      left: value,
    });
  },
});
const top = computed({
  get: () => store.state.front.top,
  set: (value) => {
    store.commit("updateFront", {
      top: value,
    });
  },
});
const width = computed({
  get: () => store.state.front.width,
  set: (value) => {
    store.commit("updateFront", {
      width: value,
    });
  },
});
const height = computed({
  get: () => store.state.front.height,
  set: (value) => {
    store.commit("updateFront", {
      height: value,
    });
  },
});
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
