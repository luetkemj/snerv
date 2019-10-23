// rootReducer.js
import { combineReducers } from "redux";

import gamelogState from "./gamelog.reducer";
import spritesState from "./sprites.reducer";
import worldState from "./world.reducer";

const rootReducer = combineReducers({ gamelogState, spritesState, worldState });

export default rootReducer;
