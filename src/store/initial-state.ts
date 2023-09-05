import { mapRectToPlacement } from "../core";
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
      width: 300,
      height: 300,
    },
    leftSleeve: {
      left: 250,
      top: 100,
      width: 250,
      height: 150,
    },
    rightSleeve: {
      left: 100,
      top: 200,
      width: 100,
      height: 350,
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

const frontPlacement = initialState.placementAreas.front;
const backPlacement = initialState.placementAreas.back;
const leftSleevePlacement = initialState.placementAreas.leftSleeve;
const rightSleevePlacement = initialState.placementAreas.rightSleeve;

const rect1Front = initialState.layers.rectangle1.front;
initialState.layers.rectangle1.back = mapRectToPlacement(
  rect1Front,
  frontPlacement,
  backPlacement
);
initialState.layers.rectangle1.leftSleeve = mapRectToPlacement(
  rect1Front,
  frontPlacement,
  leftSleevePlacement
);
initialState.layers.rectangle1.rightSleeve = mapRectToPlacement(
  rect1Front,
  frontPlacement,
  rightSleevePlacement
);

const rect2Front = initialState.layers.rectangle2.front;
initialState.layers.rectangle2.back = mapRectToPlacement(
  rect2Front,
  frontPlacement,
  backPlacement
);
initialState.layers.rectangle2.leftSleeve = mapRectToPlacement(
  rect2Front,
  frontPlacement,
  leftSleevePlacement
);
initialState.layers.rectangle2.rightSleeve = mapRectToPlacement(
  rect2Front,
  frontPlacement,
  rightSleevePlacement
);

export { initialState };
