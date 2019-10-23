import { filter } from "lodash";

import {
  UPDATE_SPRITES,
  ADD_SPRITES,
  ADD_NEW_LOG
} from "../constants/action-types";
import { MAP_COLS, MAP_ROWS } from "../constants/world.constants";
import { getNeighbor, squareToId } from "../lib/grid/math";

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
          const existingSprite = getState().spritesState.spritesMap[
            existingSpriteId
          ];

          // stay in bounds
          if (newLoc.col < 0) return sprite;
          if (newLoc.col === MAP_COLS) return sprite;
          if (newLoc.row < 0) return sprite;
          if (newLoc.row === MAP_ROWS) return sprite;

          // don't collide with others already on the map
          if (existingSpriteId && existingSprite.noClip) {
            if (sprite.type !== existingSprite.type) {
              dispatch(attack(sprite, existingSprite));
            }
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
    // don't move if dead
    if (player.health <= 0) return;

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
      sprite => sprite.type === "MONSTER" && sprite.health > 0
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

export function attack(attacker, target) {
  return dispatch => {
    dispatch({ type: "ATTACK" });
    if (target.type === "MONSTER") {
      dispatch({
        type: ADD_NEW_LOG,
        payload: { text: `You attack and kill the monster!` }
      });
    }
    if (target.type === "PLAYER") {
      dispatch({
        type: ADD_NEW_LOG,
        payload: { text: `The monster kills you!` }
      });
    }
    dispatch(updateSprites([{ ...target, health: 0 }]));
  };
}
