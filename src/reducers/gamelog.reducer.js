import { ADD_NEW_LOG } from "../constants/action-types";

const initialState = {
  logs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_LOG: {
      return {
        ...state,
        logs: [action.payload, ...state.logs]
      };
    }
    default:
      return state;
  }
}
