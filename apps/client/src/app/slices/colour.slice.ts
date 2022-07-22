import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { act } from '@testing-library/react-native';

export const COLOUR = 'colour';

/*
 * Update these interfaces according to your requirements.
 */
export interface ColourEntity {
  id: number;
}

export interface ColourState extends EntityState<ColourEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const colourAdapter = createEntityAdapter<ColourEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchColour())
 * }, [dispatch]);
 * ```
 */
// export const fetchColour = createAsyncThunk(
//   'colour/fetchStatus',
//   async (_, thunkAPI) => {
//     /**
//      * Replace this with your custom fetch call.
//      * For example, `return myApi.getColours()`;
//      * Right now we just return an empty array.
//      */
//     return Promise.resolve([]);
//   }
// );

// export const initialColourState: ColourState = colourAdapter.getInitialState({
//   loadingStatus: 'not loaded',
//   error: null,
// });

export const colourSlice = createSlice({//initial state with reducers
  name: COLOUR,
  initialState: {value:"#3F89BE"},
  reducers: {
    setColour: (state,action) => {state.value = action.payload}
  },
});

export const colourReducer = colourSlice.reducer;//Used in the main.tsx


//Add action creators

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(colourActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const colourActions = colourSlice.actions;

//Add selectors

//get current colour
export const selectColour = state => state.COLOUR.value

//Add subscribers