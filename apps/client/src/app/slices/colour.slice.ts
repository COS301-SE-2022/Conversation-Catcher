import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
  createAction
} from '@reduxjs/toolkit';

export const COLOUR = 'colour';

//initial state with reducers
const colourSlice = createSlice({
  name: COLOUR,
  initialState: {colour:"#3F89BE"},
  reducers: {
    setColour: (state,action) => {state.colour = action.payload;return state}//use param in dispatch
  },
});

const {actions, reducer} = colourSlice

export const {setColour} = actions

export default reducer

//Add selectors
//get current colour
export const selectColour = state => state.colour

//Add subscribers