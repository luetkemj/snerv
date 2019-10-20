import { uniq } from "lodash";
import { ADD_SPRITE, UPDATE_SPRITE } from "../constants/action-types";

const initialState = {
  ids: [],
  map: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_SPRITE: {
      return {
        ...state,
        ids: uniq(state.ids.concat([action.payload.id])),
        map: {
          ...state.map,
          [action.payload.id]: action.payload
        }
      };
    }

    case UPDATE_SPRITE: {
      return {
        ...state,
        map: {
          ...state.map,
          [action.payload.id]: action.payload
        }
      };
    }

    default:
      return state;
  }
}
