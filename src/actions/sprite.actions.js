import { ADD_SPRITE, UPDATE_SPRITE } from "../constants/action-types";
import { getNeighbor } from "../lib/grid/math";

// todo: this needs to be in constants or something...
const map = {
  rows: 40,
  cols: 60
};

let nextSpriteId = 0;

export function addSprite(sprite) {
  return dispatch =>
    dispatch({
      type: ADD_SPRITE,
      payload: {
        id: ++nextSpriteId,
        ...sprite
      }
    });
}

export function updateSprite(sprite) {
  return dispatch =>
    dispatch({
      type: UPDATE_SPRITE,
      payload: sprite
    });
}

export function moveSprite(sprite, dir) {
  return dispatch => {
    const { col, row } = sprite;
    const newLoc = getNeighbor({ col, row }, dir);

    // move to a boundary collisions function of some sort...
    if (newLoc.col < 0) return;
    if (newLoc.col === map.cols) return;
    if (newLoc.row < 0) return;
    if (newLoc.row === map.rows) return;

    return dispatch(updateSprite({ ...sprite, ...newLoc }));
  };
}
