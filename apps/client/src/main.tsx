import { configureStore } from '@reduxjs/toolkit';
import { AppRegistry } from 'react-native';
import App from './app/App';
import { Provider } from 'react-redux';

const store = configureStore()

const RNRedux = () => (
    <Provider store = { store }>
        <App/>
    </Provider>
)

AppRegistry.registerComponent('Client', () => RNRedux);
