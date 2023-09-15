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

function mapFrontRectToOtherPlacements(
  initialState: State,
  layer: keyof Layers
) {
  const frontRect = initialState.layers[layer].front;
  initialState.layers[layer].back = mapRectToPlacement(
    frontRect,
    frontPlacement,
    backPlacement
  );
  initialState.layers[layer].leftSleeve = mapRectToPlacement(
    frontRect,
    frontPlacement,
    leftSleevePlacement
  );
  initialState.layers[layer].rightSleeve = mapRectToPlacement(
    frontRect,
    frontPlacement,
    rightSleevePlacement
  );
}

mapFrontRectToOtherPlacements(initialState, "rectangle1");
mapFrontRectToOtherPlacements(initialState, "rectangle2");

export { initialState };
