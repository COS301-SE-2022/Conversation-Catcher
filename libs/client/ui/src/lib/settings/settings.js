import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  DeviceEventEmitter,
  NativeAppEventEmitter,
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
import pdfLocalAccess from '../shared-components/local-pdfs-access/local-pdfs-access';
import groupLocalAccess from '../shared-components/local-groups-access/local-groups-access';

export const SettingsPage = ({ navigation }) => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const colourState = useSelector(selectColour);

  return (
    <SafeAreaView style={[styles.settings, {backgroundColor: colourState.mode}]}>
      <View style={styles.big_title_box}>
        <Text style={[styles.big_title, {color: colourState.top}]}>{'Settings'}</Text>
      </View>
      <View style={[styles.settingsBody, {backgroundColor: colourState.bottom}]}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('ChangeEmail')}
        >
          <View style={styles.settingsButtonContent}>
            <View style={styles.iconContainer}>
              <Icon
                style={[styles.settingsButtonIcon, { color: colourState.accent }]}
                name="envelope"
                size={18}
              />
            </View>
            <View style={styles.settingsButtonText_box}>
              <Text style={[styles.settingsButtonText, {color: colourState.top}]} ellipsizeMode={'clip'}>
                {'Change email'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={[styles.settingsButtonDivider, {color: colourState.low}]} />

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}
        >
          <View style={styles.settingsButtonContent}>
            <View style={styles.iconContainer}>
              <Icon style={{ color: colourState.accent }} name="lock" size={20} />
            </View>
            <View style={styles.settingsButtonText_box}>
              <Text style={[styles.settingsButtonText, {color: colourState.top}]}>{'Change password'}</Text>
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
              <Icon style={{ color: colourState.accent }} name="sliders" size={20} />
            </View>
            <View style={styles.settingsButtonText_box}>
              <Text style={[styles.settingsButtonText, {color: colourState.top}]}>{'Change colour'}</Text>
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
                pdfLocalAccess.clearPdfs();
                groupLocalAccess.clearGroups();
                NativeAppEventEmitter.emit('logout');
                navigation.navigate('Login');
              }).catch((e)=>{
                console.log("not logged in:")
                console.log(e);
                dispatch(clearUser());
                dispatch(clearPDFs());
                NativeAppEventEmitter.emit('logout');
                pdfLocalAccess.clearPdfs();
                groupLocalAccess.clearGroups();
                navigation.navigate('Login');
              })
          }
        >
          <View style={styles.settingsButtonContent}>
            <View style={styles.iconContainer}>
              <Icon
                style={[styles.settingsButtonIcon, { color: colourState.accent }]}
                name="sign-out"
                size={20}
              />
            </View>
            <View style={styles.settingsButtonText_box}>
              <Text style={[styles.settingsButtonText, {color: colourState.top}]}>{'Log out'}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="angle-left" color={colourState.accent} size={28} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SettingsPage;

SettingsPage.inStorybook = true;
SettingsPage.fitScreen = false;
SettingsPage.scrollHeight = 844;

const styles = StyleSheet.create({
  settings: {
    overflow: 'hidden',
    flexShrink: 0,
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  big_title: {
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
