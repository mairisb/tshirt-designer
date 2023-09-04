import { createStore } from "vuex";
import { fabric } from "fabric";

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
      payload: { key: keyof Positions; value: Partial<fabric.Rect> }
    ) {
      state.placements[payload.key] = {
        ...state.placements[payload.key],
        ...payload.value,
      };
    },
    [UPDATE_LAYER](
      state,
      payload: {
        layer: keyof Layers;
        key: keyof Positions;
        value: Partial<fabric.Rect>;
      }
    ) {
      state.layers[payload.layer][payload.key] = {
        ...state.layers[payload.layer][payload.key],
        ...payload.value,
      };
    },
  },
  getters: {
    getPlacement: (state) => (key: keyof Positions) => {
      return state.placements[key];
    },
    getLayer: (state) => (layer: keyof Layers, key: keyof Positions) => {
      return state.layers[layer][key];
    },
  },
});
