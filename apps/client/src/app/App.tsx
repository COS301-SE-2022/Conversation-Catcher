/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useRef, useState, useEffect } from 'react';
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
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const Stack = createNativeStackNavigator();

export const App = () => {

  const client = new ApolloClient({
    uri: 'http://10.0.2.2:3333/graphql',
    headers: {
      // Header(if any)
      // authorization: 'a1b2c3d4-a1b2-a1b2c3d4e5f6',
    },
    cache: new InMemoryCache(),
    // link WebSocketLink subscription
    // link: wsLink,
  });

  return (
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
      </Stack.Navigator>
    </NavigationContainer>
    </ApolloProvider>
  )
  }
export default App;
