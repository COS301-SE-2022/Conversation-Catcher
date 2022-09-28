import React, { useState, useRef } from 'react';
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
  NativeAppEventEmitter,
  DeviceEventEmitter,
} from 'react-native';
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import PdfDisplay from '../shared-components/pdf-display/pdf-display.js';
import pdfLocalAccess from '../shared-components/local-pdfs-access/local-pdfs-access';
import { useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectColour } from '../../../../../../apps/client/src/app/slices/user.slice';
import groupLocalAccess from '../shared-components/local-groups-access/local-groups-access.js';

export const ViewAll = ({ navigation, route }) => {
  const pdfRef = useRef();
  const colourState = useSelector(selectColour);
  const [moreVisible, setMoreVisible] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [bottomModalType, setBottomModalType] = useState('none');
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [currOrderValue, setCurrOrderValue] = useState('Date');
  const [renameVisible, setRenameVisible] = useState(false);
  // const [refreshPage, setRefreshPage] = useState('');

  const { groupName } = route.params;

  const url = 'https://awesome.contents.com/';
  const title = 'Awesome Contents';
  const message = 'Please check this out.';

  const ADD_PDF = gql`
    mutation addPdfTo($pdfId: String!, $groupName: String!) {
      addPdfTo(pdfId: $pdf, groupName: $groupName)
    }
  `;
  const REMOVE_PDF = gql`
    mutation removePdfFrom($pdfId: String!, $groupName: String!) {
      removePdfFrom(pdfId: $pdf, groupName: $groupName)
    }
  `;
  const [addPdf] = useMutation(ADD_PDF);
  const [removePdf] = useMutation(REMOVE_PDF);

  async function addPDF() {
    //call this after selectedPdf is set to add pdf to group
    if (selectedPdf === null || selectedGroup === null) return;
    groupLocalAccess.addPdf(selectedPdf, selectedGroup);
    await addPdf({
      variables: { pdfId: selectedPdf, groupName: selectedGroup },
    }).then(() => {
      setSelectedPdf(null);
      setSelectedGroup(null);
    });
  }
  async function removePDF() {
    //call this after selectedPdf is set to remove pdf to group
    if (selectedPdf === null || groupName === null) return;
    groupLocalAccess.removePdf(selectedPdf, groupName);
    await removePdf({
      variables: { pdfId: selectedPdf, groupName: groupName },
    }).then(() => {
      setSelectedPdf(null);
    });
  }

  //variables for object sorting and management
  const [objArr, setObjArr] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const options = {
    title,
    url,
    message,
  };

  const SEARCH_IDEA = gql`
    query searchIdea($query: String!, $docs: [PdfEntityInput!]!) {
      semanticSearch(query: $query, docs: $docs)
    }
  `;

  const GET_PDFS = gql`
    query getArrPdfs($ids: [String!]!) {
      getPDFByArr(ids: $ids) {
        id
        name
        creationDate
        downloaded
        text
        summarised
        embeddings
      }
    }
  `;

  const [semanticSearch] = useLazyQuery(SEARCH_IDEA);
  const [getPdfs] = useLazyQuery(GET_PDFS);

  if (pdfLocalAccess.clearSearchInput.length !== 0) {
    //If statement to ensure that only one listener is created for the summarise command
    DeviceEventEmitter.addListener('clearSearch', () => {
      setSearchInput('');
    });
    pdfLocalAccess.clearSearchInput.length = 0;
  }

  const share = async (customOptions = options) => {
    try {
      await Share.open(customOptions);
    } catch (err) {
      console.log(err);
    }
  };

  function BottomModalButton(props) {
    if (props.type === 'share') {
      return (
        <TouchableOpacity
          style={styles.backButton}
          onPress={async () => {
            await share({
              title: 'Sharing pdf file from awesome share app',
              message: 'Please take a look at this file',
              url: '../assets/thereactnativebook-sample.pdf',
            });
            setSelectMode(false);
            setBottomModalVisible(false);
          }}
        >
          <Icon name="paper-plane-o" color="#ffffffff" size={22} />
        </TouchableOpacity>
      );
    }
    if (props.type === 'rename') {
      return (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setBottomModalVisible(false)}
        >
          <Icon name="pencil-square-o" color="#ffffffff" size={22} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          setSelectMode(false);
          setBottomModalVisible(false);
        }}
      >
        <Icon name="trash-o" color="#ffffffff" size={22} />
      </TouchableOpacity>
    );
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.viewAllPage}>
      <View style={styles.viewAllTopBar}>
        <View style={styles.big_title_box}>
          <Text style={styles.big_title}>{'PDFs'}</Text>
        </View>

        <View style={styles.searchBarGroup}>
          <TextInput
            style={styles.searchInput}
            value={searchInput}
            placeholder="Search"
            onSubmitEditing={(text) => {
              console.log(text.nativeEvent.text);
              pdfLocalAccess.filterPdfs(text.nativeEvent.text);
              semanticSearch({
                variables: {
                  query: text.nativeEvent.text,
                  docs: pdfLocalAccess.allPdfs,
                },
              })
                .then((res) => {
                  if (res.data.semanticSearch[0] !== ''){
                    pdfLocalAccess.sortByIds(res.data.semanticSearch);
                  }
                  NativeAppEventEmitter.emit('updatePage');
                })
                .catch((error) => {
                  console.log(error);
                  pdfLocalAccess.filterPdfs(text);
                  NativeAppEventEmitter.emit('updatePage');
                });
            }}
            onChangeText={(text) => {
              setSearchInput(text);
            }}
          />
          <View style={styles.searchIconFrame}>
            <Icon color="#667084ff" name="search" size={24} />
          </View>
        </View>
      </View>

      <PdfDisplay
        navigation={navigation}
        selectMode={selectMode}
        ref={pdfRef}
      />

      <View style={styles.viewAllBottomBar}>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => setMoreVisible(true)}
        >
          <Icon name="ellipsis-h" color="#344053ff" size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="angle-left" color="#344053ff" size={30} />
        </TouchableOpacity>

        <View style={styles.orderByGroup}>
          <Text style={styles.orderByLabel}>{'Order by'}</Text>
          <ModalDropdown
            options={['Date', 'Name']}
            defaultIndex={0}
            defaultValue={'Date'}
            onSelect={(index, itemValue) => {
              pdfLocalAccess.sortPdfs(itemValue);
              // pdfRef.current.refreshPfds();
              NativeAppEventEmitter.emit('updatePage');
            }}
            style={styles.orderByDropdown}
            textStyle={styles.orderByDropdownText}
            dropdownStyle={styles.orderByDropdownStyle}
            dropdownTextStyle={styles.orderByDropdownTextStyle}
            dropdownTextSelectHighlightStyle={{ color: colourState }}
          />
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
              setBottomModalType('share');
              setSelectMode(true);
              setBottomModalVisible(true);
              setMoreVisible(false);
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
                  {'Share'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.moreModalButtonDivider} />

          <TouchableOpacity
            style={styles.moreModalButton}
            onPress={() => {
              setBottomModalType('rename');
              setBottomModalVisible(true);
              setMoreVisible(false);
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
            onPress={() => {
              setBottomModalType('delete');
              setBottomModalVisible(true);
              setSelectMode(true);
              setMoreVisible(false);
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
        isVisible={bottomModalVisible}
        coverScreen={false}
        hasBackdrop={false}
        style={{
          width: '100%',
          height: '8%',
          margin: 0,
          justifyContent: 'flex-end',
        }}
      >
        <View style={[styles.modalBottomBar, { backgroundColor: colourState }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setBottomModalVisible(false);
              setSelectMode(false);
            }}
          >
            <Icon name="angle-left" color="#ffffffff" size={30} />
          </TouchableOpacity>

          <BottomModalButton type={bottomModalType} />
        </View>
      </Modal>

      <Modal
        style={styles.renameModal}
        isVisible={renameModalVisible}
        avoidKeyboard={true}
      >
        <View style={styles.moreModalInner}>
          <TextInput editable />
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colourState }]}
            onPress={() => {
              setBottomModalVisible(false);
              setSelectMode(false);
            }}
          >
            <Text>{'Rename file'}</Text>
          </TouchableOpacity>

          <BottomModalButton type={bottomModalType} />
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
            defaultValue={'temp'}
          />
          <TouchableOpacity
            style={[styles.renameFileButton, { backgroundColor: colourState }]}
            state={null}
            onPress={() => {
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
    </SafeAreaView>
  );
};
export default ViewAll;

const styles = StyleSheet.create({
  viewAllPage: {
    backgroundColor: '#ffffffff',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    flex: 1,
    marginRight: 0,
  },
  viewAllTopBar: {
    width: '100%',
    flexShrink: 1,
    resizeMode: 'contain',
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
    flexDirection: 'column',
    top: 0,
    zIndex: 999,
    minHeight: 112,
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
    paddingLeft: 15,
    height: '5%',
    width: '100%',
    minHeight: 28,
    paddingTop: 5,
  },
  searchBarGroup: {
    width: '85%',
    flexShrink: 1,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 38,
    backgroundColor: '#ffffffff',
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: '#d0d5ddff',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 2.5,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  searchInput: {
    backgroundColor: '#ffffffff',
    borderRadius: 8,
    color: '#667084ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    padding: 5,
    flexGrow: 1,
  },
  searchIconFrame: {
    resizeMode: 'contain',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  recentPdfTiles: {
    height: '70%',
    paddingLeft: 15,
    paddingRight: 15,
    overflow: 'visible',
  },
  viewAllBottomBar: {
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
  },
  backButton: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButton: {
    flexShrink: 1,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderByGroup: {
    flexShrink: 1,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginVertical: 5,
    paddingHorizontal: 7,
  },
  orderByLabel: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    padding: 3,
    flexShrink: 1,
    width: 50,
  },
  orderByDropdown: {
    flexShrink: 1,
    backgroundColor: '#ffffffff',
    borderRadius: 8,
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
    flexDirection: 'row',
    marginVertical: 5,
    width: 65,
  },
  orderByDropdownText: {
    color: '#667084ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 18,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    padding: 10,
  },
  orderByDropDownText_box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  orderByDropdownStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    borderRadius: 8,
  },
  orderByDropdownTextStyle: {
    color: '#667084ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 18,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    padding: 10,
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
    height: '10%',
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
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    backgroundColor: '#ffffffff',
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
    height: 40,
  },
});
