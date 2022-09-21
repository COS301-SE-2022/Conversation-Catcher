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
        if (item.id === action.payload.id) state.splice(index,1)
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
    toggleDown: (state,action) => {
      let notIn = true;
      state.forEach((item,index) => {
        if (item.id === action.payload.id){
          state.splice(index,1);
          notIn = false;
        }
      })
      if (notIn) {
        state.push({...action.payload,downloaded:{notIn}});
      };
      return state;
    },
    changeName: (state,action) => {
      state.forEach((item,index) => {
        if (item.id === action.payload.id){
          state[index].name = action.payload.name;
        }
      })
      return state;
    }
  },
});

export const {actions, reducer} = groupSlice;

export const {addGroup, removeGroup, clearGroups, refillGroups, toggleDown, changeName} = actions;

export const selectGroups = (state) => state.group;