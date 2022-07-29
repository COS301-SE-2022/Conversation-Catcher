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
import Settings from '../../../../libs/client/ui/src/lib/settings/settings.js';
import ChangeColour from '../../../../libs/client/ui/src/lib/colour-page/colour-page.js';
import Login from '../../../../libs/client/ui/src/lib/login/login.js';
import Register from '../../../../libs/client/ui/src/lib/register/register.js';
import PdfView from '../../../../libs/client/ui/src/lib/shared-components/pdf-view/pdf-view.js';
import ForgotPassword from '../../../../libs/client/ui/src/lib/forgot-password/forgot-password.js';
import ChangePassword from '../../../../libs/client/ui/src/lib/change-password/change-password.js';
import ChangeEmail from '../../../../libs/client/ui/src/lib/change-email/change-email.js';
import { Provider } from 'react-redux';
import {reducer as colourReducer} from './slices/colour.slice';
import {reducer as emailReducer} from './slices/email.slice';
import {reducer as pdfReducer} from './slices/pdf.slice';
import { configureStore } from '@reduxjs/toolkit';

//configure the store
const store = configureStore({
    reducer: {
        colour:colourReducer,
        email:emailReducer,
        pdf:pdfReducer
    }
})

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
  
  return (
    <Provider store = { store }>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}/>
            <Stack.Screen name="ViewAll" component={ViewAll}/>
            <Stack.Screen name="Settings" component={Settings}/>
            <Stack.Screen name="Colour" component={ChangeColour}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="PdfView" component={PdfView}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
            <Stack.Screen name="ChangePassword" component={ChangePassword}/>
            <Stack.Screen name="ChangeEmail" component={ChangeEmail}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  )
  }
export default App;
