import React, { useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Loading from '../loading/loading';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  selectUser,
} from '../../../../../../../apps/client/src/app/slices/user.slice';
import { useSelector } from 'react-redux';

export const Splash = ({navigation}) => {
  const userPresent = useSelector(selectUser);
  useEffect(() => {
    if (userPresent.email !== '') {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Login');
    }
  });
  return (
    <View style={styles.splashScreen}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Conversation Catcher</Text>
      </View>
      <View style={styles.icon}>
        <Image
          style={styles.logo}
          source={'../../assets/LOGO.jpg'}
        />
      </View>
      <View style={styles.load}>
        <Loading  width={100} height={100} load={true} text={"Loading"}/>
      </View>
    </View>
  );
}
export default Splash;

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,

  },
  title: {
    alignContent: "center",
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#3f89beff',
    fontSize: 30,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 2,

  },
  icon: {

  },
  logo: {
    flexGrow: 1,
    resizeMode: 'center',
    borderRadius: 180,
  },
  load: {

  }
});