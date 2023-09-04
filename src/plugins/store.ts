import { createStore } from "vuex";
import { fabric } from "fabric";

export interface IStore {
  front: Partial<fabric.Rect>;
}

export const store = createStore<IStore>({
  state: {
    front: {
      left: 10,
      top: 10,
      width: 100,
      height: 100,
    },
  },
  mutations: {
    updateFront(state, payload: Partial<fabric.Rect>) {
      state.front = {
        ...state.front,
        ...payload,
      };
    },
  },
  getters: {
    front: (state) => state.front,
  },
});
