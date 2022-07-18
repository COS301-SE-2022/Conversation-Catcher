import { fetchColour, colourAdapter, colourReducer } from './colour.slice';

describe('colour reducer', () => {
  it('should handle initial state', () => {
    const expected = colourAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(colourReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchColours', () => {
    let state = colourReducer(undefined, fetchColour.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = colourReducer(
      state,
      fetchColour.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = colourReducer(
      state,
      fetchColour.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
