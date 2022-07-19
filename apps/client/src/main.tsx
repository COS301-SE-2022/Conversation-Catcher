import { configureStore } from '@reduxjs/toolkit';
import { AppRegistry } from 'react-native';
import App from './app/App';
import { Provider } from 'react-redux';
import { colourReducer } from './app/slices/colour.slice';

const store = configureStore({reducer: colourReducer})

const RNRedux = () => (
    <Provider store = { store }>
        <App/>
    </Provider>
)

AppRegistry.registerComponent('Client', () => RNRedux);
