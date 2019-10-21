import { filter } from "lodash";

import { UPDATE_SPRITES, ADD_SPRITES } from "../constants/action-types";
import { getNeighbor, squareToId } from "../lib/grid/math";

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

export function updateSprites(sprites, claimedLocations) {
  return dispatch =>
    dispatch({
      type: UPDATE_SPRITES,
      payload: { sprites, claimedLocations }
    });
}

// instructions =
// [
//   {
//     sprite,
//     dir: N
//   },
//  ...
// ]
export function moveSprites(instructions) {
  return (dispatch, getState) => {
    let claimedLocations = { ...getState().worldState.claimedLocations };

    dispatch(
      updateSprites(
        instructions.map(item => {
          const { sprite, dir } = item;
          const { col, row } = sprite;
          const newLoc = getNeighbor({ col, row }, dir);
          const locId = squareToId(newLoc);
          const layer = getState().worldState.layers[item.sprite.layer];
          const existingSpriteId = layer[locId];

          // stay in bounds
          if (newLoc.col < 0) return sprite;
          if (newLoc.col === map.cols) return sprite;
          if (newLoc.row < 0) return sprite;
          if (newLoc.row === map.rows) return sprite;

          // don't collide with others already on the map
          if (
            existingSpriteId &&
            getState().spritesState.spritesMap[existingSpriteId].noClip
          ) {
            return sprite;
          }

          // don't move if new loc has already been claimed
          if (claimedLocations[locId]) {
            return sprite;
          }

          // spot is free and unclaimed. Mark it as claimed and then move there
          claimedLocations[locId] = locId;

          return { ...sprite, ...newLoc };
        }),
        claimedLocations
      )
    );
  };
}

export function movePlayer(dir) {
  return (dispatch, getState) => {
    const player = getState().spritesState.spritesMap[1];
    const instructions = [
      {
        sprite: player,
        dir
      }
    ];
    dispatch(moveSprites(instructions));
  };
}

export function moveMonsters() {
  return (dispatch, getState) => {
    const monsters = filter(
      getState().spritesState.spritesMap,
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
