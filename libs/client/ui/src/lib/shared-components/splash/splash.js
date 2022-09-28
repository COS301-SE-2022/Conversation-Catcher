import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Loading from '../loading/loading';
import {
  selectUser,
} from '../../../../../../../apps/client/src/app/slices/user.slice';
import { useDispatch, useSelector } from 'react-redux';

export const Splash = ({navigation}) => {
  const userPresent = useSelector(selectUser);
  useEffect(() => {
    if (userPresent.email !== '') {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Login')
    }
  });
  return (
    <View>
      <Text>Welcome to Splash!</Text>
    </View>
  );
}
export default Splash;
