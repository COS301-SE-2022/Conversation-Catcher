import { configureStore } from '@reduxjs/toolkit';
import { AppRegistry } from 'react-native';
import App from './app/App';
import { Provider } from 'react-redux';
import { colourReducer } from './app/slices/colour.slice';

//configure the store with the colourReducer
const store = configureStore({reducer: colourReducer})

//Package the app within provider with the store parameter
const RNRedux = () => (
    <Provider store = { store }>
        <App/>
    </Provider>
)

AppRegistry.registerComponent('Client', () => RNRedux);
