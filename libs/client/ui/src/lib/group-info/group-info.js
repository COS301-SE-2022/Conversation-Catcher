import React, { useState, useCallback, useRef } from 'react';
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


export const GroupInfo = ({ route, navigation }) => {

    const [selectMode, setSelectMode] = useState(false);
    const colourState = useSelector(selectColour);
    const userName = useSelector(selectEmail);
    const [bottomModalVisible, setBottomModalVisible] = useState(false);
    const [adminState, setAdminState] = useState(true);
    const [renameVisible, setRenameVisible] = useState(false);
    const [describeVisible,setDescribeVisible] = useState(false);
    const [inviteVisible, setInviteVisible] = useState(false);
    const [editDescriptionVisible, setEditDescriptionVisible] = useState(false);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [removeConfirmVisible, setRemoveConfirmVisible] = useState(false);
    const [leaveConfirmVisible, setLeaveConfirmVisible] = useState(false);
    const [fileResponse, setFileResponse] = useState([]);
    const [newName, setNewName] = useState('');
    const [newDesc,setNewDesc] = useState('');
    const dispatch = useDispatch();

    const { groupObject } = route.params;
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
      addUserTo(user: $user, groupName: $groupName)
    }
  `;

  const [rename] = useMutation(RENAME);
  const [chngDesc] = useMutation(CHANGE_DESCRIPTION);
  const [delete_group] = useMutation(DELETE);
  const [remove] = useMutation(REMOVE_USER);
  const [add] = useMutation(ADD_USER);

  async function renameGroup() {
    console.log(groupObject.name);
    groupsLocalAccess.renameGroup(groupObject.name, newName);
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
    await delete_group({ variables: { groupName:groupObject.name } });
    //dispatch(removeGroup({ id: id.id }));
  }
  
  async function removeUser(userID){//define all this in respective files
    groupsLocalAccess.removeUser(userID, groupObject.name)
    await remove({variables:{user:userID, groupName: groupObject.name}});
    //dispatch(removeUser({id:id.id, user: userID}));
  }

  async function addUser(userID){//define all this in respective files
    groupsLocalAccess.addUser(userID, groupObject.name)
    await add({variables:{user:userID, groupName: groupObject.name}});
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
                <Icon name="plus" size={30} color={colourState} />
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
                <Icon name="minus" size={30} color={colourState} />
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
                backgroundColor={groupObject.thumbnail}
              >
                <Text style={styles.groupThumbnailText}>{groupObject.name.charAt(0)}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.groupNameBox}
              onPress={() => {
                setRenameVisible(true);
              }}
            >
                <Text style={styles.groupName} numberOfLines={1}>{groupObject.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.groupTextBox}
              onPress={() => {
                setDescribeVisible(true);
                setEditDescriptionVisible(true);
              }}
            >
              <Text style={styles.groupText} numberOfLines={2}>{groupObject.description}</Text>
            </TouchableOpacity>
          </View>
          
        )
      }
      return (
        <View style={styles.groupPageHeaderGroup}>
          <View style={styles.groupThumbnailBox}>
            <View
              style={styles.groupThumbnail}
              backgroundColor={groupObject.thumbnail}
            >
              <Text style={styles.groupThumbnailText}>{groupObject.name.charAt(0)}</Text>
            </View>
          </View>

          <View style={styles.groupNameBox}>
            <Text style={styles.groupName} numberOfLines={1}>{groupObject.name}</Text>
          </View>

          <View style={styles.groupTextBox}>
            <Text style={styles.groupText} numberOfLines={2}>{groupObject.description}</Text>
          </View>
        </View>
        
      )
    }
  return (
    <SafeAreaView style={styles.groupPage}>
      
      <ConditionalGroupHeader/>

      <AdminGroupButtons/>

      <View style={styles.membersSection}>
        <View style={styles.membersSectionHeader}>
          <View style={styles.membersTitleBox}>
            <Text style={styles.membersTitle}>{'Members'}</Text>
          </View>
          <AdminMemberButtons/>
        </View>

        <View style={styles.searchBarGroup}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={(text) => {
            //groupLocalAccess.filterGroups(text);
            //groupRef.current.refreshPfds();
            }}
          />
          <View style={styles.searchIconFrame}>
            <Icon color="#667084ff" name="search" size={24} />
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

      <View style={styles.groupPageFooter}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="angle-left" color={colourState} size={30}/>
        </TouchableOpacity>
      </View>

      <Modal
        style={styles.modal}
        isVisible={renameVisible}
        hasBackdrop={true}
        backdropColor="white"
        onBackdropPress={() => setRenameVisible(false)}
        //onModalHide={() => setFileSelected(false)}
      >
        <View style={styles.actionModalInner}>
          <TextInput
            style={styles.actionModalTextInput}
            defaultValue={groupObject.name}
            onChangeText={(text) => {
              setNewName(text);
            }}
          />
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState }]}
            state={null}
            onPress={() => {
              console.log('renaming the group to ' + newName);
              renameGroup();
              setRenameVisible(false);
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={styles.actionModalButtonText}>{'Rename'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      
      <Modal
        style={styles.modal}
        isVisible={describeVisible}
        hasBackdrop={true}
        backdropColor="white"
        onBackdropPress={() => setDescribeVisible(false)}
        //onModalHide={() => setFileSelected(false)}
      >
        <View style={styles.actionModalInner}>
          <TextInput
            style={styles.actionModalTextInput}
            defaultValue={groupObject.description}
            onChangeText={(text) => {
              setNewDesc(text);
            }}
          />
          <TouchableOpacity
            style={[styles.actionFileButton, { backgroundColor: colourState }]}
            state={null}
            onPress={() => {
              console.log('Change the description to' + groupObject.description);
              updateDescription();
              setDescribeVisible(false);
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={styles.actionModalButtonText}>{'Change Description'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        style={styles.modal}
        isVisible={editDescriptionVisible}
        hasBackdrop={true}
        backdropColor="white"
        onBackdropPress={() => setEditDescriptionVisible(false)}
        //onModalHide={() => setFileSelected(false)}
      >
        <View style={styles.actionModalInner}>
          <TextInput
            style={styles.actionModalLargeTextInput}
            defaultValue={groupObject.name}
            onChangeText={(text) => {
              //setNewDescription(text);
            }}
            numberOfLines={4}
            multiline={true}
          />
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState }]}
            state={null}
            onPress={() => {
              //console.log('renaming the pdf to ' + newName);
              //editDescription();
              setEditDescriptionVisible(false);
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={styles.actionModalButtonText}>{'Save'}</Text>
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
        <View style={styles.actionModalInner}>
          <Text style={styles.modalTitle}>
            {'Are you sure you want to delete ' + groupObject.name + '?'}
          </Text>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState }]}
            state={null}
            onPress={() => {
              setDeleteConfirmVisible(false);
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={styles.actionModalButtonText}>{'Cancel'}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState }]}
            state={null}
            onPress={() => {
              deleteGroup();
              setDeleteConfirmVisible(false);
              navigation.goBack();
              NativeAppEventEmitter.emit('updatePage');
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={styles.actionModalButtonText}>{'Delete Group'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        style={styles.modal}
        isVisible={leaveConfirmVisible}
        hasBackdrop={true}
        backdropColor="white"
        onBackdropPress={() => setLeaveConfirmVisible(false)}
      >
        <View style={styles.actionModalInner}>
          <Text style={styles.modalTitle}>
            {'Are you sure you want to leave ' + groupObject.name + '?'}
          </Text>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState }]}
            state={null}
            onPress={() => {
              setLeaveConfirmVisible(false);
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={styles.actionModalButtonText}>{'Cancel'}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState }]}
            state={null}
            onPress={() => {
              removeUser(userName).then(navigation.navigate('Groups')).catch(e=>console.log(e));
              setLeaveConfirmVisible(false);
              NativeAppEventEmitter.emit('updatePage');
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={styles.actionModalButtonText}>{'Leave Group'}</Text>
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

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setBottomModalVisible(false)
              setSelectMode(false)
              setRemoveConfirmVisible(true)
            }}
          >
            <Icon name="trash-o" color="#ffffffff" size={25} />
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        style={styles.modal}
        isVisible={inviteVisible}
        hasBackdrop={true}
        backdropColor="white"
        onBackdropPress={() => setInviteVisible(false)}
        //onModalHide={() => setFileSelected(false)}
      >
        <View style={styles.actionModalInner}>
          <View style={styles.actionModalTextInputGroup}>
            <View style={styles.mailIconContainer}>
              <Icon
                style={{ color: colourState }}
                name="envelope"
                size={20}
              />
            </View>
            <TextInput
              style={styles.inviteTextInput}
            />
          </View>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState }]}
            state={null}
            onPress={() => {
              //console.log('iinviting ' + newName);
              //invite();
              setInviteVisible(false);
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={styles.actionModalButtonText}>{'Invite'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        style={styles.modal}
        isVisible={removeConfirmVisible}
        hasBackdrop={true}
        backdropColor="white"
        onBackdropPress={() => setRemoveConfirmVisible(false)}
        //onModalHide={() => setFileSelected(false)}
      >
        <View style={styles.actionModalInner}>
          <Text style={styles.modalTitle}>
            {'Are you sure you want to remove * members?'}
          </Text>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState }]}
            state={null}
            onPress={() => {
              setRemoveConfirmVisible(false);
              setSelectMode(false);
            }}
          >
            <View style={styles.actionModalButtonContent}>
              <View style={styles.actionModalButtonText_box}>
                <Text style={styles.actionModalButtonText}>{'Cancel'}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colourState }]}
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
                <Text style={styles.actionModalButtonText}>{'Remove'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      
    </SafeAreaView>
  );
};
export default GroupInfo;

const styles = StyleSheet.create({
  groupPage: {
    backgroundColor: '#ffffffff',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1,
    
  },
  groupPageHeaderGroup: {//Make this smaller
    //flexShrink: 1,
    flex: 4,
    padding: 0,
    alignItems: 'center',
    //backgroundColor: '#667084ff',
  },
  groupThumbnailBox: {
    borderRadius: 180,
    backgroundColor: '#667084ff',
    aspectRatio: 1,
    width: '25%',
    margin: 10,
  },
  groupNameBox: {
    flexShrink: 1,
    height: '15%',
  },
  groupName: {
    color: '#344053ff',
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
    //backgroundColor: '#667084ff',
    numberOfLines: 2,
  },
  groupText: {
    color: '#667084ff',
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
    //backgroundColor: '#667084ff',
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
    //backgroundColor: '#667084ff',
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
    alignSelf: 'center',
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
  groupMembersBox: {
    flexGrow: 1,
    overflow: 'visible',
    
  },
  groupPageFooter: {
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
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    padding: 10,

  },
  modal: {
    alignSelf: 'center',
  },
  actionModalInner: {
    width: '90%',
    flexShrink: 1,
    backgroundColor: '#d0d5ddff',
    borderRadius: 7,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#667084ff',
  },
  actionModalButton: {
    flexGrow: 1,
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  changeactionModalButton: {
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
  changeactionModalButtonText: {
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
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
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  actionModalButtonContent: {
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //padding: 5
  },
  actionModalButtonText: {
    color: '#ffffffff',
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
  fileactionIconContainer: {
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
    backgroundColor: '#ffffffff',
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
    color: 'black',
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    backgroundColor: '#ffffffff',
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
    color: 'black',
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    backgroundColor: '#ffffffff',
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
    height: 40,
    width: '80%',
  },
  actionModalLargeTextInput: {
    flexShrink: 1,
    textAlign: 'center',
    textAlignVertical: "top",
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
    height: '50%',
    flexWrap: 'wrap',
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
    color: "#ffffff",
    fontSize: 50,
    fontWeight: "bold",
  },
});
