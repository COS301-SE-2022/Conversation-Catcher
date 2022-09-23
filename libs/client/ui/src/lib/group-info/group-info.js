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
import { selectColour } from '../../../../../../apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
//import { selectColour } from 'apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { changeName, removeGroup} from '../../../../../../apps/client/src/app/slices/group.slice';
import MemberTile from '../shared-components/member-tile/member-tile.js';
import groupsLocalAccess from '../shared-components/local-groups-access/local-groups-access';


export const GroupInfo = ({ route, navigation }) => {

    const [selectMode, setSelectMode] = useState(false);
    const colourState = useSelector(selectColour);
    const [bottomModalVisible, setBottomModalVisible] = useState(false);
    const [adminState, setAdminState] = useState(true);
    const [renameVisible, setRenameVisible] = useState(false);
    const [editDescriptionVisible, setEditDescriptionVisible] = useState(false);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [removeConfirmVisible, setRemoveConfirmVisible] = useState(false);
    const [leaveConfirmVisible, setLeaveConfirmVisible] = useState(false);
    const [fileResponse, setFileResponse] = useState([]);
    const [newName, setNewName] = useState('');
    const dispatch = useDispatch();

    const { id, text, name, thumbnailSource } = route.params;

    const RENAME = gql`
    mutation setName($id: String!, $name: String!) {
      renameGroup(id: $id, name: $name) {
        id
        name
        downloaded
      }
    }
  `;

  const DELETE = gql`
    mutation delete($id: String!) {
      deleteGroup(id: $id) {
        id
        name
        text
      }
    }
  `;

  const LEAVE = gql`
    mutation leave($id: String!) {
      leaveGroup(id: $id) {
        id
        name
        text
      }
    }
  `;

  const [rename] = useMutation(RENAME);
  const [delete_group] = useMutation(DELETE);
  const [leave_group] = useMutation(LEAVE);

  async function renameGroup() {
    console.log(id);
    name.name = newName;
    groupsLocalAccess.renameGroup(id.id, newName);
    await rename({ variables: { id: id.id, name: newName } });
    dispatch(changeName({ id: id.id, name: newName }));
  }

  async function deleteGroup() {
    groupsLocalAccess.deleteGroup(id.id);
    await delete_group({ variables: { id: id.id } });
    dispatch(removeGroup({ id: id.id }));
  }

  async function leaveGroup() {
    groupsLocalAccess.leaveGroup(id.id);
    await leave_group({ variables: { id: id.id } });
    dispatch(leaveGroup({ id: id.id }));
  }

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

    function AdminGroupButtons(){
      if(adminState){
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
              <TouchableOpacity style={styles.invitebutton}>
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
            <TouchableOpacity 
              style={styles.groupThumbnailBox}
              onPress={() => {
                handleDocumentSelection();
              }}
            >
              <Image
                style={styles.groupThumbnail}
                source={thumbnailSource.thumbnailSource}
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.groupNameBox}
              onPress={() => {
                setRenameVisible(true);
              }}
            >
                <Text style={styles.groupName} numberOfLines={1}>{name.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.groupTextBox}
              onPress={() => {
                setEditDescriptionVisible(true);
              }}
            >
              <Text style={styles.groupText} numberOfLines={2}>{text.text}</Text>
            </TouchableOpacity>
          </View>
          
        )
      }
      return (
        <View style={styles.groupPageHeaderGroup}>
          <View style={styles.groupThumbnailBox}>
            <Image
              style={styles.groupThumbnail}
              source={thumbnailSource.thumbnailSource}
            />
          </View>

          <View style={styles.groupNameBox}>
            <Text style={styles.groupName} numberOfLines={1}>{name.name}</Text>
          </View>

          <View style={styles.groupTextBox}>
            <Text style={styles.groupText} numberOfLines={2}>{text.text}</Text>
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

        <ScrollView style={styles.groupMembersBox}>
            <MemberTile
                key={'1'}
                id={'1'}
                name={'member1@gmail.com'}
                showCheck={selectMode}
            />
            <MemberTile
                key={'2'}
                id={'2'}
                name={'member2@gmail.com'}
                showCheck={selectMode}
            />
            <MemberTile
                key={'3'}
                id={'3'}
                name={'member3@gmail.com'}
                showCheck={selectMode}
            />
        </ScrollView>
      </View>

      <View style={styles.groupPageFooter}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Groups')}
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
            defaultValue={name.name}
            onChangeText={(text) => {
              setNewName(text);
            }}
          />
          <TouchableOpacity
            style={[styles.actionFileButton, { backgroundColor: colourState }]}
            state={null}
            onPress={() => {
              console.log('renaming the pdf to ' + newName);
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
        isVisible={editDescriptionVisible}
        hasBackdrop={true}
        backdropColor="white"
        onBackdropPress={() => setEditDescriptionVisible(false)}
        //onModalHide={() => setFileSelected(false)}
      >
        <View style={styles.actionModalInner}>
          <TextInput
            style={styles.actionModalLargeTextInput}
            defaultValue={name.name}
            onChangeText={(text) => {
              //setNewDescription(text);
            }}
            numberOfLines={4}
          />
          <TouchableOpacity
            style={[styles.actionFileButton, { backgroundColor: colourState }]}
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
            {'Are you sure you want to delete ' + name.name + '?'}
          </Text>
          <TouchableOpacity
            style={[styles.actionFileButton, { backgroundColor: colourState }]}
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
            style={[styles.actionFileButton, { backgroundColor: colourState }]}
            state={null}
            onPress={() => {
              // Delete the pdf
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
            {'Are you sure you want to leave ' + name.name + '?'}
          </Text>
          <TouchableOpacity
            style={[styles.actionFileButton, { backgroundColor: colourState }]}
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
            style={[styles.actionFileButton, { backgroundColor: colourState }]}
            state={null}
            onPress={() => {
              // Delete the pdf
              leaveGroup();
              setLeaveConfirmVisible(false);
              navigation.goBack();
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
            onPress={() => setBottomModalVisible(false)}
          >
            <Icon name="trash-o" color="#ffffffff" size={25} />
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
        <View style={styles.renameModalInner}>
          <Text style={styles.modalTitle}>
            {'Are you sure you want to remove * members?'}
          </Text>
          <TouchableOpacity
            style={[styles.renameFileButton, { backgroundColor: colourState }]}
            state={null}
            onPress={() => {
              setRemoveConfirmVisible(false);
              setSelectMode(false);
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
              //deletePdf();
              setRemoveConfirmVisible(false);
              setSelectMode(false);
            }}
          >
            <View style={styles.renameModalButtonContent}>
              <View style={styles.renameModalButtonText_box}>
                <Text style={styles.renameModalButtonText}>{'Remove'}</Text>
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
  groupPageHeaderGroup: {
    flexShrink: 1,
    padding: 10,
    alignItems: 'center',
  },
  groupThumbnailBox: {
    borderRadius: 180,
    backgroundColor: '#667084ff',
    aspectRatio: 1,
    width: '25%',
    margin: 10,
  },
  groupThumbnail: {
    flexGrow: 1,
    resizeMode: 'center',
    borderRadius: 180,
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
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  actionModalInner: {
    width: '85%',
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
    height: '20%',
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
  },
  actionModalLargeTextInput: {
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
});
