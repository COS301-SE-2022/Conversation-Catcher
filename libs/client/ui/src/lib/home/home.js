import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  NativeAppEventEmitter,
} from 'react-native';
import { gql, useMutation, useLazyQuery, useQuery } from '@apollo/client';
import PdfTile from '../shared-components/pdf-tile/pdf-tile.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Loading from '../shared-components/loading/loading.js';
import PdfDisplay from '../shared-components/pdf-display/pdf-display.js';
import pdfLocalAccess from '../shared-components/local-pdfs-access/local-pdfs-access';
import { Buffer } from 'buffer';
//import Permissions from 'react-native-permissions';
//import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import DocumentPicker, { types } from 'react-native-document-picker';
import { connect, useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  selectColour,
  selectEmail,
  addPDF,
  selectUser,
} from 'apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

export const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const pdfRef = useRef();
  const colourState = useSelector(selectColour);
  const emailState = useSelector(selectEmail);
  const userState = useSelector(selectUser);
  const [recordingStopVisible, setRecordingStopVisible] = useState(false);
  const [recordAudioState, setRecordAudioState] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [state, setState] = useState({
    chunks: [],
    recording: false,
    loaded: false,
    paused: true,
  });

  const [fileResponse, setFileResponse] = useState([]);

  //Graphql syntax trees for the queries and mutations
  const SET_SUMMARISED = gql`
    mutation setSummarized($id: String!, $summary: String!) {
      setSummarized(id: $id, summary: $summary)
    }
  `;

  const SUMMARISE_TEXT = gql`
    mutation summariseText($text: String!) {
      Summarise(text: $text)
    }
  `;

  const ADD_PDF = gql`
    mutation addPdf($email: String!, $name: String!, $text: String!) {
      addPDF(email: $email, name: $name, text: $text) {
        name
        id
        text
        downloaded
        creationDate
      }
    }
  `;

  //Mutations to be used in the creation of new PDFs
  const [summariseText] = useMutation(SUMMARISE_TEXT);
  const [setSummarisedText] = useMutation(SET_SUMMARISED);
  const [addPdf] = useMutation(ADD_PDF);

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
            { backgroundColor: colourState },
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
      return (
        <TouchableOpacity
          style={styles.changeUploadModalButton}
          onPress={() => handleDocumentSelection()}
        >
          <Icon style={{ color: colourState }} name="file-sound-o" size={16} />
          {fileResponse.map((file, index) => (
            <Text
              style={[
                styles.changeUploadModalButtonText,
                { color: colourState },
              ]}
            >
              {file?.name}
            </Text>
          ))}
        </TouchableOpacity>
      );
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
      state.chunks.push(data);
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

  //Start the audio recording and initialise the event to create an array of chunks
  const start = () => {
    state.chunks.length = 0;
    componentDidMount()
      .then(() => {
        state.audioFile = '';
        state.recording = true;
        state.loaded = false;
        AudioRecord.start();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Stop the audio recording if it is busy recording
  const stop = async () => {
    if (!state.recording) return;
    state.audioFile = false;
    state.recording = false;
    AudioRecord.stop();
  };

  // Send the audio stream to the server and receive the converted text
  const convertSpeech = () => {
    fetch('http://localhost:5050/stt', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        audio_path: 'audio_path',
        audio_chunks: state.chunks,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          const result = await res.json();
          console.log(result);
          const newPdf = await addPdf({
            variables: {
              email: emailState,
              name: '',
              text: result.converted_text,
            },
          });
          pdfLocalAccess.addPdf({
            name: newPdf.data.addPDF.name,
            creationDate: newPdf.data.addPDF.creationDate,
            downloaded: newPdf.data.addPDF.downloaded,
            text: newPdf.data.addPDF.text,
            id: newPdf.data.addPDF.id,
            summarised: newPdf.data.addPDF.summarised,
            embeddings: newPdf.data.addPDF.embeddings,
          });
          NativeAppEventEmitter.emit('updatePage');
          dispatch(addPDF(newPdf.data.addPDF.id));
          summarise(newPdf.data.addPDF.id, newPdf.data.addPDF.text);
        } else console.log('Connection error: internet connection is required');
      })
      .catch((e) => console.log(e));
  };

  //summarise the text and populate the required fields
  const summarise = (id, text) => {
    summariseText({ variables: { text: text } })
      .then(async (res) => {
        console.log(res);
        setSummarisedText({
          variables: { id: id, summary: res },
        });
        pdfLocalAccess.addSummary(id, res);
      })
      .catch((e) => console.log(e));
  };

  // componentDidMount();
  return (
    <View style={styles.home}>
      <View style={styles.big_title_box}>
        <Text style={styles.big_title} ellipsizeMode={'clip'}>
          {'Recents'}
        </Text>
      </View>
      <PdfDisplay navigation={navigation} selectMode={false} ref={pdfRef} />
      <View style={styles.viewPdfsTouchableOpacityFrame}>
        <TouchableOpacity
          style={[
            styles.viewPdfsTouchableOpacity,
            { backgroundColor: colourState },
          ]}
          onPress={() => {
            navigation.navigate('ViewAll');
          }}
        >
          <View style={styles.viewPdfsTouchableOpacityLabel_box}>
            <Text
              style={styles.viewPdfsTouchableOpacityLabel}
              ellipsizeMode={'clip'}
            >
              {'My PDFs'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.viewPdfsTouchableOpacityFrame}>
        <TouchableOpacity
          style={[
            styles.viewPdfsTouchableOpacity,
            { backgroundColor: colourState },
          ]}
          onPress={() => {
            navigation.navigate('Groups');
          }}
        >
          <View style={styles.viewPdfsTouchableOpacityLabel_box}>
            <Text
              style={styles.viewPdfsTouchableOpacityLabel}
              ellipsizeMode={'clip'}
            >
              {'Groups'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomGroup}>
        <View style={styles.bottomGroupSideSpacing}></View>
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
        <View style={styles.bottomGroupSideSpacing}>
          <TouchableOpacity
            style={styles.settingsTouchableOpacityFrame}
            onPress={() => navigation.navigate('Settings')}
          >
            <View style={styles.settingsIconBox}>
              <Icon style={styles.settingsIcon}>
                <Icon name="cog" size={25} color="#667084ff" />
              </Icon>
            </View>
          </TouchableOpacity>
        </View>
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
              // Convert speech to text
              stop();
              convertSpeech();
              setRecordAudioState(false);
              setRecordingStopVisible(false);
            }}
          >
            <View style={styles.recordingStopModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon style={{ color: colourState }} name="refresh" size={18} />
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
                  style={{ color: colourState }}
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
              // Discard recording
              stop();
              setRecordAudioState(false);
              setRecordingStopVisible(false);
            }}
          >
            <View style={styles.recordingStopModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon style={{ color: colourState }} name="trash-o" size={20} />
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
            style={[styles.uploadFileButton, { backgroundColor: colourState }]}
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
    height: '7%',
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
  viewPdfsTouchableOpacityFrame: {
    height: '10%',
    flexGrow: 1,
    justifyContent: 'center',
    marginVertical: 5,
  },
  viewPdfsTouchableOpacity: {
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
  viewPdfsTouchableOpacityLabel: {
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
  viewPdfsTouchableOpacityLabel_box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomGroup: {
    height: '15%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  bottomGroupSideSpacing: {
    width: '30%',
    alignItems: 'center',
  },
  settingsTouchableOpacityFrame: {
    flexShrink: 1,
    marginVertical: 5,
  },
  settingsIconBox: {
    justifyContent: 'center',
    alignContent: 'flex-start',
    margin: 10,
  },
  audioTouchableOpacityGroup: {
    borderRadius: 8,
    flexDirection: 'row',
    height: '70%',
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
    flexShrink: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#667084ff',
    borderRightWidth: 1,
  },
  recordAudioIcon: {
    padding: 10,
  },
  uploadAudioTouchableOpacity: {
    width: '50%',
    flexShrink: 1,
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
