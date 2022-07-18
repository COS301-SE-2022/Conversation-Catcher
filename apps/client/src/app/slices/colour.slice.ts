import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const COLOUR_FEATURE_KEY = 'colour';

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
export const fetchColour = createAsyncThunk(
  'colour/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getColours()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialColourState: ColourState = colourAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const colourSlice = createSlice({
  name: COLOUR_FEATURE_KEY,
  initialState: initialColourState,
  reducers: {
    add: colourAdapter.addOne,
    remove: colourAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColour.pending, (state: ColourState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchColour.fulfilled,
        (state: ColourState, action: PayloadAction<ColourEntity[]>) => {
          colourAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchColour.rejected, (state: ColourState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const colourReducer = colourSlice.reducer;

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
  rootState[COLOUR_FEATURE_KEY];

export const selectAllColour = createSelector(getColourState, selectAll);

export const selectColourEntities = createSelector(
  getColourState,
  selectEntities
);
