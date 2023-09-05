import { State } from "./state.type";

const initialState: State = {
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
      back: {},
      leftSleeve: {},
      rightSleeve: {},
    },
    rectangle2: {
      front: {
        left: 220,
        top: 220,
        width: 30,
        height: 50,
      },
      back: {},
      leftSleeve: {},
      rightSleeve: {},
    },
  },
};

export { initialState };
