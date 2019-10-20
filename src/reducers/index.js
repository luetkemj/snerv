// rootReducer.js
import { combineReducers } from "redux";

import spritesReducer from "./sprites.reducer";

const rootReducer = combineReducers({ spritesReducer });

export default rootReducer;
