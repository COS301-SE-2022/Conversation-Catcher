import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  NativeAppEventEmitter,
} from 'react-native';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
// import ModalDropdown from 'react-native-modal-dropdown';
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
  // const [currOrderValue, setCurrOrderValue] = useState('Date');
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
  // const [objArr, setObjArr] = useState([]);

  const options = {
    title,
    url,
    message,
  };

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
    <SafeAreaView style={[styles.groupsPage, {backgroundColor: colourState.mode}]}>
      <View style={[styles.groupsTopBar, {backgroundColor: colourState.low}, {borderColor: colourState.low}, {shadowColor: colourState.high}]}>
        <View style={styles.big_title_box}>
          <Text style={[styles.big_title, {color: colourState.top}]}>{'Groups'}</Text>
        </View>
        <View style={[styles.searchBarGroup, {backgroundColor: colourState.mode}, {borderColor: colourState.low}, {shadowColor: colourState.high}]}>
          <TextInput
            style={[styles.searchInput, {backgroundColor: colourState.mode}, {color: colourState.top}]}
            placeholder="Search"
            placeholderTextColor={colourState.low}
            onChangeText={(text) => {
              groupLocalAccess.filterGroups(text);
              groupRef.current.refreshPfds();//TypeError: undefined is not an object (evaluating 'groupRef.current.refreshPfds')
            }}
          />
          <View style={styles.searchIconFrame}>
            <Icon color={colourState.high} name="search" size={24} />
          </View>
        </View>
      </View>
      {
      //List of groups
      }
      <GroupDisplay
        navigation={navigation}
        selectMode={selectMode}
        ref={groupRef}
        add={false}
      />
      {
        //Bottom Bar
      }
      <View style={[styles.viewAllBottomBar, {backgroundColor: colourState.low}, {borderColor: colourState.low}, {shadowColor: colourState.high}]}>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => {
            setMoreVisible(true)
          }}
        >
          <Icon name="plus" color={colourState.high} size={30} />
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
          <Icon name="angle-left" color={colourState.top} size={30} />
        </TouchableOpacity>
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
          <TextInput
            style={[styles.groupNameInput, {backgroundColor: colourState.mode}, {color: colourState.high}, {borderColor: colourState.low}, {shadowColor: colourState.high}]}
            onChangeText={setNewName}
            value={newName}
            placeholder="Name your group"
            placeholderTextColor={colourState.low}
          />

          <TouchableOpacity
            style={[styles.moreModalButton, { backgroundColor: colourState.accent }]}
            onPress={() => {
              // console.log(userEmail);
              // console.log(newName);
              groupLocalAccess.addGroup({
                name: newName,
                admin: userEmail,
                pdfs:[],
                users:[userEmail],
                description:"Click to edit description...",
              });
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
                <Text style={[styles.moreModalButtonText, {color: colourState.mode}]}>{'Create Group'}</Text>
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
    minHeight: 112,
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
    //shadowColor: 'transparent' /* cannot find mapping from CSS: 0px -4px 4px 0px rgba(0,0,0,0.09803921568627451), https://ethercreative.github.io/react-native-shadow-generator/ */
    borderStyle: 'solid',
    borderWidth: 1,
    elevation: 2,
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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreModalInner: {
    width: '70%',
    flexShrink: 1,
    borderRadius: 8,
    flexDirection: 'column',
    borderWidth: 1,
    opacity: 1,
  },
  groupNameInput:{
    margin: 10,
    padding: 5,
    //height: '20%',
    textAlign: 'center',
    textAlignVertical: 'center',
    flexShrink: 1,
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
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
  modalBottomBar: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    //flexShrink: 1,
    justifyContent: 'center',
    //alignSelf: 'flex-end'
  },
});
