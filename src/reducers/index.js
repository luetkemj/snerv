// rootReducer.js
import { combineReducers } from "redux";

import spritesState from "./sprites.reducer";
import worldState from "./world.reducer";

const rootReducer = combineReducers({ spritesState, worldState });

export default rootReducer;
