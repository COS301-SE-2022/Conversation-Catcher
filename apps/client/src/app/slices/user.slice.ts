import {
  createSlice,
} from '@reduxjs/toolkit';

export const USER = 'user';

const initState = {
  email:"",
  colour:{},
  pdfs: []
};

export const userSlice = createSlice({
  name: USER,
  initialState: initState,//Set the store to the initial state
  reducers: {
    setUser: (state,action) => {state = action.payload;return state},         //set the state to the action's payload
    setEmail: (state,action) => {state.email = action.payload;return state},  //set the email to the action's payload
    setColour: (state,action) => {state.colour = action.payload;return state},//set the colour to the action's payload
    addPDF: (state,action) => {state.pdfs.push(action.payload);return state;},              //add pdf to user
    removePDF: (state,action) => {                                            //remove the pdf that has the name provided in the action
      state.pdfs.forEach((item,index) => {
        if (item === action.payload) state.pdfs.splice(index,1)
      })
      return state;
    },
    clearUser: (state,action) => {
      state = initState;
      return state;
    },                                                                         //reset the store back to its default
  },
});

export const {actions, reducer} = userSlice;

export const {setUser,setEmail,setColour,addPDF,removePDF,clearUser} = actions;

//export default reducer

export const selectUser = (state) => state.user;
export const selectColour = (state) => state.user.colour;
export const selectEmail = (state) => state.user.email;
export const selectPDFs = (state) => state.user.pdfs;