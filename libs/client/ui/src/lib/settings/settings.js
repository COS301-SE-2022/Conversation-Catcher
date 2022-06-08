import React from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Alert} from 'react-native';

export const SettingsPage = ({ navigation }) => {
  return (
    <View style={styles.settings}>
      < View style={styles.big_title_box}>
        <Text style={styles.big_title}>
          {'Settings'}
        </Text>
      </ View>
      < View style={styles.settingsBody}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => Alert.alert('click')}>
          <View style={styles.settingsButtonContent}>
            <ImageBackground
              style={styles.settingsButtonIcon}
              //source={require('../assets/mail.png')}
            />
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
          onPress={() => Alert.alert('click')}>
          <View style={styles.settingsButtonContent}>
            <ImageBackground
              style={styles.settingsButtonIcon}
              //source={require('../assets/lock.png')}
            />
            <View style={styles.settingsButtonText_box}>
              <Text style={styles.settingsButtonText}>
                {'Change password'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.settingsButtonDivider} /> 

        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Colour')}>
          <View style={styles.settingsButtonContent}>
            <ImageBackground
              style={styles.settingsButtonIcon}
              //source={require('../assets/change-colour.png')}
            />
            <View style={styles.settingsButtonText_box}>
              <Text style={styles.settingsButtonText}>
                {'Change colour'}
              </Text>
            </View>
          </View> 
        </TouchableOpacity>

        <View style={styles.settingsButtonDivider} /> 

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Login')}>
          <View style={styles.settingsButtonContent}>
            <ImageBackground
              style={styles.settingsButtonIcon}
              //source={require('../assets/on-device.png')}
            />
            <View style={styles.settingsButtonText_box}>
              <Text style={styles.settingsButtonText}>
                {'Log out'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View> 

      <TouchableOpacity  
        style={styles.settingsBody_item} 
        onPress={() => navigation.navigate('Home')}>
        <ImageBackground
          style={styles.backButton}
          //source={require('../assets/back-arrow.png')}
        />
      </TouchableOpacity >
    </ View>
  );
}

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
    alignItems: 'center'
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
    paddingVertical: 0
  },
  big_title_box: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
    height: '7%',
    width: '100%',
    minHeight: 28
  },
  settingsBody: {
    flexShrink: 1,
    width: '85%',
    backgroundColor: '#f5f5f5ff',
    borderRadius: 7,
    flexDirection: 'column'
  },
  settingsButton: {
    flexGrow: 1,
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  settingsButtonContent: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  settingsButtonIcon: {
    resizeMode: 'contain',
    height: 24,
    width: 24
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
    flexShrink: 1
  },
  settingsButtonDivider: {
    backgroundColor: '#d0d5ddff',
    height: 1,
    width: '87%',
    alignSelf: 'center'
  },
  backButton: {
    //resizeMode: 'contain',
    resizeMode: 'cover',
    height: 18,
    marginBottom: 0,
    //marginLeft: 'auto',
    //marginRight: 'auto',
    //flexShrink: 1
    //flex: 1
  },
});
