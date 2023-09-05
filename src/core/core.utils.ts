import { store } from "../store";
import { MutationType } from "../store/mutation-type.enum";
import { Layers, Placements, Rect } from "../store/state.type";

const mapRectToPlacement = (
  baseRect: Rect,
  basePlacement: keyof Placements,
  targetPlacement: keyof Placements
): Rect => {
  const basePlacementAreaRect = store.state.placementAreas[basePlacement];
  const targetPlacementAreaRect = store.state.placementAreas[targetPlacement];

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
  const mappedRect = mapRectToPlacement(rect, basePlacement, targetPlacement);
  store.commit(MutationType.UPDATE_LAYER_RECT, {
    layer,
    placement: targetPlacement,
    data: mappedRect,
  });
};
