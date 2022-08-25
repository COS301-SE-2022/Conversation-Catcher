import {
  createSlice,
} from '@reduxjs/toolkit';

export const PDF = 'pdf';

export const pdfSlice = createSlice({
  name: PDF,
  initialState: [],
  reducers: {
    addPDF: (state,action) => {
      state.push(action.payload);
      return state;
    },
    removePDF: (state,action) => {
      state.forEach((item,index) => {
        if (item === action.payload) state.splice(index,1)
      })
      return state;
    },
    clearPDFs: (state,action) => {
      state = [];
      return state;
    },
    refillPDFs: (state,action) => {
      state = action.payload;
      return state;
    },
    toggleDown: (state,action) => {
      var notIn = true;
      state.forEach((item,index) => {
        if (item.id === action.payload.id){
          state.splice(index,1);
          notIn = false;
        }
      })
      if (notIn) {
        state.push({...action.payload,downloaded:{notIn}});
      }
  }},
});

export const {actions, reducer} = pdfSlice

export const {addPDF, removePDF, clearPDFs, refillPDFs, toggleDown} = actions

export const selectPDFS = (state) => state.pdf