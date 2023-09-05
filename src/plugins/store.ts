import { fabric } from "fabric";
import { computed } from "vue";
import { createStore } from "vuex";

export type Rect = Partial<fabric.Rect>;

export interface Placements {
  front: Rect;
  back: Rect;
  leftSleeve: Rect;
  rightSleeve: Rect;
}

export interface Layers {
  rectangle1: Placements;
  rectangle2: Placements;
}

export interface State {
  placementAreas: Placements;
  layers: Layers;
}

export const UPDATE_PLACEMENT_AREA_RECT = "UPDATE_PLACEMENT_AREA_RECT";
export const UPDATE_LAYER_RECT = "UPDATE_LAYER";

export const store = createStore<State>({
  state: {
    placementAreas: {
      front: {
        left: 200,
        top: 200,
        width: 150,
        height: 250,
      },
      back: {
        left: 200,
        top: 200,
        width: 100,
        height: 100,
      },
      leftSleeve: {
        left: 200,
        top: 200,
        width: 100,
        height: 100,
      },
      rightSleeve: {
        left: 200,
        top: 200,
        width: 100,
        height: 100,
      },
    },
    layers: {
      rectangle1: {
        front: {
          left: 200,
          top: 200,
          width: 50,
          height: 50,
        },
        back: {
          left: 200,
          top: 200,
          width: 50,
          height: 50,
        },
        leftSleeve: {
          left: 200,
          top: 200,
          width: 50,
          height: 50,
        },
        rightSleeve: {
          left: 200,
          top: 200,
          width: 50,
          height: 50,
        },
      },
      rectangle2: {
        front: {
          left: 220,
          top: 220,
          width: 30,
          height: 50,
        },
        back: {
          left: 220,
          top: 220,
          width: 30,
          height: 50,
        },
        leftSleeve: {
          left: 220,
          top: 220,
          width: 30,
          height: 50,
        },
        rightSleeve: {
          left: 220,
          top: 220,
          width: 30,
          height: 50,
        },
      },
    },
  },
  mutations: {
    [UPDATE_PLACEMENT_AREA_RECT](
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
    [UPDATE_LAYER_RECT](
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

export const createLayerPlacementRectOptionRef = (
  layer: keyof Layers,
  placement: keyof Placements,
  rectOption: keyof Rect
) =>
  computed({
    get: () => store.state.layers[layer][placement][rectOption],
    set: (value) => {
      store.commit(UPDATE_LAYER_RECT, {
        layer,
        placement,
        data: {
          [rectOption]: Math.round(value),
        },
      });
    },
  });

export const createPlacementAreaRectOptionRef = (
  placementArea: keyof Placements,
  rectOption: keyof Rect
) =>
  computed({
    get: () => store.state.placementAreas[placementArea][rectOption],
    set: (value) => {
      store.commit(UPDATE_PLACEMENT_AREA_RECT, {
        placementArea,
        data: {
          [rectOption]: Math.round(value),
        },
      });
    },
  });
