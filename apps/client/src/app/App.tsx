/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useRef, useState, useEffect } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { ViewAll, Home} from '@conversation-catcher/client/ui';
import Home from '../../../../libs/client/ui/src/lib/home/home.js';
import ViewAll from '../../../../libs/client/ui/src/lib/view-all/view-all.js';
import Groups from '../../../../libs/client/ui/src/lib/groups/groups.js';
import GroupInfo from '../../../../libs/client/ui/src/lib/group-info/group-info.js';
import Settings from '../../../../libs/client/ui/src/lib/settings/settings.js';
import ChangeColour from '../../../../libs/client/ui/src/lib/colour-page/colour-page.js';
import Login from '../../../../libs/client/ui/src/lib/login/login.js';
import Register from '../../../../libs/client/ui/src/lib/register/register.js';
import PdfView from '../../../../libs/client/ui/src/lib/shared-components/pdf-view/pdf-view.js';
import ForgotPassword from '../../../../libs/client/ui/src/lib/forgot-password/forgot-password.js';
import ChangePassword from '../../../../libs/client/ui/src/lib/change-password/change-password.js';
import ChangeEmail from '../../../../libs/client/ui/src/lib/change-email/change-email.js';
import { Provider } from 'react-redux';
import {reducer as userReducer} from './slices/user.slice';
import {reducer as pdfReducer} from './slices/pdf.slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

//configure local storage
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
//Combine reducers
const rootReducer = combineReducers({
  pdf:pdfReducer,
  user:userReducer
});
//Add reducer to persist
const persistedReducer = persistReducer(persistConfig, rootReducer);
//configure the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: false
    })
});
//Initialize persistor with store
export const persistor = persistStore(store);
//Create stack navigator
const Stack = createNativeStackNavigator();

export const App = () => {
    const client = new ApolloClient({
    uri: 'http://10.0.2.2:3333/graphql',
    // headers: {
    //   // Header(if any)
    //   // authorization: 'a1b2c3d4-a1b2-a1b2c3d4e5f6',
    // },
    cache: new InMemoryCache(),
    // link WebSocketLink subscription
    // link: wsLink,
  });
  //Returns the complete project including wrappers for persistence, redux, navigation and API requests
  return (
    <Provider store = { store }>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
              <Stack.Screen name="ViewAll" component={ViewAll} options={{ headerShown: false }}/>
              <Stack.Screen name="Groups" component={Groups} options={{ headerShown: false }}/>
              <Stack.Screen name="GroupInfo" component={GroupInfo} options={{ headerShown: false }}/>
              <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
              <Stack.Screen name="Colour" component={ChangeColour} options={{ headerShown: false }}/>
              <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
              <Stack.Screen name="PdfView" component={PdfView} options={{ headerShown: false }}/>
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
              <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }}/>
              <Stack.Screen name="ChangeEmail" component={ChangeEmail} options={{ headerShown: false }}/>
            </Stack.Navigator>
          </NavigationContainer>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  )
  };
export default App;
