import {
  createSlice,
} from '@reduxjs/toolkit';
import { act } from '@testing-library/react-native';

export const USER = 'user';

export const userSlice = createSlice({
  name: USER,
  initialState: {},
  reducers: {
    setUser: (state,action) => {state = action.payload;return state}
  },
});

export const {actions, reducer} = userSlice

export const {setUser} = actions

//export default reducer

export const selectUser = (state: {}) => state