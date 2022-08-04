import {
  createSlice,
} from '@reduxjs/toolkit';
import { act } from '@testing-library/react-native';

export const USER = 'user';

export const userSlice = createSlice({
  name: USER,
  initialState: {
    email:"",
    colour:"#",
    pdfs: []
  },
  reducers: {
    setUser: (state,action) => {state = action.payload;return state},
    setEmail: (state,action) => {state.email = action.payload;return state},
    setColour: (state,action) => {state.colour = action.payload;return state},
    addDF: (state,action) => {state.pdfs.push(action.payload)},
    removePDF: (state,action) => {
      state.pdfs.forEach((item,index) => {
        if (item === action.payload) state.pdfs.splice(index,1)
      })
      return state;
    }
  },
});

export const {actions, reducer} = userSlice

export const {setUser} = actions

//export default reducer

export const selectUser = (state: {}) => state
export const selectColour = (state:{colour:string}) => state.colour
export const selectEmail = (state:{email:string}) => state.email