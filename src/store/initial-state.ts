import { mapRectToPlacement } from "../core";
import { Layers, State } from "./state.type";

const initialState: State = {
  placementAreas: {
    front: {
      left: 200,
      top: 200,
      width: 150,
      height: 150,
    },
    back: {
      left: 200,
      top: 200,
      width: 300,
      height: 300,
    },
    leftSleeve: {
      left: 200,
      top: 200,
      width: 200,
      height: 300,
    },
    rightSleeve: {
      left: 200,
      top: 200,
      width: 300,
      height: 200,
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

const {
  front: frontPlacement,
  back: backPlacement,
  leftSleeve: leftSleevePlacement,
  rightSleeve: rightSleevePlacement,
} = initialState.placementAreas;

function mapRectToAllPlacements(initialState: State, rectKey: keyof Layers) {
  const rectFront = initialState.layers[rectKey].front;
  initialState.layers[rectKey].back = mapRectToPlacement(
    rectFront,
    frontPlacement,
    backPlacement
  );
  initialState.layers[rectKey].leftSleeve = mapRectToPlacement(
    rectFront,
    frontPlacement,
    leftSleevePlacement
  );
  initialState.layers[rectKey].rightSleeve = mapRectToPlacement(
    rectFront,
    frontPlacement,
    rightSleevePlacement
  );
}

mapRectToAllPlacements(initialState, "rectangle1");
mapRectToAllPlacements(initialState, "rectangle2");

export { initialState };
