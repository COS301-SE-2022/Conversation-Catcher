import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { act } from '@testing-library/react-native';

export const COLOUR = 'colour';

//Interfaces (Not sure what they do, uncomment if problems occur)
// export interface ColourEntity {
//   id: number;
// }
// export interface ColourState extends EntityState<ColourEntity> {
//   loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
//   error: string;
// }
// export const colourAdapter = createEntityAdapter<ColourEntity>();

//initial state with reducers
export const colourSlice = createSlice({
  name: COLOUR,
  initialState: {colour:"#3F89BE"},
  reducers: {
    setColour: (state,action) => {state.colour = action.payload}//use param in dispatch
  },
});

export const colourReducer = colourSlice.reducer;//Used in the main.tsx

//May not need
// //Add action creators
// //action to change the colour
// const changeColour = colour => {
//   return {
//     type: 'COLOUR/Change',
//     payload: colour
//   }
// }

export const colourActions = colourSlice.actions;

//Add selectors
//get current colour
export const selectColour = state => state.colour

//Add subscribers