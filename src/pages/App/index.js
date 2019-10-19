import React, { useState } from "react";
import useEventListener from "@use-it/event-listener";

import { getNeighbor } from "../../lib/grid/math";
import "./App.scss";

function App() {
  const [playerLoc, setPlayerLoc] = useState({ col: 0, row: 0 });

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

  const moveSprite = (sprite, dir) => {
    const newLoc = getNeighbor(sprite, dir);
    if (newLoc.col < 0) return;
    if (newLoc.col === map.cols) return;
    if (newLoc.row < 0) return;
    if (newLoc.row === map.rows) return;

    return setPlayerLoc(newLoc);
  };

  const handleKeyDown = ({ key }) => {
    console.log(key);

    if (PLAYER_MOVE_N.includes(String(key))) {
      moveSprite(playerLoc, "N");
    }

    if (PLAYER_MOVE_NE.includes(String(key))) {
      moveSprite(playerLoc, "NE");
    }

    if (PLAYER_MOVE_E.includes(String(key))) {
      moveSprite(playerLoc, "E");
    }

    if (PLAYER_MOVE_SE.includes(String(key))) {
      moveSprite(playerLoc, "SE");
    }

    if (PLAYER_MOVE_S.includes(String(key))) {
      moveSprite(playerLoc, "S");
    }

    if (PLAYER_MOVE_SW.includes(String(key))) {
      moveSprite(playerLoc, "SW");
    }

    if (PLAYER_MOVE_W.includes(String(key))) {
      moveSprite(playerLoc, "W");
    }

    if (PLAYER_MOVE_NW.includes(String(key))) {
      moveSprite(playerLoc, "NW");
    }
  };

  useEventListener("keydown", handleKeyDown);

  return (
    <div className="App">
      <div className="game" onKeyDown={handleKeyDown}>
        <span
          className="player sprite"
          style={{
            transform: `translate(${playerLoc.col * 10}px, ${playerLoc.row *
              10}px)`
          }}
          role="img"
          aria-label="player"
        />

        {JSON.stringify(playerLoc, null, 2)}
      </div>
    </div>
  );
}

export default App;
