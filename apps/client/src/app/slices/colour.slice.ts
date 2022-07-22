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

/*
 * Update these interfaces according to your requirements.
 */
export interface ColourEntity {
  id: number;
}

export interface ColourState extends EntityState<ColourEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const colourAdapter = createEntityAdapter<ColourEntity>();

export const colourSlice = createSlice({//initial state with reducers
  name: COLOUR,
  initialState: {value:"#3F89BE"},
  reducers: {
    setColour: (state,action) => {state.value = action.payload}
  },
});

export const colourReducer = colourSlice.reducer;//Used in the main.tsx


//Add action creators

//action to change the colour
const changeColour = colour => {
  return {
    type: 'COLOUR/Change',
    payload: colour
  }
}


export const colourActions = colourSlice.actions;

//Add selectors

//get current colour
export const selectColour = state => state.COLOUR.value

//Add subscribers