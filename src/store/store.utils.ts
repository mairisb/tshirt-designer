import { Rect } from "fabric/fabric-impl";
import { computed } from "vue";
import { store } from ".";
import { MutationType } from "./mutation-type.enum";
import { Layers, Placements } from "./state.type";

export const createLayerPlacementRectOptionRef = (
  layer: keyof Layers,
  placement: keyof Placements,
  rectOption: keyof Rect
) =>
  computed({
    get: () => store.state.layers[layer][placement][rectOption],
    set: (value) => {
      store.commit(MutationType.UPDATE_LAYER_RECT, {
        layer,
        placement,
        data: {
          [rectOption]: Math.round(value),
        },
      });
    },
  });

export const createPlacementAreaRectOptionRef = (
  placementArea: keyof Placements,
  rectOption: keyof Rect
) =>
  computed({
    get: () => store.state.placementAreas[placementArea][rectOption],
    set: (value) => {
      store.commit(MutationType.UPDATE_PLACEMENT_AREA_RECT, {
        placementArea,
        data: {
          [rectOption]: Math.round(value),
        },
      });
    },
  });
