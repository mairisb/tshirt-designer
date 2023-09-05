import { createStore } from "vuex";
import { initialState } from "./initial-state";
import { Layers, Placements, Rect, State } from "./state.type";
import { MutationType } from "./mutation-type.enum";

export const store = createStore<State>({
  state: initialState,
  mutations: {
    [MutationType.UPDATE_PLACEMENT_AREA_RECT](
      state,
      payload: {
        placementArea: keyof Placements;
        data: Rect;
      }
    ) {
      state.placementAreas[payload.placementArea] = {
        ...state.placementAreas[payload.placementArea],
        ...payload.data,
      };
    },
    [MutationType.UPDATE_LAYER_RECT](
      state,
      payload: {
        layer: keyof Layers;
        placement: keyof Placements;
        data: Rect;
      }
    ) {
      state.layers[payload.layer][payload.placement] = {
        ...state.layers[payload.layer][payload.placement],
        ...payload.data,
      };
    },
  },
  getters: {
    getPlacement: (state) => (placement: keyof Placements) => {
      return state.placementAreas[placement];
    },
    getLayer: (state) => (layer: keyof Layers, placement: keyof Placements) => {
      return state.layers[layer][placement];
    },
  },
});
