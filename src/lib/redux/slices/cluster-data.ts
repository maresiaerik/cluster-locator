import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { FeatureCollection, Point } from "geojson";

export type ClusterData = {
  name: string;
  data: FeatureCollection<Point>;
} | null;

const clusterDataSlice = createSlice({
  name: "clusterData",
  initialState: null as ClusterData,
  reducers: {
    setClusterData: (_, action: PayloadAction<ClusterData>) => action.payload,
  },
});

export default clusterDataSlice.reducer;

export const { setClusterData } = clusterDataSlice.actions;

export const selectClusterData = (state: { clusterData: ClusterData }) => state.clusterData;
