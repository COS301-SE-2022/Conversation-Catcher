import {
  createSlice,
} from '@reduxjs/toolkit';

export const USER = 'user';

const initState = {
  email:"",
  colour:"#3f89beff",
  pdfs: []
}

export const userSlice = createSlice({
  name: USER,
  initialState: initState,//Set the store to the initial state
  reducers: {
    setUser: (state,action) => {state = action.payload;return state},
    setEmail: (state,action) => {state.email = action.payload;return state},
    setColour: (state,action) => {state.colour = action.payload;return state},
    addDF: (state,action) => {state.pdfs.push(action.payload)},
    removePDF: (state,action) => {//remove the pdf that has the name provided in the action
      state.pdfs.forEach((item,index) => {
        if (item === action.payload) state.pdfs.splice(index,1)
      })
      return state;
    },
    clearUser: (state,action) => {state = initState}
  },
});

export const {actions, reducer} = userSlice

export const {setUser} = actions

//export default reducer

export const selectUser = (state: {}) => state
export const selectColour = (state:{colour:string}) => state.colour
export const selectEmail = (state:{email:string}) => state.email