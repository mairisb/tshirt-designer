import { watch } from "vue";
import { store } from "../store";
import { MutationType } from "../store/mutation-type.enum";
import { Layers, Placements, Rect } from "../store/state.type";

export const mapRectToPlacement = (
  baseRect: Rect,
  basePlacementAreaRect: Rect,
  targetPlacementAreaRect: Rect
): Rect => {
  const diffX = baseRect.left! - basePlacementAreaRect.left!;
  const diffY = baseRect.top! - basePlacementAreaRect.top!;

  const ratioX = targetPlacementAreaRect.width! / basePlacementAreaRect.width!;
  const ratioY =
    targetPlacementAreaRect.height! / basePlacementAreaRect.height!;
  const ratio = Math.min(ratioX, ratioY);

  return {
    ...baseRect,
    left: targetPlacementAreaRect.left! + diffX * ratio,
    top: targetPlacementAreaRect.top! + diffY * ratio,
    width: baseRect.width! * ratio,
    height: baseRect.height! * ratio,
  };
};

export const updateLayerRectPlacement = (
  layer: keyof Layers,
  rect: Rect,
  basePlacement: keyof Placements,
  targetPlacement: keyof Placements
) => {
  const mappedRect = mapRectToPlacement(
    rect,
    store.state.placementAreas[basePlacement],
    store.state.placementAreas[targetPlacement]
  );
  store.commit(MutationType.UPDATE_LAYER_RECT, {
    layer,
    placement: targetPlacement,
    data: mappedRect,
  });
};

export const updateLayerFromFrontRect = (
  layer: keyof Layers,
  frontRect: Rect
) => {
  updateLayerRectPlacement(layer, frontRect, "front", "back");
  updateLayerRectPlacement(layer, frontRect, "front", "leftSleeve");
  updateLayerRectPlacement(layer, frontRect, "front", "rightSleeve");
};

export const watchPlacementAreas = () => {
  watch(
    () => store.state.placementAreas,
    () => {
      updateLayerFromFrontRect(
        "rectangle1",
        store.state.layers.rectangle1.front
      );
      updateLayerFromFrontRect(
        "rectangle2",
        store.state.layers.rectangle2.front
      );
    },
    { deep: true }
  );
};

export const watchLayerFrontRect = (layer: keyof Layers) => {
  watch(
    () => store.state.layers[layer].front,
    (frontRect) => {
      updateLayerFromFrontRect(layer, frontRect);
    },
    { deep: true }
  );
};
