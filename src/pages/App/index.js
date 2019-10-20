import React, { useEffect } from "react";
import useEventListener from "@use-it/event-listener";
import { useDispatch, useSelector } from "react-redux";

import { addSprite, moveSprite } from "../../actions/sprite.actions";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const spriteIds = useSelector(state => state.spritesReducer.ids);
  const spritesMap = useSelector(state => state.spritesReducer.map);

  // this will only run once like componentDidMount
  useEffect(() => {
    dispatch(
      addSprite({
        type: "PLAYER",
        col: 0,
        row: 0
      })
    );

    dispatch(
      addSprite({
        type: "MONSTER",
        col: 10,
        row: 10
      })
    );

    dispatch(
      addSprite({
        type: "MONSTER",
        col: 15,
        row: 23
      })
    );

    dispatch(
      addSprite({
        type: "MONSTER",
        col: 15,
        row: 23
      })
    );

    dispatch(
      addSprite({
        type: "MONSTER",
        col: 15,
        row: 23
      })
    );

    dispatch(
      addSprite({
        type: "MONSTER",
        col: 15,
        row: 23
      })
    );

    dispatch(
      addSprite({
        type: "MONSTER",
        col: 15,
        row: 23
      })
    );

    dispatch(
      addSprite({
        type: "MONSTER",
        col: 15,
        row: 23
      })
    );

    dispatch(
      addSprite({
        type: "MONSTER",
        col: 15,
        row: 23
      })
    );
  }, [dispatch]);

  const gameTick = () => {
    console.log("gameTicked!");
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const randomDirection = () =>
      directions[Math.floor(Math.random() * directions.length)];
    dispatch(moveSprite(spritesMap[2], randomDirection()));
    dispatch(moveSprite(spritesMap[3], randomDirection()));
    dispatch(moveSprite(spritesMap[4], randomDirection()));
    dispatch(moveSprite(spritesMap[5], randomDirection()));
    dispatch(moveSprite(spritesMap[6], randomDirection()));
    dispatch(moveSprite(spritesMap[7], randomDirection()));
    dispatch(moveSprite(spritesMap[8], randomDirection()));
    dispatch(moveSprite(spritesMap[9], randomDirection()));
  };

  const movePlayer = dir => {
    dispatch(moveSprite(spritesMap[1], dir));
    gameTick();
  };

  const handleKeyDown = ({ key }) => {
    console.log(key);

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
        {spriteIds.map(key => (
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
        ))}

        {JSON.stringify(spritesMap, null, 2)}
      </div>
    </div>
  );
}

export default App;
