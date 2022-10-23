import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  NativeAppEventEmitter,
  SafeAreaView,
} from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import DocumentPicker, { types } from 'react-native-document-picker';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectColour, selectEmail } from '../../../../../../apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { changeName, removeGroup, changeDesc} from '../../../../../../apps/client/src/app/slices/group.slice';
import MemberTile from '../shared-components/member-tile/member-tile.js';
import groupsLocalAccess from '../shared-components/local-groups-access/local-groups-access';
import Loading from '../shared-components/loading/loading';


export const GroupInfo = ({ route, navigation }) => {

    const [selectMode, setSelectMode] = useState(false);
    const colourState = useSelector(selectColour);
    const userName = useSelector(selectEmail);
    const [bottomModalVisible, setBottomModalVisible] = useState(false);
    const [adminState, setAdminState] = useState(false);
    const [renameVisible, setRenameVisible] = useState(false);
    const [describeVisible,setDescribeVisible] = useState(false);
    const [inviteVisible, setInviteVisible] = useState(false);
    const [editDescriptionVisible, setEditDescriptionVisible] = useState(false);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [removeConfirmVisible, setRemoveConfirmVisible] = useState(false);
    const [leaveConfirmVisible, setLeaveConfirmVisible] = useState(false);
    const [fileResponse, setFileResponse] = useState([]);
    const [newUser, setNewUser] = useState('');
    const [newName, setNewName] = useState('');
    const [newDesc,setNewDesc] = useState('');
    const [load,setLoad] = useState(false);
    const dispatch = useDispatch();

    const { groupObject } = route.params;
    useEffect(()=>{
      if (groupObject.admin === userName) setAdminState(true);
      else setAdminState(false);
    })
    //console.log(thumbnailSource);
    const RENAME = gql`
      mutation setName(
        $groupName: String!
        $newName: String!
      ) {
        renameGroup(groupName: $groupName, newName: $newName)
      }
    `;
    const CHANGE_DESCRIPTION = gql`
      mutation chngDesc(
        $groupName: String!
        $description: String!
      ) {
        updateDescription(groupName: $groupName, description: $description)
      }
    `;
  const DELETE = gql`
    mutation delete(
      $groupName: String!
    ) {
      deleteGroup(groupName: $groupName)
    }
  `;
  const REMOVE_USER = gql`
    mutation removeUserFrom(
      $user: String!
      $groupName: String!
    ) {
      removeUserFrom(user: $user, groupName: $groupName)
    }
  `;
  const ADD_USER = gql`
    mutation addUserTo(
      $user: String!
      $groupName: String!
    ) {
      addUserTo(user: $user, groupName: $groupName) {
        name,
        admin,
        users,
        pdfs
      }
    }
  `;

  const [rename] = useMutation(RENAME);
  const [chngDesc] = useMutation(CHANGE_DESCRIPTION);
  const [delete_group] = useMutation(DELETE);
  const [remove] = useMutation(REMOVE_USER);
  const [add] = useMutation(ADD_USER);

  async function renameGroup() {
    // console.log(groupObject.name);
    groupsLocalAccess.renameGroup(groupObject.name, newName);
    NativeAppEventEmitter.emit('reloadGroup');
    await rename({ variables: { groupName: groupObject.name, newName: newName } });
    //dispatch(changeName({ id: id.id, name: newName }));
  }

  async function updateDescription() {
    groupObject.description = newDesc;
    groupsLocalAccess.chngDesc(groupObject.name, newDesc);
    await chngDesc({variables: {groupName: groupObject.name, description: newDesc}});
    //dispatch(changeDesc({id:id.id, desc: newDesc}));
  }

  async function deleteGroup() {
    groupsLocalAccess.deleteGroup(groupObject.name);
    NativeAppEventEmitter.emit("updateGroups");
    await delete_group({ variables: { groupName:groupObject.name } });
    //dispatch(removeGroup({ id: id.id }));
  }
  
  async function removeUser(userID){
    groupsLocalAccess.removeUser(userID, groupObject.name);
    NativeAppEventEmitter.emit("updateGroups");
    await remove({variables:{user:userID, groupName: groupObject.name}}).catch((e)=>{
      console.log(e);
    });
  }

  async function addUser(userID){
    // console.log(userID);
    // console.log(groupObject.name);
    await add({variables:{user:userID, groupName: groupObject.name}}).then(()=>{
      groupsLocalAccess.addUser(userID, groupObject.name);
      setNewUser("");
    }).catch((e)=>{
      console.log(e);
      setNewUser("");
    });
  }

    function AdminGroupButtons(){
      if(adminState){
        return (
          <View style={styles.buttonsGroup}>
            <View style={styles.deleteButtonBox}>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => {
                  setDeleteConfirmVisible(true);
                }} 
              >
                <Text style={styles.deleteButtonText}>Delete Group</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
      return (
        <View style={styles.buttonsGroup}>
          <View style={styles.leaveButtonBox}>
            <TouchableOpacity 
              style={styles.leaveButton}
              onPress={() => {
                setLeaveConfirmVisible(true);
              }} 
            >
              <Text style={styles.leaveButtonText}>Leave Group</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    function AdminMemberButtons(){
      if(adminState){
        return (
          <View style={styles.membersButtonsGroup}> 
            <View style={styles.inviteButtonBox}>
              <TouchableOpacity 
                style={styles.invitebutton}
                onPress={() => {
                  setInviteVisible(true);
                }}
              >
                <Icon name="plus" size={30} color={colourState.accent} />
              </TouchableOpacity>
            </View>
            <View style={styles.removeButtonBox}>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => {
                  if (selectMode) {
                    setSelectMode(false);
                    setBottomModalVisible(false);
                  } else {
                    setSelectMode(true);
                    setBottomModalVisible(true);
                  }
                }}
              >
                <Icon name="minus" size={30} color={colourState.accent} />
              </TouchableOpacity>
            </View>
          </View>
        )
      }
      return null;
    }

    function ConditionalGroupHeader(){
      if(adminState){
        return (
          <View style={styles.groupPageHeaderGroup}>
            <View style={styles.groupThumbnailBox}>
              <View
                style={styles.groupThumbnail}
                backgroundColor={colourState.accent}
              >
                <Text style={[styles.groupThumbnailText, {color: colourState.mode}]}>{groupObject.name.charAt(0)}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.groupNameBox}
              onPress={() => {
                setRenameVisible(true);
              }}
            >
                <Text style={[styles.groupName, {color: colourState.top}]} numberOfLines={1}>{groupObject.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.groupTextBox}
              onPress={() => {
                setEditDescriptionVisible(true);
              }}
            >
              <Text style={[styles.groupText, {color: colourState.high}]} numberOfLines={2}>{groupObject.description}</Text>
            </TouchableOpacity>
          </View>
          
        )
      }
      return (
        <View style={styles.groupPageHeaderGroup}>
          <View style={styles.groupThumbnailBox}>
            <View
              style={styles.groupThumbnail}
              backgroundColor={colourState.accent}
            >
              <Text style={[styles.groupThumbnailText, {color: colourState.mode}]}>{groupObject.name.charAt(0)}</Text>
            </View>
          </View>

          <View style={styles.groupNameBox}>
            <Text style={[styles.groupName, {color: colourState.top}]} numberOfLines={1}>{groupObject.name}</Text>
          </View>

          <View style={styles.groupTextBox}>
            <Text style={[styles.groupText, {color: colourState.high}]} numberOfLines={2}>{groupObject.description}</Text>
          </View>
        </View>
        
      )
    }
  return (
    <SafeAreaView style={[styles.groupPage, {backgroundColor: colourState.mode}]}>
      
      <ConditionalGroupHeader/>

      <AdminGroupButtons/>

      <View style={styles.membersSection}>
        <View style={styles.membersSectionHeader}>
          <View style={styles.membersTitleBox}>
            <Text style={[styles.membersTitle, {color: colourState.high}]}>{'Members'}</Text>
          </View>
          <AdminMemberButtons/>
        </View>

        <View style={[styles.searchBarGroup, {backgroundColor: colourState.mode}, {borderColor: colourState.low}, {shadowColor: colourState.mode}]}>
          <TextInput
            style={[styles.searchInput, {backgroundColor: colourState.mode}, {color: colourState.high}]}
            placeholder="Search"
            placeholderTextColor={colourState.low}
            onChangeText={(text) => {
            //groupLocalAccess.filterGroups(text);
            //groupRef.current.refreshPfds();
            }}
          />
          <View style={styles.searchIconFrame}>
            <Icon color={colourState.low} name="search" size={24} />
          </View>
        </View>
            {
              //We can use map to generate the list of member tiles based on the users array in the group
            }
        <ScrollView style={styles.groupMembersBox}>
          {groupObject.users.map((item, key) => (
            <MemberTile
              key={key}
              name={item}
              showCheck={selectMode}
            />
          ))}
        </ScrollView>
      </View>

      <View style={[styles.groupPageFooter, {backgroundColor: colourState.low}, {borderColor: colourState.mode}, {shadowColor: colourState.mode}]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="angle-left" color={colourState.top} size={30}/>
        </TouchableOpacity>
      </View>

      <Modal
        style={styles.modal}
        isVisible={renameVisible}
        hasBackdrop={true}
        backdropColor={colourState.mode}
        onBackdropPress={() => setRenameVisible(false)}
        //onModalHide={() => setFileSelected(false)}
      >
        <View style={[styles.actionModalInner, {backgroundColor: colourState.bottom}, {borderColor: colourState.low}]}>
          <TextInput
            style={[styles.actionModalTextInput, {backgroundColor: colourState.mode}, {color: colourState.top}]}
            defaultValue={groupObject.name}
            onChangeText={(text) => {
              setNewName(text);
            }}
          />
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState.accent }, {shadowColor: colourState.mode}]}
            state={null}
            onPress={() => {
              console.log('renaming the group to ' + newName);
              renameGroup();
              setRenameVisible(false);
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={[styles.actionModalButtonText, {color: colourState.mode}]}>{'Rename'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      
      <Modal
        style={styles.modal}
        isVisible={describeVisible}
        hasBackdrop={true}
        backdropColor={colourState.mode}
        onBackdropPress={() => setDescribeVisible(false)}
        //onModalHide={() => setFileSelected(false)}
      >
        <View style={[styles.actionModalInner, {backgroundColor: colourState.bottom}, {borderColor: colourState.low}]}>
          <TextInput
            style={[styles.actionModalTextInput, {backgroundColor: colourState.mode}, {color: colourState.top}]}
            defaultValue={groupObject.description}
            onChangeText={(text) => {
              setNewDesc(text);
            }}
          />
          <TouchableOpacity
            style={[styles.actionFileButton, { backgroundColor: colourState.accent }, {shadowColor: colourState.mode}]}
            state={null}
            onPress={() => {
              console.log('Change the description to' + groupObject.description);
              updateDescription();
              setDescribeVisible(false);
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={[styles.actionModalButtonText, {color: colourState.mode}]}>{'Change Description'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        style={styles.modal}
        isVisible={editDescriptionVisible}
        hasBackdrop={true}
        backdropColor={colourState.mode}
        onBackdropPress={() => setEditDescriptionVisible(false)}
        //onModalHide={() => setFileSelected(false)}
      >
        <View style={[styles.actionModalInner, {backgroundColor: colourState.bottom}, {borderColor: colourState.low}]}>
          <TextInput
            style={[styles.actionModalLargeTextInput, {backgroundColor: colourState.mode}, {color: colourState.top}]}
            defaultValue={groupObject.name}
            onChangeText={(text) => {
              //setNewDescription(text);
            }}
            numberOfLines={4}
            multiline={true}
          />
          <TouchableOpacity
            style={[styles.actionFileButton, { backgroundColor: colourState.accent }, {shadowColor: colourState.mode}]}
            state={null}
            onPress={() => {
              //console.log('renaming the pdf to ' + newName);
              //editDescription();
              setEditDescriptionVisible(false);
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={[styles.actionModalButtonText, {color: colourState.mode}]}>{'Save'}</Text>
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
        <View style={[styles.actionModalInner, {backgroundColor: colourState.bottom}, {borderColor: colourState.low}]}>
          <Text style={[styles.modalTitle, {color: colourState.top}]}>
            {'Are you sure you want to delete ' + groupObject.name + '?'}
          </Text>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState.accent }, {shadowColor: colourState.mode}]}
            state={null}
            onPress={() => {
              setDeleteConfirmVisible(false);
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={[styles.actionModalButtonText, {color: colourState.mode}]}>{'Cancel'}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState.accent }, {shadowColor: colourState.mode}]}
            state={null}
            onPress={() => {
              setLoad(true);
              deleteGroup().then(()=>{
                navigation.navigate('Groups');
                setLoad(false);
              }).catch(e=>console.log(e));
              setDeleteConfirmVisible(false);
              NativeAppEventEmitter.emit('updatePage');
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={[styles.actionModalButtonText, {color: colourState.mode}]}>{'Delete Group'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        style={styles.modal}
        isVisible={leaveConfirmVisible}
        hasBackdrop={true}
        backdropColor={colourState.mode}
        onBackdropPress={() => setLeaveConfirmVisible(false)}
      >
        <View style={[styles.actionModalInner, {backgroundColor: colourState.bottom}, {borderColor: colourState.low}]}>
          <Text style={styles.modalTitle}>
            {'Are you sure you want to leave ' + groupObject.name + '?'}
          </Text>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState.accent }, {shadowColor: colourState.mode}]}
            state={null}
            onPress={() => {
              setLeaveConfirmVisible(false);
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={[styles.actionModalButtonText, {color: colourState.mode}]}>{'Cancel'}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState.accent }, {shadowColor: colourState.mode}]}
            state={null}
            onPress={() => {
              setLoad(true);
              removeUser(userName).then(()=>{
                navigation.navigate('Groups');
                setLoad(false);
              }).catch(e=>console.log(e));
              setLeaveConfirmVisible(false);
              NativeAppEventEmitter.emit('updatePage');
              // NativeAppEventEmitter.emit('reloadGroup');
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={[styles.actionModalButtonText, {color: colourState.mode}]}>{'Leave Group'}</Text>
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

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setBottomModalVisible(false)
              setSelectMode(false)
              setRemoveConfirmVisible(true)
            }}
          >
            <Icon name="trash-o" color={colourState.mode} size={25} />
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        style={styles.modal}
        isVisible={inviteVisible}
        hasBackdrop={true}
        backdropColor={colourState.mode}
        onBackdropPress={() => setInviteVisible(false)}
        //onModalHide={() => setFileSelected(false)}
      >
        <View style={[styles.actionModalInner, {backgroundColor: colourState.bottom}, {borderColor: colourState.low}]}>
          <View style={[styles.actionModalTextInputGroup, {backgroundColor: colourState.mode}]}>
            <View style={styles.mailIconContainer}>
              <Icon
                style={{ color: colourState.accent }}
                name="envelope"
                size={20}
              />
            </View>
            <TextInput
              style={[styles.inviteTextInput, {backgroundColor: colourState.mode}, {color: colourState.top}]}
              onChangeText={setNewUser}
              value={newUser}
              placeholder="johnsmith@gmail.com"
              placeholderTextColor={colourState.low}
            />
          </View>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState.accent }, {shadowColor: colourState.mode}]}
            state={null}
            onPress={() => {
              addUser(newUser);
              setInviteVisible(false);
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={[styles.actionModalButtonText, {color: colourState.mode}]}>{'Invite'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        style={styles.modal}
        isVisible={removeConfirmVisible}
        hasBackdrop={true}
        backdropColor={colourState.mode}
        onBackdropPress={() => setRemoveConfirmVisible(false)}
        //onModalHide={() => setFileSelected(false)}
      >
        <View style={[styles.actionModalInner, {backgroundColor: colourState.bottom}, {borderColor: colourState.low}]}>
          <Text style={styles.modalTitle}>
            {'Are you sure you want to remove * members?'}
          </Text>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState.accent }, {shadowColor: colourState.mode}]}
            state={null}
            onPress={() => {
              setRemoveConfirmVisible(false);
              setSelectMode(false);
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={[styles.actionModalButtonText, {color: colourState.mode}]}>{'Cancel'}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState.accent }, {shadowColor: colourState.mode}]}
            state={null}
            onPress={() => {
              // Delete the pdf
              //deletePdf();
              setRemoveConfirmVisible(false);
              setSelectMode(false);
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={[styles.actionModalButtonText, {color: colourState.mode}]}>{'Remove'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        style={styles.modal}
        isVisible={load}
        backdropColor=""
        hasBackdrop={true}
      >
        <View style={styles.loadModal}>
          <Loading 
            width={100}
            height={100}
            load={true}
            text={''}
          />
        </View>
      </Modal>
      
    </SafeAreaView>
  );
};
export default GroupInfo;

const styles = StyleSheet.create({
  groupPage: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1,
    
  },
  groupPageHeaderGroup: {//Make this smaller
    //flexShrink: 1,
    flex: 4,
    padding: 0,
    alignItems: 'center',
  },
  groupThumbnailBox: {
    borderRadius: 180,
    aspectRatio: 1,
    width: '25%',
    margin: 10,
  },
  groupNameBox: {
    //flexShrink: 1,
    height: '20%',
  },
  groupName: {
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 24,
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
  },
  groupTextBox: {
    width: '80%',
    flexShrink: 1,
    numberOfLines: 2,
  },
  groupText: {
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 18,
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
  },
  buttonsGroup: {
    //flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //paddingBottom: 15,
    flex: 1
  },
  leaveButtonBox: {
    flexShrink: 1,
    width: '50%',
  },
  leaveButton: {

  },
  leaveButtonText: {
    color: 'red',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
  },
  deleteButtonBox: {
    flexShrink: 1,
    width: '50%',
  },
  deleteButton: {

  },
  deleteButtonText: {
    color: 'red',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,

  },
  membersSection: {
    //alignItems: 'center',
    justifyContent: 'center',
    flex: 8
  },
  membersSectionHeader: {
    flexDirection: 'row',
    flexShrink: 1,
    width: '100%',
  },
  membersTitleBox: {
    flexGrow: 1,
    margin: 10,
    alignContent: 'center',
    alignItems: 'flex-start',
  },
  membersTitle: {
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
  },
  membersButtonsGroup: {
    flexShrink: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  inviteButtonBox: {
    paddingHorizontal: 10,
  },
  invitebutton: {

  },
  removeButtonBox: {
    paddingHorizontal: 10,
  },
  removeButton: {

  },
  searchBarGroup: {
    width: '85%',
    flexShrink: 1,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
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
    alignSelf: 'center',
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
  groupMembersBox: {
    flexGrow: 1,
    overflow: 'visible',
    
  },
  groupPageFooter: {
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
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    padding: 10,

  },
  modal: {
    alignSelf: 'center',
    width: '70%',
  },
  loadModal:{

  },
  actionModalInner: {
    //width: '90%',
    flexShrink: 1,
    borderRadius: 7,
    flexDirection: 'column',
    borderWidth: 1,
    alignItems: 'center',
  },
  actionModalButton: {
    flexGrow: 1,
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionButton: {
    flexGrow: 1,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 8,
    elevation: 2,
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  actionFileButton: {
    flexGrow: 1,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 8,
    elevation: 2,
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  actionModalButtonContent: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //padding: 5
  },
  actionModalButtonText: {
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
  },
  actionModalButtonText_box: {
    flexShrink: 1,
  },
  mailIconContainer: {
    flexGrow: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
  },
  actionModalTextInputGroup: {
    flexShrink: 1,
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
  inviteTextInput: {
    flexShrink: 1,
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    borderRadius: 8,
    marginHorizontal: 10,
    height: 40,
    width: '80%',
  },
  actionModalTextInput: {
    flexShrink: 1,
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
    height: 40,
    width: '90%',
  },
  actionModalLargeTextInput: {
    flexShrink: 1,
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
    height: 40,
    width: '90%',
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
  modalBottomBar: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    //flexShrink: 1,
    justifyContent: 'center',
    //alignSelf: 'flex-end'
  },
  groupThumbnail: {
    flexGrow: 1,
    resizeMode: 'center',
    borderRadius: 180,
    justifyContent: "center",
  },
  groupThumbnailText: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
  },
});
