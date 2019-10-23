import { forEach } from "lodash";

import { squareToId } from "../lib/grid/math";
import { UPDATE_WORLD } from "../constants/action-types";

// look at all sprites in world layers and lookup their ids. from the ids recalc the layers based on locations
export function updateWorld() {
  return (dispatch, getState) => {
    const { layers } = getState().worldState;

    const updatedLayers = {};

    forEach(layers, (v, k) => {
      updatedLayers[k] = {};

      forEach(v, spriteId => {
        const sprite = getState().spritesState.spritesMap[spriteId];
        const locId = squareToId(sprite);
        updatedLayers[k][locId] = spriteId;
      });
    });

    dispatch({ type: UPDATE_WORLD, payload: updatedLayers });
  };
}
