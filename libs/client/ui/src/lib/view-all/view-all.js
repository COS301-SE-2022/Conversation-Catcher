import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  NativeAppEventEmitter,
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
import Loading from '../shared-components/loading/loading.js';

export const ViewAll = ({ navigation, route }) => {
  const pdfRef = useRef();
  const colourState = useSelector(selectColour);
  const [moreVisible, setMoreVisible] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [bottomModalType, setBottomModalType] = useState('none');
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  // const [currOrderValue, setCurrOrderValue] = useState('Date');
  const [renameVisible, setRenameVisible] = useState(false);
  const [searchLoad, setSearchLoad] = useState(false);
  // const [refreshPage, setRefreshPage] = useState('');

  const { groupObject } = route.params;

  const url = 'https://awesome.contents.com/';
  const title = 'Awesome Contents';
  const message = 'Please check this out.';

  //variables for object sorting and management
  // const [objArr, setObjArr] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  // const [selectedPdf, setSelectedPdf] = useState(null);
  // const [selectedGroup, setSelectedGroup] = useState(null);

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

  function DetermineTitle(){
    if (groupObject == null){
      if (pdfLocalAccess.isSet.length !== 0){
        pdfLocalAccess.clearDisplay();
        pdfLocalAccess.allPdfs.forEach((pdf) => { pdfLocalAccess.displayPdfs.push(pdf); });
        NativeAppEventEmitter.emit('updatePage');
        pdfLocalAccess.isSet.length = 0;
      }
      return (
        <View style={styles.big_title_box}>
          <Text style={[styles.big_title, {color: colourState.top}]}>{'Conversations'}</Text>
        </View>
      )
    }
    if (pdfLocalAccess.displayPdfs.length !== 0){
      pdfLocalAccess.isSet.push('false');
      pdfLocalAccess.displayPdfs.length = 0;
      NativeAppEventEmitter.emit('updatePage');
      getPdfs({variables: {
        ids: groupObject.pdfs
      }}).then((result) => {
        console.log(result.data)
        result.data.getPDFByArr.forEach((pdf) => {
          pdfLocalAccess.displayPdfs.push(pdf);
        });
        NativeAppEventEmitter.emit('updatePage');

      }).catch((error) => { console.log(error)});
    }
    return (
      <TouchableOpacity
        style={styles.group_title_button}
        onPress={() => {
          navigation.navigate('GroupInfo', { groupObject: groupObject });
        }}
      >
        <View style={[styles.groupThumbnailBox, { borderColor: colourState.accent }]}>
          <View style={[styles.groupThumbnail, {backgroundColor: colourState.accent}]}>
            <Text style={[styles.groupIcon, {color: colourState.mode}]}>{groupObject.name.toUpperCase()[0]}</Text>
          </View>
        </View>
        <View style={styles.groupTile_contents_not_thumbnail}>
          <View style={styles.groupNameBox}>
            <Text style={[styles.groupName, {color: colourState.top}]} numberOfLines={1}>{groupObject.name}</Text>
          </View>
      </View>
      </TouchableOpacity>
    )
  }



  if (pdfLocalAccess.clearSearchInput.length !== 0) {
    //If statement to ensure that only one listener is created for the summarise command
    NativeAppEventEmitter.addListener('clearSearch', () => {
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
          <Icon name="paper-plane-o" color={colourState.mode} size={22} />
        </TouchableOpacity>
      );
    }
    if (props.type === 'rename') {
      return (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setBottomModalVisible(false)}
        >
          <Icon name="pencil-square-o" color={colourState.mode} size={22} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          setSelectMode(false);
          setBottomModalVisible(false);
          NativeAppEventEmitter.emit("DeleteAll");
        }}
      >
        <Icon name="trash-o" color={colourState.mode} size={22} />
      </TouchableOpacity>
    );
  }

  // const onShare = async () => {
  //   try {
  //     const result = await Share.share({
  //       message:
  //         'React Native | A framework for building native apps using React',
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  return (
    <SafeAreaView style={[styles.viewAllPage, {backgroundColor: colourState.mode}]}>
      <View style={[styles.viewAllTopBar, {backgroundColor: colourState.low}, {borderColor: colourState.low}, {shadowColor: colourState.high}]}>
        <DetermineTitle/>

        <View style={[styles.searchBarGroup, {backgroundColor: colourState.mode}, {borderColor: colourState.low}, {shadowColor: colourState.high}]}>
          <TextInput
            style={[styles.searchInput, {backgroundColor: colourState.mode}, {color: colourState.top}]}
            value={searchInput}
            placeholder="Search"
            placeholderTextColor={colourState.low}
            onSubmitEditing={(text) => {
              setSearchLoad(true);
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
                  setSearchLoad(false);
                })
                .catch((error) => {
                  console.log(error);
                  pdfLocalAccess.filterPdfs(text);
                  NativeAppEventEmitter.emit('updatePage');
                  setSearchLoad(false);
                });
            }}
            onChangeText={(text) => {
              setSearchInput(text);
            }}
          />
          <View style={styles.searchIconFrame}>
            <Icon color={colourState.high} name="search" size={24} />
          </View>
        </View>
      </View>
      <Loading 
        width={100}
        height={100}
        load={searchLoad}
        text={'Searching'}
      />
      <PdfDisplay
        navigation={navigation}
        selectMode={selectMode}
        group={groupObject}
        ref={pdfRef}
      />

      <View style={[styles.viewAllBottomBar, {backgroundColor: colourState.low}, {borderColor: colourState.low}, {shadowColor: colourState.high}]}>
        {/* <TouchableOpacity
          style={styles.moreButton}
          onPress={() => setMoreVisible(true)}
        >
          <Icon name="ellipsis-h" color={colourState.top} size={30} />
        </TouchableOpacity> */}

        {/* if uncommenting above, comment the line below*/}
        <View style={styles.moreButton}/>  

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="angle-left" color={colourState.top} size={30} />
        </TouchableOpacity>

        <View style={styles.orderByGroup}>
          <Text style={[styles.orderByLabel, {color: colourState.top}]}>{'Order by'}</Text>
          <ModalDropdown
            options={['Date', 'Name']}
            defaultIndex={0}
            defaultValue={'Name'}
            onSelect={(index, itemValue) => {
              pdfLocalAccess.sortPdfs(itemValue);
              // pdfRef.current.refreshPfds();
              NativeAppEventEmitter.emit('updatePage');
            }}
            style={[styles.orderByDropdown, {backgroundColor: colourState.mode}, {borderColor: colourState.low}, {shadowColor: colourState.high}]}
            textStyle={[styles.orderByDropdownText, {color: colourState.top}]}
            dropdownStyle={styles.orderByDropdownStyle}
            dropdownTextStyle={[styles.orderByDropdownTextStyle, {color: colourState.high}]}
            dropdownTextSelectHighlightStyle={{ color: colourState.bottom }}
            dropdownTextHighlightStyle={{ color: colourState.top }}
          />
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
          {/* <TouchableOpacity
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
                  style={{ color: colourState.accent }}
                  name="paper-plane-o"
                  size={18}
                />
              </View>
              <View style={styles.moreModalButtonText_box}>
                <Text style={[styles.moreModalButtonText, {color: colourState.top}]} ellipsizeMode={'clip'}>
                  {'Share'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.moreModalButtonDivider} /> */}

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
        <View style={[styles.modalBottomBar, { backgroundColor: colourState.accent }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setBottomModalVisible(false);
              setSelectMode(false);
            }}
          >
            <Icon name="angle-left" color={colourState.mode} size={30} />
          </TouchableOpacity>

          <BottomModalButton type={bottomModalType} />
        </View>
      </Modal>

      <Modal
        style={styles.renameModal}
        isVisible={renameModalVisible}
        avoidKeyboard={true}
      >
        <View style={[styles.moreModalInner, {backgroundColor: colourState.bottom}, {borderColor: colourState.low}, {shadowColor: colourState.low}]}>
          <TextInput editable />
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colourState.accent }]}
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
        backdropColor={colourState.mode}
        onBackdropPress={() => setRenameVisible(false)}
        //onModalHide={() => setFileSelected(false)}
      >
        <View style={[styles.renameModalInner, {backgroundColor: colourState.bottom}, {borderColor: colourState.low}]}>
          <TextInput
            style={[styles.renameModalTextInput, {backgroundColor: colourState.mode}]}
            defaultValue={'temp'}
          />
          <TouchableOpacity
            style={[styles.renameFileButton, { backgroundColor: colourState.accent }]}
            state={null}
            onPress={() => {
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
    </SafeAreaView>
  );
};
export default ViewAll;

const styles = StyleSheet.create({
  viewAllPage: {
    flex: 1,
  },
  viewAllTopBar: {
    width: '100%',
    flexShrink: 1,
    resizeMode: 'contain',
    elevation: 2,
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
    minHeight: 90,
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
    paddingLeft: 15,
    height: '5%',
    width: '100%',
    minHeight: 28,
    paddingTop: 5,
  },
  group_title_button : {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    paddingTop: 10,
  },
  searchBarGroup: {
    width: '85%',
    flexShrink: 1,
    Vertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 35,
    marginVertical: 15,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    elevation: 2,
    shadowRadius: 2.5,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    overflow: 'hidden',
  },
  searchInput: {
    borderRadius: 8,
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    padding: 5,
    flexGrow: 1,
    //minHeight: 30,
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
    justifyContent: 'center',
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    elevation: 2,
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
    width: '40%',
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
    height: '10%',
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
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
    height: 40,
  },
  groupThumbnailBox: {
    borderRadius: 180,
    aspectRatio: 1,
    width: '12%',
    marginHorizontal: 5,
  },
  groupThumbnail: {
    flexGrow: 1,
    resizeMode: 'center',
    borderRadius: 180,
    justifyContent: "center",
  },
  groupTile_contents_not_thumbnail: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  groupName: {
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 20,
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
  },
  groupNameBox: {
    flexShrink: 1,
    width: '80%',
    resizeMode: 'contain',
    justifyContent: 'center',
    //paddingVertical: 5,
  },
  groupIcon: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
});
