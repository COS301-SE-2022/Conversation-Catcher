import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql } from '@apollo/client';
// import { WebSocketLink } from '@apollo/client/link/ws';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectColour, clearUser } from '../../../../../../apps/client/src/app/slices/user.slice';
import auth from '@react-native-firebase/auth';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { clearPDFs } from '../../../../../../apps/client/src/app/slices/pdf.slice';

export const SettingsPage = ({ navigation }) => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const colourState = useSelector(selectColour);

  return (
    <View style={styles.settings}>
      <View style={styles.big_title_box}>
        <Text style={styles.big_title}>{'Settings'}</Text>
      </View>
      <View style={styles.settingsBody}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('ChangeEmail')}
        >
          <View style={styles.settingsButtonContent}>
            <View style={styles.iconContainer}>
              <Icon
                style={[styles.settingsButtonIcon, { color: colourState }]}
                name="envelope"
                size={18}
              />
            </View>
            <View style={styles.settingsButtonText_box}>
              <Text style={styles.settingsButtonText} ellipsizeMode={'clip'}>
                {'Change email'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.settingsButtonDivider} />

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}
        >
          <View style={styles.settingsButtonContent}>
            <View style={styles.iconContainer}>
              <Icon style={{ color: colourState }} name="lock" size={20} />
            </View>
            <View style={styles.settingsButtonText_box}>
              <Text style={styles.settingsButtonText}>{'Change password'}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.settingsButtonDivider} />

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Colour')}
        >
          <View style={styles.settingsButtonContent}>
            <View style={styles.iconContainer}>
              <Icon style={{ color: colourState }} name="sliders" size={20} />
            </View>
            <View style={styles.settingsButtonText_box}>
              <Text style={styles.settingsButtonText}>{'Change colour'}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.settingsButtonDivider} />

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() =>
            auth()
              .signOut()
              .then(() => {
                dispatch(clearUser());
                dispatch(clearPDFs());
                navigation.navigate('Login');
              }).catch((e)=>{
                console.log(e);
                dispatch(clearUser());
                dispatch(clearPDFs());
                navigation.navigate('Login');
              })
          }
        >
          <View style={styles.settingsButtonContent}>
            <View style={styles.iconContainer}>
              <Icon
                style={[styles.settingsButtonIcon, { color: colourState }]}
                name="sign-out"
                size={20}
              />
            </View>
            <View style={styles.settingsButtonText_box}>
              <Text style={styles.settingsButtonText}>{'Log out'}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="angle-left" color={colourState} size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default SettingsPage;

SettingsPage.inStorybook = true;
SettingsPage.fitScreen = false;
SettingsPage.scrollHeight = 844;

const styles = StyleSheet.create({
  settings: {
    backgroundColor: '#ffffffff',
    overflow: 'hidden',
    flexShrink: 0,
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  big_title: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 28,
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  big_title_box: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
    height: '10%',
    width: '100%',
    minHeight: 28,
  },
  settingsBody: {
    width: '85%',
    backgroundColor: '#f5f5f5ff',
    borderRadius: 7,
    flexDirection: 'column',
  },
  settingsButton: {
    flexGrow: 1,
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  settingsButtonContent: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //padding: 5
  },
  iconContainer: {
    width: '15%',
    height: '100%',
    alignItems: 'center',
  },
  settingsButtonText: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
  },
  settingsButtonText_box: {
    flexShrink: 1,
  },
  settingsButtonDivider: {
    backgroundColor: '#d0d5ddff',
    height: 1,
    width: '87%',
    alignSelf: 'center',
  },
  backButton: {
    width: '15%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
