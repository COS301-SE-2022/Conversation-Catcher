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
    setUser: (state,action) => {state = action.payload;return state},         //set the state to the action's payload
    setEmail: (state,action) => {state.email = action.payload;return state},  //set the email to the action's payload
    setColour: (state,action) => {state.colour = action.payload;return state},//set the colour to the action's payload
    addPDF: (state,action) => {state.pdfs.push(action.payload)},              //add pdf to user
    removePDF: (state,action) => {                                            //remove the pdf that has the name provided in the action
      state.pdfs.forEach((item,index) => {
        if (item === action.payload) state.pdfs.splice(index,1)
      })
      return state;
    },
    clearUser: (state,action) => {state = initState}                          //reset the store back to its default
  },
});

export const {actions, reducer} = userSlice

export const {setUser} = actions

//export default reducer

export const selectUser = (state: {email:string,colour:string,pdfs:[]}) => state
export const selectColour = (state:{email:string,colour:string,pdfs:[]}) => state.colour
export const selectEmail = (state:{email:string,colour:string,pdfs:[]}) => state.email
export const selectPDFs = (state:{email:string,colour:string,pdfs:[]}) => state.pdfs