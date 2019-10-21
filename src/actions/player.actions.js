import { PLAYER_MOVE } from "../constants/action-types";
import { movePlayer, moveMonsters } from "../actions/sprite.actions";
import { updateWorld } from "../actions/world.actions";

export function playerMove(dir) {
  return dispatch => {
    dispatch({ type: PLAYER_MOVE });
    dispatch(movePlayer(dir));
    dispatch(moveMonsters());
    dispatch(updateWorld());
  };
}
