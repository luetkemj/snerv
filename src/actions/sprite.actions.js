import { filter } from "lodash";

import { UPDATE_SPRITES, ADD_SPRITES } from "../constants/action-types";
import { getNeighbor } from "../lib/grid/math";

// todo: this needs to be in constants or something...
const map = {
  rows: 40,
  cols: 60
};

let nextSpriteId = 0;

export function addSprites(sprites) {
  sprites.forEach(sprite => {
    sprite.id = ++nextSpriteId;
  });

  return dispatch =>
    dispatch({
      type: ADD_SPRITES,
      payload: sprites
    });
}

export function updateSprites(sprites) {
  return dispatch =>
    dispatch({
      type: UPDATE_SPRITES,
      payload: sprites
    });
}

// [
//   {
//     sprite,
//     dir: N
//   }
// ]
export function moveSprites(instructions) {
  return dispatch => {
    dispatch(
      updateSprites(
        instructions.map(item => {
          const { sprite, dir } = item;
          const { col, row } = sprite;
          const newLoc = getNeighbor({ col, row }, dir);

          if (newLoc.col < 0) return sprite;
          if (newLoc.col === map.cols) return sprite;
          if (newLoc.row < 0) return sprite;
          if (newLoc.row === map.rows) return sprite;

          return { ...sprite, ...newLoc };
        })
      )
    );
  };
}

export function moveMonsters() {
  return (dispatch, getState) => {
    const monsters = filter(
      getState().spritesReducer.spritesMap,
      sprite => sprite.type === "MONSTER"
    );

    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const randomDirection = () =>
      directions[Math.floor(Math.random() * directions.length)];

    const instructions = monsters.map(sprite => ({
      sprite,
      dir: randomDirection()
    }));

    dispatch(moveSprites(instructions));
  };
}
