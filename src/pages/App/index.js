import React, { useEffect } from "react";
import useEventListener from "@use-it/event-listener";
import { useDispatch, useSelector } from "react-redux";

import { random } from "lodash";

import {
  addSprites,
  moveMonsters,
  moveSprites
} from "../../actions/sprite.actions";

import { playerMove } from "../../actions/player.actions";

import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const spriteIds = useSelector(state => state.spritesState.spriteIds);
  const spritesMap = useSelector(state => state.spritesState.spritesMap);

  const layerAt = useSelector(state => state.worldState.layers.layerAt);

  // this will only run once like componentDidMount
  useEffect(() => {
    dispatch(
      addSprites([
        {
          type: "PLAYER",
          col: 2,
          row: 2,
          layer: "layerAt",
          noClip: true
        },
        ...Array.from(Array(100)).map(x => ({
          type: "MONSTER",
          col: random(0, 59),
          row: random(0, 39),
          layer: "layerAt",
          noClip: true
        }))
      ])
    );
  }, [dispatch]);

  // const gameTick = () => {
  //   dispatch(moveMonsters());
  // };

  const movePlayer = dir => {
    // dispatch(moveSprites([{ sprite: spritesMap[1], dir }]));
    dispatch(playerMove(dir));
  };

  const handleKeyDown = ({ key }) => {
    // key bindings
    const PLAYER_MOVE_N = ["ArrowUp", "8", "w"];
    const PLAYER_MOVE_NE = ["9"];
    const PLAYER_MOVE_E = ["ArrowRight", "6", "d"];
    const PLAYER_MOVE_SE = ["3"];
    const PLAYER_MOVE_S = ["ArrowDown", "2", "s"];
    const PLAYER_MOVE_SW = ["1"];
    const PLAYER_MOVE_W = ["ArrowLeft", "4", "a"];
    const PLAYER_MOVE_NW = ["7"];

    if (PLAYER_MOVE_N.includes(String(key))) {
      movePlayer("N");
    }

    if (PLAYER_MOVE_NE.includes(String(key))) {
      movePlayer("NE");
    }

    if (PLAYER_MOVE_E.includes(String(key))) {
      movePlayer("E");
    }

    if (PLAYER_MOVE_SE.includes(String(key))) {
      movePlayer("SE");
    }

    if (PLAYER_MOVE_S.includes(String(key))) {
      movePlayer("S");
    }

    if (PLAYER_MOVE_SW.includes(String(key))) {
      movePlayer("SW");
    }

    if (PLAYER_MOVE_W.includes(String(key))) {
      movePlayer("W");
    }

    if (PLAYER_MOVE_NW.includes(String(key))) {
      movePlayer("NW");
    }
  };

  useEventListener("keydown", handleKeyDown);

  return (
    <div className="App">
      <div className="game" onKeyDown={handleKeyDown}>
        {Object.keys(layerAt).map(key => {
          const spriteId = layerAt[key];
          return (
            <span
              key={spriteId}
              className={`sprite ${spritesMap[spriteId].type}`}
              style={{
                transform: `translate(${spritesMap[spriteId].col *
                  10}px, ${spritesMap[spriteId].row * 10}px)`
              }}
              role="img"
              aria-label={`${spritesMap[spriteId].type}-sprite`}
            ></span>
          );
        })}

        {/* {spriteIds.map(key => (
          <span
            key={key}
            className={`sprite ${spritesMap[key].type}`}
            style={{
              transform: `translate(${spritesMap[key].col * 10}px, ${spritesMap[
                key
              ].row * 10}px)`
            }}
            role="img"
            aria-label={`${spritesMap[key].type}-sprite`}
          />
        ))} */}
      </div>
    </div>
  );
}

export default App;
