/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useRef, useState } from 'react';
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

const Stack = createNativeStackNavigator();

export const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Welcome' }}/>
         <Stack.Screen name="ViewAll" component={ViewAll} />
      </Stack.Navigator>
    </NavigationContainer>
  )
  }
export default App;
