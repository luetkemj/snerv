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
          ...keyBy(action.payload, "id")
        }
      };
    }

    case ADD_SPRITES: {
      return {
        ...state,
        spriteIds: uniq(
          state.spriteIds.concat(action.payload.map(sprite => sprite.id))
        ),
        spritesMap: {
          ...state.spritesMap,
          ...keyBy(action.payload, "id")
        }
      };
    }

    default:
      return state;
  }
}
