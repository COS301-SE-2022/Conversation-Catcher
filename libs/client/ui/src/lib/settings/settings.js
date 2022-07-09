import React from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colour from '../colour/colour';

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
          onPress={() => navigation.navigate('ChangeEmail')}>
          <View style={styles.settingsButtonContent}>
            <View style={styles.iconContainer}>
              <Icon 
                style={[styles.settingsButtonIcon, {color : colour.state}]}
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
            <View style={styles.iconContainer}>
              <Icon 
                style={{color : colour.state}}
                name="sliders"
                size={20}
              />
            </View>
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
            <View style={styles.iconContainer}>
              <Icon 
                style={[styles.settingsButtonIcon, {color : colour.state}]}
                name="sign-out"
                size={20}
              />
            </View>
            <View style={styles.settingsButtonText_box}>
              <Text style={styles.settingsButtonText}>
                {'Log out'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View> 

      <TouchableOpacity  
        style={styles.backButton} 
        onPress={() => navigation.goBack()}>
          <Icon 
            name="angle-left"
            color={colour.state}
            size={28}
          />
      </TouchableOpacity>
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
    alignItems: 'center',
    flexDirection: 'column'
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
    height: '10%',
    width: '100%',
    minHeight: 28
  },
  settingsBody: {
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
    //padding: 5
  },
  iconContainer: {
    width: '15%',
    height: '100%',
    alignItems: 'center'
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
    width: '15%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  }
});
