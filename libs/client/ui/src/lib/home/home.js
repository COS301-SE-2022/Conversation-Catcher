import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import PdfTile from '../shared-components/pdf-tile/pdf-tile.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import colour from '../colour/colour';
import Modal from 'react-native-modal';
import Loading from '../shared-components/loading/loading.js';
import { Buffer } from 'buffer';
//import Permissions from 'react-native-permissions';
//import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import DocumentPicker, { types } from 'react-native-document-picker';

export const Home = ({ navigation }) => {
  const [recordingStopVisible, setRecordingStopVisible] = useState(false);
  const [recordAudioState, setRecordAudioState] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [state, setState] = useState({
    audioFile: '',
    recording: false,
    loaded: false,
    paused: true,
  });

  const [fileResponse, setFileResponse] = useState([]);

  //Graphql syntax trees
  const GET_USER_PDFS = gql`
    query getForUser {
      getPDFs(id: "John@test") {
        id
        name
        creationDate
        downloaded
        #pdf
        text
      }
    }
  `;

  const SUMMARISE_TEXT = gql`
    mutation summariseText($text: String!) {
      Summarise(text: $text)
    }
  `;

  const CONVERT_SPEECH = gql`
    mutation speechToText {
      ConvertSpeech
    }
  `;

  //Mutations to be used in the creation of new PDFs
  const [summariseText, { data, loading, error }] = useMutation(SUMMARISE_TEXT);
  const [speechToText, { d, l, e }] = useMutation(CONVERT_SPEECH);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.audio],
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  function RecordAudioButtonState(props) {
    if (recordAudioState) {
      return (
        <TouchableOpacity
          style={[
            styles.recordAudioTouchableOpacity,
            { backgroundColor: colour.state },
          ]}
          onPress={() => {
            setRecordingStopVisible(true);
          }}
        >
          <View style={styles.recordAudioIcon}>
            <Icon color="#ffffffff" name="stop" size={40} />
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={[
          styles.recordAudioTouchableOpacity,
          { backgroundColor: '#d0d5ddff' },
        ]}
        onPress={() => {
          setRecordAudioState(true);
          start();
        }}
      >
        <View style={styles.recordAudioIcon}>
          <Icon color="#667084ff" name="microphone" size={40} />
        </View>
      </TouchableOpacity>
    );
  }

  function UploadAudioCenter(props) {
    if (fileSelected) {
      return <TouchableOpacity
              style={styles.changeUploadModalButton}
              onPress={() => handleDocumentSelection()}>
              <Icon
                style={{color : colour.state}}
                name="file-sound-o"
                size={16}
              />
              {fileResponse.map((file, index) => (
              <Text style={[styles.changeUploadModalButtonText, {color : colour.state}]}>
                {file?.name}
              </Text>
              ))}
            </TouchableOpacity>
    }
    return (
      <TouchableOpacity
        style={styles.uploadModalButton}
        onPress={() => {
          setFileSelected(true);
          handleDocumentSelection();
        }}
      >
        <View style={styles.uploadModalButtonContent}>
          <View style={styles.fileUploadIconContainer}>
            <Icon
              //style={styles.uploadModalButtonIcon}
              name="file-sound-o"
              size={40}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const componentDidMount = async () => {
    await checkPermission();

    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav',
    };

    AudioRecord.init(options);

    AudioRecord.on('data', (data) => {
      const chunk = Buffer.from(data, 'base64');
      console.log('chunk size', chunk.byteLength);
      // do something with audio chunk
    });
  };

  const checkPermission = async () => {
    const p = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    );
    // console.log('permission check', p);
    if (p === 'authorized') return;
    return requestPermission();
  };

  const requestPermission = async () => {
    const p = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    );
    // console.log('permission request', p);
  };

  //var sound = null;

  const start = () => {
    console.log('start record');
    state.audioFile = '';
    state.recording = true;
    state.loaded = false;
    console.log(state.recording);
    AudioRecord.start();
  };

  const stop = async () => {
    console.log(state.recording);
    if (!state.recording) return;
    console.log('stop record');
    state.audioFile = await AudioRecord.stop();
    //file containing audiofile
    console.log(await summariseText({variables:{ text: (await speechToText()).data.ConvertSpeech}}));
    console.log('audioFile', state.audioFile);
    componentDidMount();
    state.audioFile = false;
    state.recording = false;
  };

  function Pdfs() {
    // use redux to het email
    const { data, loading, error } = useQuery(GET_USER_PDFS);
    // console.log(data);
    // console.log(loading);
    // console.log(error);
    const newArr = [];

    if (loading)
      return (
        <View style={styles.recentPdfTiles}>
          <Loading />
        </View>
      );

    if (error)
      return (
        <View style={styles.recentPdfTiles}>
          <Text>An error occured...</Text>
        </View>
      );

    for (let i = 0; i < 3; i++) {
      if (data.getPDFs[i] !== undefined) newArr.push(data.getPDFs[i]);
    }

    return (
      <View style={styles.recentPdfTiles}>
        {newArr.map((item, key) => (
          <PdfTile
            // id= {key + 1}
            key={key}
            name={item.name}
            date={item.creationDate}
            thumbnailSource={''}
            text={item.text}
            downloaded={item.downloaded}
            pdfSource=""
            nav={navigation}
          />
        ))}
      </View>
    );
  }

  componentDidMount();

  return (
    <View style={styles.home}>
      <View style={styles.big_title_box}>
        <Text style={styles.big_title} ellipsizeMode={'clip'}>
          {'Recents'}
        </Text>
      </View>

      <Pdfs />

      <View style={styles.viewAllTouchableOpacityFrame}>
        <TouchableOpacity
          style={[
            styles.viewAllTouchableOpacity,
            { backgroundColor: colour.state },
          ]}
          onPress={() => {
            navigation.navigate('ViewAll');
          }}
        >
          <View style={styles.viewAllTouchableOpacityLabel_box}>
            <Text
              style={styles.viewAllTouchableOpacityLabel}
              ellipsizeMode={'clip'}
            >
              {'View all PDFs'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.settingsTouchableOpacityFrame}
        onPress={() => navigation.navigate('Settings')}
      >
        <View style={styles.settingTouchableOpacity}>
          <View style={styles.settingsText_box}>
            <Text style={styles.settingsText} ellipsizeMode={'clip'}>
              {'Settings'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.audioTouchableOpacityGroup}>
        <RecordAudioButtonState />
        <TouchableOpacity
          style={styles.uploadAudioTouchableOpacity}
          onPress={() => setUploadVisible(true)}
        >
          <View style={styles.uploadAudioIcon}>
            <Icon color="#667084ff" name="upload" size={40} />
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        style={styles.modal}
        isVisible={recordingStopVisible}
        hasBackdrop={true}
        backdropColor="white"
        onBackdropPress={() => {
          setRecordingStopVisible(false);
        }}
      >
        <View style={styles.recordingStopModalInner}>
          <Text style={styles.modalTitle}>{'Recording has been stopped'}</Text>

          <View style={styles.recordingStopModalButtonDivider} />

          <TouchableOpacity
            style={styles.recordingStopModalButton}
            onPress={async () => {
              console.log('pressed');
              stop();
              setRecordAudioState(false);
              setRecordingStopVisible(false);
            }}
          >
            <View style={styles.recordingStopModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon
                  style={{ color: colour.state }}
                  name="refresh"
                  size={18}
                />
              </View>
              <View style={styles.recordingStopModalButtonText_box}>
                <Text
                  style={styles.recordingStopModalButtonText}
                  ellipsizeMode={'clip'}
                >
                  {'Convert recording'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.recordingStopModalButtonDivider} />

          <TouchableOpacity
            style={styles.recordingStopModalButton}
            onPress={() => {
              setRecordingStopVisible(false);
            }}
          >
            <View style={styles.recordingStopModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon
                  style={{ color: colour.state }}
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
              stop();
              setRecordAudioState(false);
              setRecordingStopVisible(false);
            }}
          >
            <View style={styles.recordingStopModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon
                  style={{ color: colour.state }}
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
        backdropColor="white"
        onBackdropPress={() => setUploadVisible(false)}
        onModalHide={() => setFileSelected(false)}
      >
        <View style={styles.uploadModalInner}>
          <Text style={styles.modalTitle}>{'Select a file:'}</Text>

          <UploadAudioCenter />

          <TouchableOpacity
            style={[styles.uploadFileButton, { backgroundColor: colour.state }]}
            state={null}
            onPress={() => {
              setUploadVisible(false);
            }}
          >
            <View style={styles.uploadModalButtonContent}>
              <View style={styles.uploadModalButtonText_box}>
                <Text style={styles.uploadModalButtonText}>{'Upload'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
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
    paddingVertical: 0,
  },
  big_title_box: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
    height: '5%',
    //width: '100%',
    minHeight: 28,
  },
  recentPdfTiles: {
    //height: '55%',
    flexShrink: 1,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-between',
  },
  viewAllTouchableOpacityFrame: {
    //height: '10%'
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  viewAllTouchableOpacity: {
    flexGrow: 1,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1,
    },
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
    justifyContent: 'center',
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
      height: 1,
    },
    height: 1,
    flexShrink: 1,
  },
  settingsTouchableOpacityFrame: {
    height: '10%',
    marginVertical: 5,
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
      height: 1,
    },
  },
  settingsIcon_frame: {
    justifyContent: 'center',
    alignContent: 'flex-start',
    paddingHorizontal: 7,
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
    paddingVertical: 0,
  },
  settingsText_box: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 1,
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
      height: 1,
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
  recordAudioIcon: {
    resizeMode: 'contain',
    padding: 10,
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
    padding: 10,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 15,
  },
  recordingStopModalInner: {
    width: '70%',
    flexShrink: 1,
    backgroundColor: '#f5f5f5ff',
    borderRadius: 7,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#667084ff',
    opacity: 1,
  },
  recordingStopModalButton: {
    flexGrow: 1,
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row',
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
    alignItems: 'center',
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
    flexShrink: 1,
  },
  recordingStopModalButtonDivider: {
    backgroundColor: '#d0d5ddff',
    height: 1,
    width: '87%',
    alignSelf: 'center',
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
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  uploadModalButtonContent: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //padding: 5
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
    flexShrink: 1,
  },
  fileUploadIconContainer: {
    flexShrink: 1,
  },
});
