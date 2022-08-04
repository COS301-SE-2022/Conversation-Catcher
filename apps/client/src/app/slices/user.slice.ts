import {
  createSlice,
} from '@reduxjs/toolkit';

export const USER = 'user';

export const userSlice = createSlice({
  name: USER,
  initialState: {
    email:"",
    colour:""
  },
  reducers: {
    setUser: (state,action) => {state = action.payload;return state},
    setEmail: (state,action) => {state.email = action.payload;return state},
  },
});

export const {actions, reducer} = userSlice

export const {setUser} = actions

//export default reducer

export const selectUser = (state: {}) => state
export const selectUserColour = (state:{colour:string}) => state.colour
export const selectEmail = (state:{email:string}) => state.email