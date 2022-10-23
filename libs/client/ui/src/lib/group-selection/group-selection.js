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
import Loading from '../shared-components/loading/loading.js';

export const GroupSelection = ({ navigation, route }) => {
  const {id} = route.params;
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
  const ADD_TO_GROUP = gql`
    mutation addPdfTo(
      $pdfId: String!
      $groupName: String!
    ) {
      addPdfTo(pdfId: $pdfId, groupName: $groupName)
    }
  `;
  //variables for object sorting
  const [objArr, setObjArr] = useState([]);
  const [addToGroup] = useMutation(ADD_TO_GROUP);
  const [load, setLoad] = useState(false);
  const AddNew = async (g) => {
    console.log(g);
    console.log(id);
    addToGroup({variables:{pdfId: id, groupName: g}}).then((e)=>{
      console.log(e);
      groupLocalAccess.addPdf(id,g);
      navigation.navigate("Home");
      setLoad(false);
    }).catch((e)=>{
      console.log(e);
      setLoad(false);
      navigation.navigate("Home");
    })
  }
  if (groupLocalAccess.addEvent1.length !== 0) {
    //If statement to ensure that only one listener is created for the summarise command
    DeviceEventEmitter.addListener("AddPdf",(group)=>{
      setLoad(true);
      AddNew(group);
    });
    groupLocalAccess.addEvent1.length = 0;
  }

  return (
    <SafeAreaView style={styles.groupsPage}>
      <View style={styles.groupsTopBar}>
        <View style={styles.big_title_box}>
          <Text style={styles.big_title}>{'Select a group'}</Text>
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
      {
      //List of groups
      }
      <Loading
        width={100}
        height={100}
        load={load}
        text={'Adding your document to the group'}
      />
      <GroupDisplay
        navigation={navigation}
        selectMode={selectMode}
        ref={groupRef}
        add={true}
      />
      {
        //Bottom Bar
      }

      <View style={styles.viewAllBottomBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="angle-left" color="#344053ff" size={30} />
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};
export default GroupSelection;

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
