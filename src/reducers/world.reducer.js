import { cloneDeep } from "lodash";

import { squareToId } from "../lib/grid/math";
import {
  ADD_SPRITES,
  UPDATE_SPRITES,
  UPDATE_WORLD
} from "../constants/action-types";

const initialState = {
  cols: 60,
  rows: 40,
  layers: {
    layerGround: {}, // 100
    layerBelow: {}, // 200
    layerAt: {}, // 300
    layerAbove: {}, // 400
    layerSky: {} // 500
  },
  claimedLocations: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_SPRITES: {
      const updatedLayers = cloneDeep(state.layers);

      action.payload.forEach(
        // keyby map coords not sprite id
        sprite => (updatedLayers[sprite.layer][squareToId(sprite)] = sprite.id)
      );
      return {
        ...state,
        layers: updatedLayers
      };
    }
    case UPDATE_WORLD: {
      return {
        ...state,
        layers: action.payload,
        claimedLocations: {}
      };
    }

    case UPDATE_SPRITES: {
      return {
        ...state,
        claimedLocations: action.claimedLocations
      };
    }
    default:
      return state;
  }
}
