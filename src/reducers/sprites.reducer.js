import { keyBy, uniq } from "lodash";
import { ADD_SPRITES, UPDATE_SPRITES } from "../constants/action-types";

const initialState = {
  spriteIds: [],
  spritesMap: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SPRITES: {
      return {
        ...state,
        spritesMap: {
          ...state.spritesMap,
          ...keyBy(action.payload.sprites, "id")
        }
      };
    }

    case ADD_SPRITES: {
      const spriteIds = uniq(
        state.spriteIds.concat(action.payload.map(sprite => sprite.id))
      );

      const spritesMap = {
        ...state.spritesMap,
        ...keyBy(action.payload, "id")
      };

      return {
        ...state,
        spriteIds,
        spritesMap
      };
    }

    default:
      return state;
  }
}
