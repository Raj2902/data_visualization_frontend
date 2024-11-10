// store.js
import { createStore } from "redux";
import initializeReducer from "./reducer";

const store = createStore(initializeReducer);

export default store;
