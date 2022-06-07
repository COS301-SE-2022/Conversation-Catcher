import React from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, Alert, Dimensions } from 'react-native';
import PdfTile from '../shared-components/pdf-tile/pdf-tile.js';

export const Home = ({ navigation }) => {
  return (
    <View style={styles.home}>
      <View style={styles.big_title_box}>
        <Text style={styles.big_title} ellipsizeMode={'clip'}>
          {'Recents'}
        </Text>
      </View>
      <View style={styles.recentPdfTiles}>
        <PdfTile 
          name = 'Bug introduction: a modification of code' 
          date = '1 May 2022, 9:37' 
          source = {"../assets/pdf-bug-intro.png"} 
          downloaded = {true}/>
        <PdfTile 
          name = 'Human-computer interaction' 
          date = '21 Apr 2022, 14:18' 
          source = {"../assets/pdf-human-computer.png"} 
          downloaded = {false}/>
        <PdfTile 
          name = 'The tropical plants of the Philippines' 
          date = '13 Apr 2022, 11:53' 
          source = {"../assets/pdf-tropical-plants.png"} 
          downloaded = {true}/>
      </View>
      <View style={styles.viewAllTouchableOpacityFrame}>
        <TouchableOpacity
          style={styles.viewAllTouchableOpacity}
          onPress={() =>
            navigation.navigate('ViewAll')}>
          <View
            style={styles.viewAllTouchableOpacityLabel_box}>
            <Text style={styles.viewAllTouchableOpacityLabel} ellipsizeMode={'clip'}>
              {'View all PDFs'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.homeDiv} />
      <TouchableOpacity
        style={styles.settingsTouchableOpacity}
        onPress={() => navigation.navigate('Settings')}>
        <View
          style={styles.settingsSpacing}>
          <View style={styles.settingsSpacing_item}>
            <ImageBackground
              style={styles.settingsIcon}
              source={require('../assets/settings.png')}
            />
          </View>
          <View style={styles.settingsText_box}>
            <Text style={styles.settingsText} ellipsizeMode={'clip'}>
              {'Settings'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.audioTouchableOpacityGroup}>
        <View style={styles.audioTouchableOpacityGroup_item}>
          <TouchableOpacity
            style={styles.recordAudioTouchableOpacity}
            onPress={() => Alert.alert('click')}>
            <ImageBackground
              style={styles.recordAudioIcon}
              source={require('../assets/mic.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.audioTouchableOpacityGroup_item}>
          <TouchableOpacity
            style={styles.uploadAudioTouchableOpacity}
            onPress={() => Alert.alert('click')}>
            <ImageBackground
              style={styles.audioTouchableOpacityGroupDiv}
              source={require('../assets/verticalLine.png')}
            />
            <ImageBackground
              style={styles.uploadAudioIcon}
              source={require('../assets/upload.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default Home;

Home.inStorybook = true;
Home.fitScreen = false;
Home.scrollHeight = 844;

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#ffffffff',
    overflow: 'hidden',
    flexGrow: 1,
    //flex: 1,
    //flexShrink: 0,
    flexDirection: 'column',
    //width: Dimensions.get('window').width,
    //height: Dimensions.get('window').height,
    justifyContent: 'space-between',
  },
  big_title: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 30,
    fontSize: 30,
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  big_title_box: {
    flexGrow: 1,
    alignItems: 'flex-start',
    paddingTop: 5,
    paddingLeft: 7
  },
  recentPdfTiles: {
    flexGrow: 5,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-between'
  },
  viewAllTouchableOpacityFrame: {
    flexGrow: 1,
  },
  viewAllTouchableOpacity: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: "#3F89BE",
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: '#3f89beff',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1
    }
  },
  viewAllTouchableOpacityLabel: {
    color: '#ffffffff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 24,
    fontSize: 20,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
    padding: 10,
  },
  viewAllTouchableOpacityLabel_box: {
    //flexGrow: 1,
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeDiv: {
    backgroundColor: '#d0d5ddff',
    borderRadius: 0.5,
    overflow: 'hidden' /* for borderRadius */,
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1
    },
    height: 1,
    margin: 10,
    flexShrink: 1
  },
  settingsTouchableOpacity: {
    width: '100%',
    borderRadius: 8,
    flexGrow: 1
  },
  settingsSpacing: {
    //flex: 1,
    backgroundColor: '#9bcbedff',
    borderRadius: 8,
    overflow: 'hidden',
    borderStyle: 'solid',
    borderColor: '#9bcbedff',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1
    },
    //flexDirection: 'row'
  },
  settingsSpacing_item: {
    //flexGrow: 0,
    //flexShrink: 1,
    //flexBasis: 39
  },
  settingsIcon: {
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 0
  },
  settingsSpacing_space: {
    //flexGrow: 0,
    //flexShrink: 1,
    //flexBasis: 84
  },
  settingsText: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 24,
    fontSize: 20,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  settingsText_box: {
    //flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  audioTouchableOpacityGroup: {
    flexGrow: 1,
    borderRadius: 8,
    flexDirection: 'row'
  },
  audioTouchableOpacityGroup_item: {
    //flexGrow: 1,
    //flexShrink: 1,
    //flexBasis: 80
  },
  recordAudioTouchableOpacity: {
    width: '100%',
    //flexGrow: 1,
    backgroundColor: '#d0d5ddff',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000000',
    shadowRadius: 1.810810810810811,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 1
    }
  },
  recordAudioIcon: {
    resizeMode: 'contain',
    marginTop: 20,
    height: 40,
    marginBottom: 20,
    marginLeft: 27,
    width: 26,
    minWidth: 26,
    marginRight: 27
  },
  uploadAudioTouchableOpacity: {
    width: '100%',
    //flexGrow: 1,
    backgroundColor: '#d0d5ddff',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000000',
    shadowRadius: 1.810810810810811,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 1
    }
  },
  audioTouchableOpacityGroupDiv: {
    resizeMode: 'contain',
    borderStyle: 'solid',
    borderColor: '#667085ff',
    position: 'absolute',
    top: -10,
    height: 100,
    left: -10,
    width: 21
  },
  uploadAudioIcon: {
    resizeMode: 'contain',
    marginTop: 22,
    height: 36,
    marginBottom: 22,
    marginLeft: 22,
    width: 36,
    minWidth: 36,
    marginRight: 22
  }
});