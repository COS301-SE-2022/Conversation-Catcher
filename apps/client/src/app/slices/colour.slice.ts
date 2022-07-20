import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { YellowBox } from 'react-native';

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
    salmon:state => {state.value = "#ff987e"},
    blue:state => {state.value = "#66a8d6"},
    purple:state => {state.value = "#cab6f4"},
    yellow:state => {state.value = "#ffd1a7"},
    green:state => {state.value = "#71d86d"}
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

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllColour);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = colourAdapter.getSelectors();

export const getColourState = (rootState: unknown): ColourState =>
  rootState[COLOUR];

export const selectAllColour = createSelector(getColourState, selectAll);

export const selectColourEntities = createSelector(
  getColourState,
  selectEntities
);

//Add subscribers