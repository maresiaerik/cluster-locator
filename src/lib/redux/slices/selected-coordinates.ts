import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type SelectedCoordinates = Coordinates[];

const selectedCoordinatesSlice = createSlice({
  name: "selectedCoordinates",
  initialState: [] as SelectedCoordinates,
  reducers: {
    addSelectedCoordinates: (state, action: PayloadAction<Coordinates>) => {
      state.push(action.payload);
    },
    removeSelectedCoordinatesAtIdx: (state, payload: PayloadAction<number>) => {
      state.splice(payload.payload, 1);
    },
  },
});

export default selectedCoordinatesSlice.reducer;

export const { addSelectedCoordinates, removeSelectedCoordinatesAtIdx } =
  selectedCoordinatesSlice.actions;

export const selectSelectedCoordinates = (state: { selectedCoordinates: SelectedCoordinates }) =>
  state.selectedCoordinates;
