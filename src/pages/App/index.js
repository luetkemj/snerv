import React, { useState, useEffect } from "react";
import useEventListener from "@use-it/event-listener";

import { getNeighbor } from "../../lib/grid/math";
import "./App.scss";

function App() {
  // const spriteCount = 1;
  const [gameCounter, setGameCounter] = useState(0);
  const [sprites, setSprite] = useState({
    0: {
      type: "PLAYER",
      col: 0,
      row: 0,
      id: 0
    },

    1: {
      type: "MONSTER",
      col: 10,
      row: 10,
      id: 1
    }
  });

  useEffect(() => {
    console.log("gameTicked!");
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const randomDirection = () =>
      directions[Math.floor(Math.random() * directions.length)];
    moveSprite(sprites[1], randomDirection());
    moveSprite(sprites[2], randomDirection());
    moveSprite(sprites[3], randomDirection());
  }, [gameCounter]);

  const PLAYER_MOVE_N = ["ArrowUp", "8", "w"];
  const PLAYER_MOVE_NE = ["9"];
  const PLAYER_MOVE_E = ["ArrowRight", "6", "d"];
  const PLAYER_MOVE_SE = ["3"];
  const PLAYER_MOVE_S = ["ArrowDown", "2", "s"];
  const PLAYER_MOVE_SW = ["1"];
  const PLAYER_MOVE_W = ["ArrowLeft", "4", "a"];
  const PLAYER_MOVE_NW = ["7"];

  const map = {
    rows: 40,
    cols: 60
  };

  // const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  // const tick = () => {
  //   moveSprite(monsterLoc, "E");
  // };

  const moveSprite = (sprite, dir) => {
    const { col, row } = sprite;
    const newLoc = getNeighbor({ col, row }, dir);

    // move to a boundary collisions function of some sort...
    if (newLoc.col < 0) return;
    if (newLoc.col === map.cols) return;
    if (newLoc.row < 0) return;
    if (newLoc.row === map.rows) return;

    const newSprites = { ...sprites };
    newSprites[sprite.id] = { ...sprite, ...newLoc };

    setSprite({ ...newSprites });
  };

  const gameTick = () => {
    setGameCounter(gameCounter + 1);
  };

  const movePlayer = dir => {
    moveSprite(sprites[0], dir);
    gameTick();
  };

  const handleKeyDown = ({ key }) => {
    console.log(key);

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
        {Object.keys(sprites).map(key => (
          <span
            key={key}
            className={`sprite ${sprites[key].type}`}
            style={{
              transform: `translate(${sprites[key].col * 10}px, ${sprites[key]
                .row * 10}px)`
            }}
            role="img"
            aria-label={`${sprites[key].type}-sprite`}
          />
        ))}

        {JSON.stringify(sprites, null, 2)}
      </div>
    </div>
  );
}

export default App;
