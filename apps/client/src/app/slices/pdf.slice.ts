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
    }
  },
});

export const {actions, reducer} = pdfSlice

export const {addPDF, removePDF, clearPDFs} = actions

export const selectPDFS = (state:[]) => state