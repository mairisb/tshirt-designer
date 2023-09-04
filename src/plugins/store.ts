import { createStore } from "vuex";
import { fabric } from "fabric";
import { computed } from "vue";

export interface Positions {
  front: Partial<fabric.Rect>;
  back: Partial<fabric.Rect>;
  leftSleeve: Partial<fabric.Rect>;
  rightSleeve: Partial<fabric.Rect>;
}

export interface Layers {
  rectangle1: Positions;
  rectangle2: Positions;
}

export interface State {
  placements: Positions;
  layers: Layers;
}

export const UPDATE_PLACEMENT = "UPDATE_PLACEMENT";
export const UPDATE_LAYER = "UPDATE_LAYER";

export const store = createStore<State>({
  state: {
    placements: {
      front: {
        left: 10,
        top: 10,
        width: 100,
        height: 100,
      },
      back: {
        left: 10,
        top: 10,
        width: 100,
        height: 100,
      },
      leftSleeve: {
        left: 10,
        top: 10,
        width: 100,
        height: 100,
      },
      rightSleeve: {
        left: 10,
        top: 10,
        width: 100,
        height: 100,
      },
    },
    layers: {
      rectangle1: {
        front: {
          left: 20,
          top: 20,
          width: 50,
          height: 50,
        },
        back: {
          left: 20,
          top: 20,
          width: 50,
          height: 50,
        },
        leftSleeve: {
          left: 20,
          top: 20,
          width: 50,
          height: 50,
        },
        rightSleeve: {
          left: 20,
          top: 20,
          width: 50,
          height: 50,
        },
      },
      rectangle2: {
        front: {
          left: 60,
          top: 60,
          width: 30,
          height: 50,
        },
        back: {
          left: 60,
          top: 60,
          width: 30,
          height: 50,
        },
        leftSleeve: {
          left: 60,
          top: 60,
          width: 30,
          height: 50,
        },
        rightSleeve: {
          left: 60,
          top: 60,
          width: 30,
          height: 50,
        },
      },
    },
  },
  mutations: {
    [UPDATE_PLACEMENT](
      state,
      payload: { position: keyof Positions; data: Partial<fabric.Rect> }
    ) {
      state.placements[payload.position] = {
        ...state.placements[payload.position],
        ...payload.data,
      };
    },
    [UPDATE_LAYER](
      state,
      payload: {
        layer: keyof Layers;
        position: keyof Positions;
        data: Partial<fabric.Rect>;
      }
    ) {
      state.layers[payload.layer][payload.position] = {
        ...state.layers[payload.layer][payload.position],
        ...payload.data,
      };
    },
  },
  getters: {
    getPlacement: (state) => (position: keyof Positions) => {
      return state.placements[position];
    },
    getLayer: (state) => (layer: keyof Layers, position: keyof Positions) => {
      return state.layers[layer][position];
    },
  },
});

export const createLayerPositionRef = (
  layer: keyof Layers,
  position: keyof Positions,
  rectOpt: keyof fabric.Rect
) =>
  computed({
    get: () => store.state.layers[layer][position][rectOpt],
    set: (value) => {
      store.commit(UPDATE_LAYER, {
        layer,
        position,
        data: {
          [rectOpt]: value,
        },
      });
    },
  });

export const createPlacementPositionRef = (
  position: keyof Positions,
  rectOpt: keyof fabric.Rect
) =>
  computed({
    get: () => store.state.placements[position][rectOpt],
    set: (value) => {
      store.commit(UPDATE_PLACEMENT, {
        position,
        data: {
          [rectOpt]: value,
        },
      });
    },
  });
