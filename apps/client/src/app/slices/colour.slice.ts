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
    setColour: (state,action) => {state.colour = action.payload; return state}//use param in dispatch
  },
});

const {actions, reducer} = colourSlice

export const {setColour} = actions

export default reducer

// export default colourSlice.reducer;//Used in the main.tsx

// //May not need
// //Add action creators
// //action to change the colour
// export function changeColour(val:string){
//   return{
//     type:'setColour',
//     payload:val
//   }
// }

// export const Change = colourSlice.actions;

//Add selectors
//get current colour
export const selectColour = state => state.colour

//Add subscribers