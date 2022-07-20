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
import colour from '../colour/colour';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql } from '@apollo/client';
// import { WebSocketLink } from '@apollo/client/link/ws';


export const SettingsPage = ({ navigation }) => {
  const [user, setUser] = useState({});

  // // Connection for the subscription
  // const wsLink = new WebSocketLink({
  //   uri: `ws://localhost:3333/graphql`,
  //   options: {
  //     reconnect: true,
  //   },
  // });
  // // Initialize Apollo Client
  // const client = new ApolloClient({
  //   uri: 'http://localhost:3333/graphql',
  //   headers: {
  //     // Header(if any)
  //     authorization: 'a1b2c3d4-a1b2-a1b2c3d4e5f6',
  //   },
  //   cache: new InMemoryCache(),
  //   // link WebSocketLink subscription
  //   link: wsLink,
  // });

  // const simpleQuery = async () => {
  //   // Calling Simple Graph Query
  //   const { data, error } = await client.query({
  //     query: gql`
  //       query {
  //         getAllPdfs
  //       }
  //     `,
  //   });
  //   console.log('simpleQuery called again!');
  //   // In case Error in Response
  //   if (error) {
  //     alert(`error + ${JSON.stringify(error)}`);
  //     console.log('error', JSON.stringify(error));
  //     return;
  //   }
  //   alert(`Got Record of ${data.users.length} Users`);
  //   console.log('data', JSON.stringify(data));
  // };

  return (
    // <ApolloProvider client={client}>
    <View style={styles.settings}>
      <View style={styles.big_title_box}>
        <Text style={styles.big_title}>{'Settings'}</Text>
      </View>
      <View style={styles.settingsBody}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('ChangeEmail')}>
          <View style={styles.settingsButtonContent}>
            <View style={styles.iconContainer}>
              <Icon
                style={[styles.settingsButtonIcon, { color: colour.state }]}
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
          onPress={() => navigation.navigate('ChangePassword')}>
          <View style={styles.settingsButtonContent}>
            <View style={styles.iconContainer}>
              <Icon 
                style={{color : colour.state}}
                name="lock"
                size={20}
              />
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
              <Icon 
                style={{color : colour.state}}
                name="sliders"
                size={20}
              />
            </View>
            <View style={styles.settingsButtonText_box}>
              <Text style={styles.settingsButtonText}>{'Change colour'}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.settingsButtonDivider} />

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Login')}
        >
          <View style={styles.settingsButtonContent}>
            <View style={styles.iconContainer}>
              <Icon
                style={[styles.settingsButtonIcon, { color: colour.state }]}
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
        onPress={() => navigation.navigate('Home')}>
          <Icon 
            name="angle-left"
            color={colour.state}
            size={28}
          />
      </TouchableOpacity>
    </ View>
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
