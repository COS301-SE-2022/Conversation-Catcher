import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
  createAction
} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux'

export const COLOUR = 'colour';

//initial state with reducers
const colourSlice = createSlice({
  name: COLOUR,
  initialState: {colour:"#3F89BE"},
  reducers: {
    setColour: (state,action) => {state.colour = action.payload;console.log(state.colour);return state}//use param in dispatch
  },
});

const {actions, reducer} = colourSlice

export const {setColour} = actions

export default reducer

//Add selectors
//get current colour
export const selectColour = state => state.colour
export const getColour = () =>{
  var c = useSelector(selectColour)
  console.log(c);
  return c;
}
//Add subscribers