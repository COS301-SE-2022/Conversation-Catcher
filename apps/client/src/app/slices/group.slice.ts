import {
  createSlice,
} from '@reduxjs/toolkit';

export const Group = 'group';

export const groupSlice = createSlice({
  name: Group,
  initialState: [],
  reducers: {
    addGroup: (state,action) => {
      state.push(action.payload);
      return state;
    },
    removeGroup: (state,action) => {
      state.forEach((item,index) => {
        if (item.name === action.payload.name) state.splice(index,1)
      })
      return state;
    },
    clearGroups: (state,action) => {
      state = [];
      return state;
    },
    refillGroups: (state,action) => {
      state = action.payload;
      return state;
    },
    changeName: (state,action) => {
      state.forEach((item,index) => {
        if (item.name === action.payload.name){
          state[index].name = action.payload.name;
        }
      })
      return state;
    },
    changeDesc: (state,action) => {
      state.forEach((item,index) => {
        if (item.name === action.payload.name){
          state[index].description = action.payload.description;
        }
      })
      return state;
    },
  },
});

export const {actions, reducer} = groupSlice;

export const {addGroup, removeGroup, clearGroups, refillGroups, changeName, changeDesc} = actions;

export const selectGroups = (state) => state.group;