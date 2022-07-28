import {
  createSlice,
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

export const {actions, reducer} = colourSlice

export const {setColour} = actions

//export default reducer

//Add selectors
//get current colour
export const selectColour = (state: { colour: string; }) => state.colour

//Add subscribers