import React, {useState} from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import PdfTile from '../shared-components/pdf-tile/pdf-tile.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

export const Home = ({ navigation }) => {
  const [recordingStopVisible, setRecordingStopVisible] = useState(false);
  const [recordAudioState, setRecordAudioState] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);

  function RecordAudioButtonState(props){
    if (recordAudioState) {
      return <TouchableOpacity
              style={[styles.recordAudioTouchableOpacity, styles.recordAudioTouchableOpacityTrue]}
              
              onPress={() => {
                setRecordingStopVisible(true)
              }}>
              <View style={styles.recordAudioIcon}>
                <Icon 
                  color="#ffffffff"
                  name="stop"
                  size={40}
                />
              </View>
            </TouchableOpacity>;
    }
    return <TouchableOpacity
              style={[styles.recordAudioTouchableOpacity, styles.recordAudioTouchableOpacityFalse]}
              onPress={() => {
                setRecordAudioState(true)
              }}>
              <View style={styles.recordAudioIcon}>
                <Icon 
                  color="#667084ff"
                  name="microphone"
                  size={40}
                />
              </View>
            </TouchableOpacity>;
  }

  function UploadAudioCenter(props){
    if (fileSelected) {
      return <TouchableOpacity
              style={styles.changeUploadModalButton}
              onPress={() => Alert.alert('hiii')}>
              <Icon 
                style={styles.uploadModalButtonIcon}
                name="file-sound-o"
                size={16}
              />
              <Text style={styles.changeUploadModalButtonText}>
                {'fine name here'}
              </Text>
            </TouchableOpacity>
    }
    return <TouchableOpacity
            style={styles.uploadModalButton}
            onPress={() => setFileSelected(true)}>
            <View style={styles.uploadModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon 
                  style={styles.uploadModalButtonIcon}
                  name="file-sound-o"
                  size={40}
                />
              </View>
            </View>   
          </TouchableOpacity>
  }

  return (
    <View style={styles.home}>
      <View style={styles.big_title_box}>
        <Text style={styles.big_title} ellipsizeMode={'clip'}>
          {'Recents'}
        </Text>
      </View>
      <View style={styles.recentPdfTiles}>
        <PdfTile 
          id = {1}
          name = 'Bug introduction: a modification of code' 
          date = '1 May 2022, 9:37' 
          source = {require('../assets/pdf-bug-intro.png')} 
          RecordAudioed = {true}
          showCheck = {false}
          navigation = {navigation}/>
        <PdfTile 
          id = {2}
          name = 'Human-computer interaction' 
          date = '21 Apr 2022, 14:18' 
          source = {require('../assets/pdf-human-computer.png')} 
          RecordAudioed = {false}
          showCheck = {false}
          navigation = {navigation}/>
        <PdfTile 
          id = {3}
          name = 'The tropical plants of the Philippines' 
          date = '13 Apr 2022, 11:53' 
          source = {require('../assets/pdf-tropical-plants.png')} 
          RecordAudioed = {true}
          showCheck = {false}
          navigation = {navigation}/>
      </View>
      <View style={styles.viewAllTouchableOpacityFrame}>
        <TouchableOpacity
          style={styles.viewAllTouchableOpacity}
          onPress={() => navigation.navigate('ViewAll')}>
          <View
            style={styles.viewAllTouchableOpacityLabel_box}>
            <Text style={styles.viewAllTouchableOpacityLabel} ellipsizeMode={'clip'}>
              {'View all PDFs'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.settingsTouchableOpacityFrame}
        onPress={() => navigation.navigate('Settings')}>
        <View
          style={styles.settingTouchableOpacity}>
          <View style={styles.settingsText_box}>
            <Text style={styles.settingsText} ellipsizeMode={'clip'}>
              {'Settings'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.audioTouchableOpacityGroup}>
        <RecordAudioButtonState
        />
        <TouchableOpacity
          style={styles.uploadAudioTouchableOpacity}
          onPress={() => setUploadVisible(true)}>
          <View style={styles.uploadAudioIcon}>
            <Icon 
              color="#667084ff"
              name="upload"
              size={40}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        style={styles.modal}
        isVisible={recordingStopVisible}
        hasBackdrop={true}
        backdropColor='white'
        onBackdropPress={() => setRecordingStopVisible(false)}
      >
        <View style={styles.recordingStopModalInner}>
          <Text style={styles.modalTitle}>
            {'Recording has been stopped'}
          </Text>

          <View style={styles.recordingStopModalButtonDivider} /> 

          <TouchableOpacity
            style={styles.recordingStopModalButton}
            onPress={() => {
              setRecordAudioState(false)
              setRecordingStopVisible(false)
            }}>
            <View style={styles.recordingStopModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon 
                  style={styles.recordingStopModalButtonIcon}
                  name="refresh"
                  size={18}
                />
              </View>
              <View style={styles.recordingStopModalButtonText_box}>
                <Text style={styles.recordingStopModalButtonText} ellipsizeMode={'clip'}>
                  {'Convert recording'}
                </Text>
              </View>
            </View>   
          </TouchableOpacity>

          <View style={styles.recordingStopModalButtonDivider} /> 

          <TouchableOpacity
            style={styles.recordingStopModalButton}
            onPress={() => {
              setRecordingStopVisible(false)
            }}>
            <View style={styles.recordingStopModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon 
                  style={styles.recordingStopModalButtonIcon}
                  name="microphone"
                  size={20}
                />
              </View>
              <View style={styles.recordingStopModalButtonText_box}>
                <Text style={styles.recordingStopModalButtonText}>
                  {'Resume recording'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.recordingStopModalButtonDivider} /> 

          <TouchableOpacity 
            style={styles.recordingStopModalButton}
            onPress={() => {
              setRecordAudioState(false)
              setRecordingStopVisible(false)
            }}>
            <View style={styles.recordingStopModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon 
                  style={styles.recordingStopModalButtonIcon}
                  name="trash-o"
                  size={20}
                />
              </View>
              <View style={styles.recordingStopModalButtonText_box}>
                <Text style={styles.recordingStopModalButtonText}>
                  {'Discard recording'}
                </Text>
              </View>
            </View> 
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        style={styles.modal}
        isVisible={uploadVisible}
        hasBackdrop={true}
        backdropColor='white'
        onBackdropPress={() => setUploadVisible(false)}
        onModalHide={() => setFileSelected(false)}
      >
        <View style={styles.uploadModalInner}>
          <Text style={styles.modalTitle}>
            {'Select a file:'}
          </Text>

          <UploadAudioCenter 

          />

          <TouchableOpacity
            style={styles.uploadFileButton}
            state={null}
            onPress={() => setUploadVisible(false)}>
            <View style={styles.uploadModalButtonContent}>
              <View style={styles.uploadModalButtonText_box}>
                <Text style={styles.uploadModalButtonText}>
                  {'Upload'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
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
    //flexShrink: 1,
    //flex: 1,
    //flexShrink: 0,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
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
    height: '5%',
    //width: '100%',
    minHeight: 28
  },
  recentPdfTiles: {
    //height: '55%',
    flexShrink: 1,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-between'
  },
  viewAllTouchableOpacityFrame: {
    //height: '10%'
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 20
  },
  viewAllTouchableOpacity: {
    flexGrow: 1,
    marginTop: 5,
    marginBottom: 5,
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
    lineHeight: 22,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
    padding: 10,
  },
  viewAllTouchableOpacityLabel_box: {

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
    flexShrink: 1
  },
  settingsTouchableOpacityFrame: {
    height: '10%',
    marginVertical: 5
  },
  settingTouchableOpacity: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#d0d5ddff',
    borderRadius: 8,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    overflow: 'hidden',
    borderStyle: 'solid',
    borderColor: '#d0d5ddff',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1
    },
  },
  settingsIcon_frame: {
    justifyContent: 'center',
    alignContent: 'flex-start',
    paddingHorizontal: 7
  },
  settingsText: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 22,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  settingsText_box: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 1
  },
  audioTouchableOpacityGroup: {
    borderRadius: 8,
    flexDirection: 'row',
    height: '17%',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexShrink: 1,
    //elevation: 1,
    shadowColor: '#000000',
    shadowRadius: 1.810810810810811,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1
    },
  },
  recordAudioTouchableOpacity: {
    width: '50%',
    flexGrow: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#667084ff',
    borderRightWidth: 1,
  },
  recordAudioTouchableOpacityTrue: {
    backgroundColor: "#3F89BE"
  },
  recordAudioTouchableOpacityFalse: {
    backgroundColor: "#d0d5ddff"
  },
  recordAudioIcon: {
    resizeMode: 'contain',
    padding: 10
  },
  uploadAudioTouchableOpacity: {
    width: '50%',
    flexGrow: 1,
    backgroundColor: '#d0d5ddff',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: '#667084ff',
    borderLeftWidth: 1,
  },
  uploadAudioIcon: {
    resizeMode: 'contain',
    padding: 10
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    padding: 15
  },
  recordingStopModalInner: {
    width: '70%',
    flexShrink: 1,
    backgroundColor: '#f5f5f5ff',
    borderRadius: 7,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#667084ff',
    opacity: 1
  },
  recordingStopModalButton: {
    flexGrow: 1,
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  recordingStopModalButtonContent: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //padding: 5
  },
  iconContainer: {
    width: '25%',
    height: '100%',
    alignItems: 'center'
  },
  recordingStopModalButtonIcon: {
    color: "#3f89beff"
  },
  recordingStopModalButtonText: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
  },
  recordingStopModalButtonText_box: {
    flexShrink: 1
  },
  recordingStopModalButtonDivider: {
    backgroundColor: '#d0d5ddff',
    height: 1,
    width: '87%',
    alignSelf: 'center'
  },
  uploadModalInner: {
    width: '55%',
    flexShrink: 1,
    backgroundColor: '#d0d5ddff',
    borderRadius: 7,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#667084ff',
  },
  uploadModalButton: {
    flexGrow: 1,
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  changeUploadModalButton: {
    flexGrow: 1,
    height: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignContent: 'center',
    flexShrink: 1,
    backgroundColor: '#ffffffff',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#667084ff',
  },
  changeUploadModalButtonText: {
    color: '#3F89BE',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
  },
  uploadFileButton: {
    flexGrow: 1,
    height: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
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
  uploadModalButtonContent: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //padding: 5
  },
  uploadModalButtonIcon: {
    color: "#3f89beff"
  },
  uploadModalButtonText: {
    color: '#ffffffff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
  },
  uploadModalButtonText_box: {
    flexShrink: 1
  },
});