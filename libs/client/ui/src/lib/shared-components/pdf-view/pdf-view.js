import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  Share,
  DeviceEventEmitter,
  NativeAppEventEmitter,
  Switch,
} from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import PdfTile from '../shared-components/pdf-tile/pdf-tile.js';
import ModalDropdown from 'react-native-modal-dropdown';
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
//import ReactPDF from '@react-pdf/renderer';
import { document } from '../document/document';

export const PdfView = ({ route, navigation }) => {
  const colourState = useSelector(selectColour);
  const dispatch = useDispatch();
  const [moreVisible, setMoreVisible] = useState(false);
  const [renameVisible, setRenameVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [newName, setNewName] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    //change
  };

  const { text, name, id, summarised } = route.params;

  const onShare = async () => {
    try {
      // const result = await Share.share({
      //   message: text.text,
      //   title: name.name,
      // });
      //ReactPDF.render(<document t={text.text} n={name.name}/>, `${__dirname}/`+name.name+`.pdf`);
    } catch (error) {
      alert(error.message);
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

  const [rename] = useMutation(RENAME);
  const [delete_pdf] = useMutation(DELETE);

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
    pdfLocalAccess.deletePdf(id.id);
    delete_pdf({ variables: { id: id.id } }).catch((error) => {
      console.log(error);
    });
    dispatch(removePDF({ id: id.id }));
  }

  const TextArea = () => {
    //isEnabled == false => unsummarised version
    // console.log(summarised);
    if (!isEnabled)
      return (
        <View style={styles.pdfTextContainer}>
          <Text style={styles.pdfText}>{text.text}</Text>
        </View>
      );
    if (
      summarised.summarised === 'loading' ||
      summarised.summarised === undefined
    )
      return (
        <View style={styles.pdfTextContainer}>
          <Loading width={100} height={100} load={true} />
          <Text style={styles.modalTitle}>Summarising in progress</Text>
        </View>
      );
    if (summarised.summarised === 'error')
      return (
        <View style={styles.pdfTextContainer}>
          <Text style={styles.modalTitle}>An error has occured</Text>
          <TouchableOpacity
            style={[
              styles.retrySummaryContainer,
              { backgroundColor: colourState },
            ]}
            onPress={async () => {
              console.log('Retry');
              NativeAppEventEmitter.emit('summarise', id.id, text.text);
            }}
          >
            <Text style={styles.retrySummaryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    return (
      <View style={styles.pdfTextContainer}>
        <Text style={styles.pdfText}>{summarised.summarised}</Text>
      </View>
    );
  };

  return (
    <View style={styles.viewAllPage}>
      <View style={styles.viewAllTopBar}>
        <View style={styles.big_title_box}>
          <Text style={styles.big_title} numberOfLines={1}>
            {name.name}
          </Text>
        </View>
        <View style={styles.summarisedSwitchGroup}>
          <View style={styles.summarisedLabelBox}>
            <Text style={styles.summarisedLabel}>Summarised</Text>
          </View>
          <View style={styles.summarisedSwitchBox}>
            <Switch
              trackColor={{ false: '#ffffff', true: colourState }}
              thumbColor={isEnabled ? '#ffffff' : colourState}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </View>

      <TextArea />

      <View style={styles.bottomBar}>
        <View style={styles.bottomBarSideSpacing} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
            NativeAppEventEmitter.emit('updatePage');
          }}
        >
          <Icon name="angle-left" color="#344053ff" size={30} />
        </TouchableOpacity>
        <View style={styles.bottomBarSideSpacing}>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => {
              setMoreVisible(true);
              console.log(text);
            }}
          >
            <Icon name="ellipsis-h" color="#344053ff" size={30} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        style={styles.modal}
        isVisible={moreVisible}
        avoidKeyboard={true}
        hasBackdrop={true}
        backdropColor="white"
        onBackdropPress={() => setMoreVisible(false)}
      >
        <View style={styles.moreModalInner}>
          <TouchableOpacity
            style={styles.moreModalButton}
            onPress={() => {
              setMoreVisible(false);
              onShare();
            }}
          >
            <View style={styles.moreModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon
                  style={{ color: colourState }}
                  name="paper-plane-o"
                  size={18}
                />
              </View>
              <View style={styles.moreModalButtonText_box}>
                <Text style={styles.moreModalButtonText} ellipsizeMode={'clip'}>
                  {'Export'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.moreModalButtonDivider} />

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
                  style={{ color: colourState }}
                  name="pencil-square-o"
                  size={20}
                />
              </View>
              <View style={styles.moreModalButtonText_box}>
                <Text style={styles.moreModalButtonText}>{'Rename'}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.moreModalButtonDivider} />

          <TouchableOpacity
            style={styles.moreModalButton}
            onPress={async () => {
              setMoreVisible(false);
              setDeleteConfirmVisible(true);
            }}
          >
            <View style={styles.moreModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon style={{ color: colourState }} name="trash-o" size={20} />
              </View>
              <View style={styles.moreModalButtonText_box}>
                <Text style={styles.moreModalButtonText}>{'Delete'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        style={styles.modal}
        isVisible={renameVisible}
        hasBackdrop={true}
        backdropColor="white"
        onBackdropPress={() => setRenameVisible(false)}
        //onModalHide={() => setFileSelected(false)}
      >
        <View style={styles.renameModalInner}>
          <TextInput
            style={styles.renameModalTextInput}
            defaultValue={name.name}
            onChangeText={(text) => {
              setNewName(text);
            }}
          />
          <TouchableOpacity
            style={[styles.renameFileButton, { backgroundColor: colourState }]}
            state={null}
            onPress={() => {
              console.log('renaming the pdf to ' + newName);
              renamePdf();
              setRenameVisible(false);
            }}
          >
            <View style={styles.renameModalButtonContent}>
              <View style={styles.renameModalButtonText_box}>
                <Text style={styles.renameModalButtonText}>{'Rename'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        style={styles.modal}
        isVisible={deleteConfirmVisible}
        hasBackdrop={true}
        backdropColor="white"
        onBackdropPress={() => setDeleteConfirmVisible(false)}
        //onModalHide={() => setFileSelected(false)}
      >
        <View style={styles.renameModalInner}>
          <Text style={styles.modalTitle}>
            {'Are you sure you want to delete ' + name.name + '?'}
          </Text>
          <TouchableOpacity
            style={[styles.renameFileButton, { backgroundColor: colourState }]}
            state={null}
            onPress={() => {
              setDeleteConfirmVisible(false);
            }}
          >
            <View style={styles.renameModalButtonContent}>
              <View style={styles.renameModalButtonText_box}>
                <Text style={styles.renameModalButtonText}>{'Cancel'}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.renameFileButton, { backgroundColor: colourState }]}
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
                <Text style={styles.renameModalButtonText}>{'Delete'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
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
    color: '#ffffffff',
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
    backgroundColor: '#ffffffff',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    flexGrow: 1,
    marginRight: 0,
  },
  viewAllTopBar: {
    width: '100%',
    flexShrink: 1,
    backgroundColor: '#c4c4c4ff',
    elevation: 2,
    shadowColor: '#000000',
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
    color: '#344053ff',
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
  },
  summarisedSwitchGroup: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    flexGrow: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  summarisedLabel: {
    color: '#344053ff',
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
    color: '#344053ff',
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
    backgroundColor: '#c4c4c4ff',
    //shadowColor: 'transparent' /* cannot find mapping from CSS: 0px -4px 4px 0px rgba(0,0,0,0.09803921568627451), https://ethercreative.github.io/react-native-shadow-generator/ */
    borderRadius: 5,
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
    width: '45%',
    flexShrink: 1,
    backgroundColor: '#f5f5f5ff',
    borderRadius: 7,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#667084ff',
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
    width: '40%',
    height: '100%',
    alignItems: 'center',
  },
  moreModalButtonText: {
    color: '#344053ff',
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
    backgroundColor: '#d0d5ddff',
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
    backgroundColor: '#d0d5ddff',
    borderRadius: 7,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#667084ff',
  },
  renameModalButton: {
    flexGrow: 1,
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  changerenameModalButton: {
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
  changerenameModalButtonText: {
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
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
    color: '#ffffffff',
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
    fontSize: 15,
    color: 'black',
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    backgroundColor: '#ffffffff',
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
    height: 40,
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
});
