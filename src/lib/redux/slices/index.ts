import { combineReducers } from "@reduxjs/toolkit";

import clusterDataReducer from "./cluster-data";
import mapConfigurationReducer from "./map-configuration";
import selectedCoordinatesReducer from "./selected-coordinates";

const slices = combineReducers({
  mapConfiguration: mapConfigurationReducer,
  clusterData: clusterDataReducer,
  selectedCoordinates: selectedCoordinatesReducer,
});

export default slices;
