import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  DeviceEventEmitter,
  NativeAppEventEmitter,
} from 'react-native';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import GroupTile from '../shared-components/group-tile/group-tile.js';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import GroupDisplay from '../shared-components/group-display/group-display.js';
import groupLocalAccess from '../shared-components/local-groups-access/local-groups-access';
import { useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectColour, selectEmail } from '../../../../../../apps/client/src/app/slices/user.slice';
import pdfLocalAccess from '../shared-components/local-pdfs-access/local-pdfs-access'

export const Groups = ({ navigation }) => {
  const groupRef = useRef();
  const colourState = useSelector(selectColour);
  const userEmail = useSelector(selectEmail);
  const [moreVisible, setMoreVisible] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [bottomModalType, setBottomModalType] = useState('none');
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [currOrderValue, setCurrOrderValue] = useState('Date');
  const [renameVisible, setRenameVisible] = useState(false);
  const [newName, setNewName] = useState(null);
  // const [refreshPage, setRefreshPage] = useState('');

  const url = 'https://awesome.contents.com/';
  const title = 'Awesome Contents';
  const message = 'Please check this out.';

  //Queries and mutations
  const CREATE_GROUP = gql`
    mutation createGroup(
      $email: String!
      $groupName: String!
    ) {
      createGroup(email: $email, groupName: $groupName) {
        name
        admin
        users
        description
        pdfs
      }
    }
  `;
  const [createGroup] = useMutation(CREATE_GROUP);
  //variables for object sorting
  const [objArr, setObjArr] = useState([]);

  const options = {
    title,
    url,
    message,
  };

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
              title: 'Sharing group file from awesome share app',
              message: 'Please take a look at this file',
              url: '../assets/thereactnativebook-sample.group',
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

  // function changeArray(index, itemValue) {
  //   if (currOrderValue !== itemValue) {
  //     setCurrOrderValue(itemValue);
  //     // Sort PDFs array according to currOrderValue
  //     switch (itemValue) {
  //       case 'Name':
  //         var temp2 = objArr;
  //         temp2.sort((a, b) => {
  //           if (a.name < b.name) return -1;
  //           return 1;
  //         });
  //         setObjArr(temp2);
  //         console.log(objArr);
  //         break;
  //       case 'Date':
  //         var temp = objArr;
  //         temp.sort((a, b) => {
  //           if (new Date(a.creationDate) > new Date(b.creationDate)) return -1;
  //           return 1;
  //         });
  //         setObjArr(temp);
  //         console.log(objArr);
  //         break;
  //     }
  //   }
  //   refresh();
  //   console.log(itemValue);
  // }

  // function filterGroup(text) {
  //   const temp = [];
  //   for (let i = 0; i < groupLocalAccess.getLength(); i++)
  //     objArr[i] = groupLocalAccess.get(i);
  //   for (let i = 0; i < objArr.length; i++) {
  //     if (objArr[i].name.indexOf(text) !== -1) temp.push(objArr[i]);
  //   }
  //   setObjArr(temp);
  //   refresh();
  // }

  return (
    <SafeAreaView style={styles.groupsPage}>
      <View style={styles.groupsTopBar}>
        <View style={styles.big_title_box}>
          <Text style={styles.big_title}>{'Groups'}</Text>
        </View>

        <View style={styles.searchBarGroup}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={(text) => {
              groupLocalAccess.filterGroups(text);
              groupRef.current.refreshPfds();//TypeError: undefined is not an object (evaluating 'groupRef.current.refreshPfds')
            }}
          />
          <View style={styles.searchIconFrame}>
            <Icon color="#667084ff" name="search" size={24} />
          </View>
        </View>
      </View>
{/*
      <GroupDisplay
        navigation={navigation}
        selectMode={selectMode}
        ref={groupRef}
      /> */
      //List of groups
      }
      <GroupDisplay
        navigation={navigation}
        selectMode={selectMode}
        ref={groupRef}
        add={false}
      />
      {
      //   <View style={styles.groupTiles}>
      //   <GroupTile
      //     key={'1'}
      //     id={'1'}
      //     name={'Group1'}
      //     thumbnailSource={{
      //       uri:
      //       'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg',
      //     }}
      //     description={'test'}
      //     groupSource={'groupRefresh'}
      //     nav={navigation}
      //   />
      //   <GroupTile
      //     key={'2'}
      //     id={'2'}
      //     name={'Group2'}
      //     thumbnailSource={{
      //       uri:
      //       'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg',
      //     }}
      //     text={'blah'}
      //     groupSource={'groupRefresh'}
      //     nav={navigation}
      //   />
      // </View>
      }
      {
        //Bottom Bar
      }

      <View style={styles.viewAllBottomBar}>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => {
            setMoreVisible(true)
          }}
        >
          <Icon name="plus" color={colourState} size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (pdfLocalAccess.isSet.length !== 0){
              pdfLocalAccess.clearDisplay();
              pdfLocalAccess.allPdfs.forEach((pdf) => { pdfLocalAccess.displayPdfs.push(pdf); });
              NativeAppEventEmitter.emit('updatePage');
              pdfLocalAccess.isSet.length = 0;
            }
            navigation.navigate('Home')
          }}
        >
          <Icon name="angle-left" color="#344053ff" size={30} />
        </TouchableOpacity>
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
          <TextInput
            style={styles.groupNameInput}
            onChangeText={setNewName}
            value={newName}
            placeholder="Name your group"
          />

          <View style={styles.moreModalButtonDivider} />

          <TouchableOpacity
            style={[styles.moreModalButton, { backgroundColor: colourState }]}
            onPress={() => {
              // console.log(userEmail);
              // console.log(newName);
              createGroup({
                variables: {
                  email: userEmail,
                  groupName: newName,
                }
              }).then((result)=>{
                NativeAppEventEmitter.emit("reloadGroup");
                setNewName("");
              }).catch((e)=>{
                console.log(e);
                setNewName("");
              });
              setMoreVisible(false);
            }}
          >
            <View style={styles.moreModalButtonContent}>
              <View style={styles.moreModalButtonText_box}>
                <Text style={styles.moreModalButtonText}>{'Create Group'}</Text>
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
export default Groups;

const styles = StyleSheet.create({
  groupsPage: {
    backgroundColor: '#ffffffff',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    flex: 1,
    marginRight: 0,
  },
  groupsTopBar: {
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
    minHeight: 35,
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
    paddingVertical: 5
  },
  groupTiles: {
    flexGrow: 1,
    overflow: 'visible',
  },
  viewAllBottomBar: {
    width: '100%',
    height: '8%',
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
    paddingHorizontal: 7
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
    width: '70%',
    flexShrink: 1,
    backgroundColor: '#f5f5f5ff',
    borderRadius: 8,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#667084ff',
    opacity: 1,
  },
  groupNameInput:{
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 5,
    //height: '20%',
    textAlign: 'center',
    textAlignVertical: 'center',
    flexShrink: 1,
  },
  moreModalButton: {
    flexGrow: 1,
    //height: '8%',
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    margin: 10,
  },
  moreModalButtonContent: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  moreModalButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    margin: 10,
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
