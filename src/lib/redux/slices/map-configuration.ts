import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Map } from "mapbox-gl";

export type MapConfiguration = {
  clusters: {
    radius: number;
  };
  map: {
    instance: Map | null;
    showClustersOnMap: boolean;
    showAllDatapointsOnMap: boolean;
  };
};

const mapConfigurationSlice = createSlice({
  name: "mapConfiguration",
  initialState: {
    clusters: {
      radius: 80,
    },
    map: {
      showClustersOnMap: true,
      showAllDatapointsOnMap: false,
    },
  } as MapConfiguration,
  reducers: {
    setClusterRadius(state, action: PayloadAction<number>) {
      state.clusters.radius = action.payload;
    },
    setShowClustersOnMap(state, action: PayloadAction<boolean>) {
      state.map.showClustersOnMap = action.payload;
    },
    setShowAllDatapointsOnMap(state, action: PayloadAction<boolean>) {
      state.map.showAllDatapointsOnMap = action.payload;
    },
    setMapInstance(state, action: PayloadAction<Map>) {
      state.map.instance = action.payload;
    },
  },
});

export default mapConfigurationSlice.reducer;

export const { setClusterRadius, setShowClustersOnMap, setShowAllDatapointsOnMap, setMapInstance } =
  mapConfigurationSlice.actions;

export const selectCompleteMapConfiguration = (state: { mapConfiguration: MapConfiguration }) =>
  state.mapConfiguration;

export const selectClusterConfig = (state: { mapConfiguration: MapConfiguration }) =>
  state.mapConfiguration.clusters;

export const selectMapConfig = (state: { mapConfiguration: MapConfiguration }) =>
  state.mapConfiguration.map;

export const selectMapInstance = (state: { mapConfiguration: MapConfiguration }) =>
  state.mapConfiguration.map.instance;
