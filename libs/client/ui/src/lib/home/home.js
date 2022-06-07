import React from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import PdfTile from '../shared-components/pdf-tile/pdf-tile.js';

export const Home = ({ navigation }) => {
  return (
    <View style={styles.home}>
      <View x="3.61% 27.5% 68.89%" y="0px minmax(0px, max-content) 0px" style={styles.big_title_box}>
        <Text style={styles.big_title} ellipsizeMode={'clip'}>
          {'Recents'}
        </Text>
      </View>
      <View x="0px 360fr 4px" y="0px minmax(0px, max-content) 0px" style={styles.recentPdfTiles}>
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
      <View x="4px 356fr 0px" y="27px minmax(0px, max-content) 0px" style={styles.viewAllTouchableOpacityFrame}>
        <TouchableOpacity
          x="23px 310fr 23px"
          y="0px minmax(0px, max-content) 0px"
          style={styles.viewAllTouchableOpacity}
          onPress={() =>
            navigation.navigate('ViewAll')}>
          <View
            x="103px minmax(0px, max-content) 98fr"
            y="10px minmax(0px, max-content) 10fr"
            style={styles.viewAllTouchableOpacityLabel_box}>
            <Text style={styles.viewAllTouchableOpacityLabel} ellipsizeMode={'clip'}>
              {'View all PDFs'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.homeDiv} />
      <TouchableOpacity
        x="27px 310fr 27px"
        y="25px minmax(0px, max-content) 0px"
        style={styles.settingsTouchableOpacity}
        onPress={() => navigation.navigate('Settings')}>
        <View
          x="0px 310fr 0px"
          y="0px minmax(0px, max-content) 0px"
          style={styles.settingsSpacing}>
          <View style={styles.settingsSpacing_item}>
            <ImageBackground
              style={styles.settingsIcon}
              source={require('../assets/settings.png')}
            />
          </View>
          <View style={styles.settingsSpacing_space} />
          <View style={styles.settingsSpacing_item1}>
            <View x="0px 66fr 121px" y="10px minmax(0px, max-content) 10px" style={styles.settingsText_box}>
              <Text style={styles.settingsText} ellipsizeMode={'clip'}>
                {'Settings'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View x="28.3% 43.96% 27.75%" y="38px minmax(0px, max-content) 11px" style={styles.audioTouchableOpacityGroup}>
        <View style={styles.audioTouchableOpacityGroup_item}>
          <TouchableOpacity
            x="0px 80fr 0px"
            y="0px minmax(0px, max-content) 0px"
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
            x="0px 80fr 0px"
            y="0px minmax(0px, max-content) 0px"
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
    marginTop: 0,
    marginBottom: 0,
    minHeight: 844,
    //flex: 1,
    flexShrink: 0,
    marginLeft: 0,
    flexGrow: 1,
    marginRight: 0,

   // marginTop: 38,
   // height: 768,
   // marginLeft: 13,
    //width: 364,
   // minWidth: 364
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
//    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  recentPdfTiles: {
    flexGrow: 5,
    //flex: 5
  },
  viewAllTouchableOpacityFrame: {
    //flex: 1,
    flexGrow: 1
  },
  viewAllTouchableOpacity: {
    width: '100%',
    flexGrow: 1,
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
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 24,
    fontSize: 20,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
    paddingHorizontal: 0,
    paddingVertical: 0,
    //flex: 1
  },
  viewAllTouchableOpacityLabel_box: {
    flexGrow: 1,
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
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
    marginTop: 26,
    height: 1,
    marginBottom: 0,
    marginLeft: 4,
    flexGrow: 1,
    marginRight: 4,
    //flex: 1
  },
  settingsTouchableOpacity: {
    width: '100%',
    flexGrow: 1,
    borderRadius: 8,
    //flex: 1
  },
  settingsSpacing: {
    flexGrow: 1,
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
    flexDirection: 'row'
  },
  settingsSpacing_item: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 39
  },
  settingsIcon: {
    resizeMode: 'contain',
    marginTop: 10,
    height: 24,
    marginBottom: 10,
    marginLeft: 10,
    width: 29,
    minWidth: 29,
    marginRight: 0
  },
  settingsSpacing_space: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 84
  },
  settingsSpacing_item1: {
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0
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
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  audioTouchableOpacityGroup: {
    flexGrow: 1,
    //flex: 1,
    borderRadius: 8,
    flexDirection: 'row'
  },
  audioTouchableOpacityGroup_item: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 80
  },
  recordAudioTouchableOpacity: {
    width: '100%',
    flexGrow: 1,
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
    flexGrow: 1,
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