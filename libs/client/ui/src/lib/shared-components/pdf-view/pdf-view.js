import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Share,
  DeviceEventEmitter,
  NativeAppEventEmitter,
  Switch,
} from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import Loading from '../loading/loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import pdfLocalAccess from '../local-pdfs-access/local-pdfs-access.js';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectColour } from '../../../../../../apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  changeName,
  removePDF,
} from '../../../../../../../apps/client/src/app/slices/pdf.slice';
//import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import groupLocalAccess from '../local-groups-access/local-groups-access';

export const PdfView = ({ route, navigation }) => {
  const colourState = useSelector(selectColour);
  const dispatch = useDispatch();
  const [moreVisible, setMoreVisible] = useState(false);
  const [renameVisible, setRenameVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [notifyUser, setNotifyUser] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    //change
  };

  const { text, name, id, summarised, group } = route.params;

  const onPdfShare = async () => {
    try {
      const htmlPDF = '<h1>'+name.name+'</h1>'+text.text;//Add check to output summerized text when toggled
      console.log("Export");
      let options = {
        html: htmlPDF,
        fileName: name.name,
        directory: ''//'Documents'//may be broken on IOS, may need to use Project.OS to set different destinations
      };
      let file = await RNHTMLtoPDF.convert(options);
      console.log(file.filePath);
    } catch (error) {
      alert(error.message);
    }
  };

  const onTextShare = async () => {
    try {
      const result = await Share.share({
        message:
          text.text,
        title:
          name.name,
        url:
          name.name,
      });
    } catch (error) {
      //alert(error.message);
    }
  };

  const RENAME = gql`
    mutation setName($id: String!, $name: String!) {
      renamePDF(id: $id, name: $name)
    }
  `;

  const DELETE = gql`
    mutation delete($id: String!) {
      deletePDF(id: $id) {
        id
        name
        text
      }
    }
  `;
  const DELETE_FROM = gql`
    mutation removeFrom($id: String!, $group:String!){
      removePdfFrom(pdfId: $id, groupName: $group)
    }
  `;

  const [rename] = useMutation(RENAME);
  const [delete_pdf] = useMutation(DELETE);
  const [removeFrom] = useMutation(DELETE_FROM);
  const [load, setLoad] = useState(true);

  async function renamePdf() {
    console.log(id);
    name.name = newName;
    pdfLocalAccess.renamePdf(id.id, newName);
    rename({ variables: { id: id.id, name: newName } }).catch((error) => {
      console.log(error);
    });
    dispatch(changeName({ id: id.id, name: newName }));
  }

  async function deletePdf() {
    if (group === ""){
      pdfLocalAccess.deletePdf(id.id);
      delete_pdf({ variables: { id: id.id } }).catch((error) => {
        console.log(error);
      });
      dispatch(removePDF({ id: id.id }));
    } else {
      pdfLocalAccess.removeFromDisplay(id.id);
      groupLocalAccess.removePdf(id.id,group.group.name);
      console.log(id.id);
      console.log(group);
      removeFrom({variables: {id:id.id, group:group.group.name}}).catch((error)=>{
        console.log("removeFrom:",error);
      });
    }
  }

  const TextArea = () => {
    //isEnabled == false => unsummarised version
    // console.log(summarised);
    if (!isEnabled)
      return (
        <View style={styles.pdfTextContainer}>
          <Text style={[styles.pdfText, {color: colourState.top}]}>{text.text}</Text>
        </View>
      );
    if (
      summarised.summarised === 'loading' ||
      summarised.summarised === undefined
    )
      return (
        <View style={styles.pdfTextContainer}>
          <Loading width={100} height={100} load={true} />
          <Text style={[styles.modalTitle, {color: colourState.top}]}>Summarising in progress...it will take approximately 5 minutes</Text>
        </View>
      );
    if (summarised.summarised === 'error')
      return (
        <View style={styles.pdfTextContainer}>
          <Text style={[styles.modalTitle, {color: colourState.top}]}>An error has occured</Text>
          <TouchableOpacity
            style={[
              styles.retrySummaryContainer,
              { backgroundColor: colourState.accent },
            ]}
            onPress={() => {
              console.log('Retry');
              pdfLocalAccess.addSummary(id, 'loading');
              summarised.summarised = 'loading';
              setLoad(!load);
              NativeAppEventEmitter.emit('summarise', id.id, text.text);
            }}
          >
            <Text style={[styles.retrySummaryText, {color: colourState.mode}]}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    return (
      <View style={styles.pdfTextContainer}>
        <Text style={[styles.pdfText, {color: colourState.top}]}>{summarised.summarised}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.viewAllPage, {backgroundColor: colourState.mode}]}>
      <View style={[styles.viewAllTopBar, {backgroundColor: colourState.low}, {borderColor: colourState.low}, {shadowColor: colourState.high}]}>
        <View style={styles.big_title_box}>
          <Text style={[styles.big_title, {color: colourState.top}]} numberOfLines={1}>
            {name.name}
          </Text>
        </View>
        <View style={styles.summarisedSwitchGroup}>
          <View style={styles.summarisedLabelBox}>
            <Text style={[styles.summarisedLabel, {color: colourState.top}]}>Summarised</Text>
          </View>
          <View style={styles.summarisedSwitchBox}>
            <Switch
              trackColor={{ false: colourState.mode, true: colourState.accent }}
              thumbColor={isEnabled ? colourState.mode : colourState.accent}
              ios_backgroundColor={colourState.high}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </View>

      <TextArea />

      <View style={[styles.bottomBar, {backgroundColor: colourState.low}, {borderColor: colourState.low}, {shadowColor: colourState.high}]}>
        <View style={styles.bottomBarSideSpacing} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
            NativeAppEventEmitter.emit('updatePage');
          }}
        >
          <Icon name="angle-left" color={colourState.top} size={30} />
        </TouchableOpacity>
        <View style={styles.bottomBarSideSpacing}>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => {
              setMoreVisible(true);
              //console.log(text);
            }}
          >
            <Icon name="ellipsis-h" color={colourState.top} size={30} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        style={styles.modal}
        isVisible={moreVisible}
        avoidKeyboard={true}
        hasBackdrop={true}
        backdropColor={colourState.mode}
        onBackdropPress={() => setMoreVisible(false)}
      >
        <View style={[styles.moreModalInner, {backgroundColor: colourState.bottom}, {borderColor: colourState.low}, {shadowColor: colourState.low}]}>
          <TouchableOpacity
            style={styles.moreModalButton}
            onPress={() => {
              setMoreVisible(false);
              onTextShare();
            }}
          >
            <View style={styles.moreModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon
                  style={{ color: colourState.accent }}
                  name="file-text-o"
                  size={18}
                />
              </View>
              <View style={styles.moreModalButtonText_box}>
                <Text style={[styles.moreModalButtonText, {color: colourState.top}]} ellipsizeMode={'clip'}>
                  {'Export text'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.moreModalButton}
            onPress={() => {
              setMoreVisible(false);
              onPdfShare();
              setNotifyUser(true);
            }}
          >
            <View style={styles.moreModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon
                  style={{ color: colourState.accent }}
                  name="file-pdf-o"
                  size={18}
                />
              </View>
              <View style={styles.moreModalButtonText_box}>
                <Text style={[styles.moreModalButtonText, {color: colourState.top}]} ellipsizeMode={'clip'}>
                  {'Download PDF'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.moreModalButton}
            onPress={() => {
              setMoreVisible(false);
              //onShare();
              console.log(id.id);
              navigation.navigate('GroupSelection',id);
            }}
          >
            <View style={styles.moreModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon
                  style={{ color: colourState.accent }}
                  name="paper-plane-o"
                  size={18}
                />
              </View>
              <View style={styles.moreModalButtonText_box}>
                <Text style={[styles.moreModalButtonText, {color: colourState.top}]} ellipsizeMode={'clip'}>
                  {'Share with group'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={[styles.moreModalButtonDivider, {backgroundColor: colourState.low}]} />

          <TouchableOpacity
            style={styles.moreModalButton}
            onPress={() => {
              setMoreVisible(false);
              setRenameVisible(true);
            }}
          >
            <View style={styles.moreModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon
                  style={{ color: colourState.accent }}
                  name="pencil-square-o"
                  size={20}
                />
              </View>
              <View style={styles.moreModalButtonText_box}>
                <Text style={[styles.moreModalButtonText, {color: colourState.top}]}>{'Rename'}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={[styles.moreModalButtonDivider, {backgroundColor: colourState.low}]} />

          <TouchableOpacity
            style={styles.moreModalButton}
            onPress={async () => {
              setMoreVisible(false);
              setDeleteConfirmVisible(true);
            }}
          >
            <View style={styles.moreModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon style={{ color: colourState.accent }} name="trash-o" size={20} />
              </View>
              <View style={styles.moreModalButtonText_box}>
                <Text style={[styles.moreModalButtonText, {color: colourState.top}]}>{'Delete'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        style={styles.modal}
        isVisible={renameVisible}
        hasBackdrop={true}
        backdropColor={colourState.mode}
        onBackdropPress={() => setRenameVisible(false)}
        //onModalHide={() => setFileSelected(false)}
      >
        <View style={[styles.renameModalInner, {backgroundColor: colourState.bottom}, {borderColor: colourState.low}]}>
          <TextInput
            style={[styles.renameModalTextInput, {backgroundColor: colourState.mode}, {color: colourState.top}]}
            defaultValue={name.name}
            onChangeText={(text) => {
              setNewName(text);
            }}
          />
          <TouchableOpacity
            style={[styles.renameFileButton, { backgroundColor: colourState.accent }]}
            state={null}
            onPress={() => {
              console.log('renaming the pdf to ' + newName);
              renamePdf();
              setRenameVisible(false);
            }}
          >
            <View style={styles.renameModalButtonContent}>
              <View style={styles.renameModalButtonText_box}>
                <Text style={[styles.renameModalButtonText, {color: colourState.mode}]}>{'Rename'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        style={styles.modal}
        isVisible={deleteConfirmVisible}
        hasBackdrop={true}
        backdropColor={colourState.mode}
        onBackdropPress={() => setDeleteConfirmVisible(false)}
        //onModalHide={() => setFileSelected(false)}
      >
        <View style={[styles.renameModalInner, {backgroundColor: colourState.bottom}, {borderColor: colourState.low}]}>
          <Text style={[styles.modalTitle, {color: colourState.top}]}>
            {'Are you sure you want to delete ' + name.name + '?'}
          </Text>
          <TouchableOpacity
            style={[styles.renameFileButton, { backgroundColor: colourState.accent }]}
            state={null}
            onPress={() => {
              setDeleteConfirmVisible(false);
            }}
          >
            <View style={styles.renameModalButtonContent}>
              <View style={styles.renameModalButtonText_box}>
                <Text style={[styles.renameModalButtonText, {color: colourState.mode}]}>{'Cancel'}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.renameFileButton, { backgroundColor: colourState.accent }]}
            state={null}
            onPress={() => {
              // Delete the pdf
              deletePdf();
              setDeleteConfirmVisible(false);
              navigation.goBack();
              NativeAppEventEmitter.emit('updatePage');
            }}
          >
            <View style={styles.renameModalButtonContent}>
              <View style={styles.renameModalButtonText_box}>
                <Text style={[styles.renameModalButtonText, {color: colourState.mode}]}>{'Delete'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        style={styles.modalNotify}
        isVisible={notifyUser}
        hasBackdrop={true}
        backdropColor=""
        onBackdropPress={() => {
          setNotifyUser(false);
        }}
      >
        <View style={[styles.modalNotifyInner, {backgroundColor: colourState.low}, {borderColor: colourState.high}]}>
          <Text style={[styles.modalTitle, {color: colourState.top}]}>
            {'The PDF has been downloaded to your documents folder'}
          </Text>
          {/* <Text style={styles.modalTitle}>{'Your document will be ready in 2 minutes'}</Text> */}
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default PdfView;

const styles = StyleSheet.create({
  retrySummaryContainer: {
    // flexGrow: 1,
    marginTop: 10,
    // marginBottom: 5,
    marginLeft: 100,
    marginRight: 100,
    height: 50,
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
  retrySummaryText: {
    // borderWidth: 1,
    // padding: 25,
    // borderColor: 'black',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 22,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
    // padding: 10
  },
  viewAllPage: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    flex: 1,
    marginRight: 0,
  },
  viewAllTopBar: {
    width: '100%',
    flexShrink: 1,
    elevation: 2,
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    alignItems: 'center',
    flexDirection: 'row',
    top: 0,
    zIndex: 999,
    //minHeight: 88,
  },
  big_title: {
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 28,
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
  },
  big_title_box: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 15,
    flexGrow: 1,
    minHeight: 28,
    width: "60%",
  },
  summarisedSwitchGroup: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    flexGrow: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: "40%",
  },
  summarisedLabel: {
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  summarisedLabelBox: {},
  summarisedSwitchBox: {},
  pdfTextContainer: {
    height: '70%',
    padding: 15,
    overflow: 'scroll',
  },
  pdfText: {
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    paddingHorizontal: 0,
  },
  bottomBar: {
    width: '100%',
    flexDirection: 'row',
    flexShrink: 1,
    //shadowColor: 'transparent' /* cannot find mapping from CSS: 0px -4px 4px 0px rgba(0,0,0,0.09803921568627451), https://ethercreative.github.io/react-native-shadow-generator/ */
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    elevation: 2,
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  bottomBarSideSpacing: {
    width: '30%',
    alignContent: 'center',
  },
  backButton: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  moreButton: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreModalInner: {
    width: '70%',
    flexShrink: 1,
    borderRadius: 7,
    flexDirection: 'column',
    borderWidth: 1,
    opacity: 1,
  },
  moreModalButton: {
    flexGrow: 1,
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  moreModalButtonContent: {
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
  moreModalButtonText: {
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
  },
  moreModalButtonText_box: {
    flexShrink: 1,

  },
  moreModalButtonDivider: {
    height: 1,
    width: '87%',
    alignSelf: 'center',
  },
  modalBottomBar: {
    width: '100%',
    height: '13%',
    flexDirection: 'row',
    //flexShrink: 1,
    justifyContent: 'center',
    //alignSelf: 'flex-end'
  },
  renameModalInner: {
    width: '70%',
    flexShrink: 1,
    borderRadius: 7,
    flexDirection: 'column',
    borderWidth: 1,
  },
  renameModalButton: {
    flexGrow: 1,
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  renameFileButton: {
    flexGrow: 1,
    height: 40,
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
  renameModalButtonContent: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //padding: 5
  },
  renameModalButtonText: {
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
  },
  renameModalButtonText_box: {
    flexShrink: 1,
  },
  filerenameIconContainer: {
    flexShrink: 1,
  },
  renameModalTextInput: {
    flexShrink: 1,
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
    height: 40,
  },
  modalTitle: {
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    padding: 15,
  },
  modalNotify: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalNotifyInner: {
    width: '100%',
    flexShrink: 1,
    borderRadius: 7,
    flexDirection: 'column',
    borderWidth: 1,
    opacity: 1,
    //alignSelf: 'flex-end',
  },
});
