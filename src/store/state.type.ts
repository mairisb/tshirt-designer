import { fabric } from "fabric";

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
