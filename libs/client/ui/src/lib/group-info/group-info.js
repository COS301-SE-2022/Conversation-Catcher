import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import { useSelector } from 'react-redux';
import { selectColour } from 'apps/client/src/app/slices/user.slice';
import MemberTile from '../shared-components/member-tile/member-tile.js';
import groupsLocalAccess from '../shared-components/local-groups-access/local-groups-access';

export const GroupInfo = ({ navigation }) => {

    const [selectMode, setSelectMode] = useState(false);
    const colourState = useSelector(selectColour);
    const [adminState, setAdminState] = useState(true);
    const [renameVisible, setRenameVisible] = useState(false);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [newName, setNewName] = useState('');

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

  const [rename] = useMutation(RENAME);
  const [delete_group] = useMutation(DELETE);

  async function renamePdf() {
    console.log(id);
    name.name = newName;
    groupLocalAccess.renamePdf(id.id, newName);
    await rename({ variables: { id: id.id, name: newName } });
    dispatch(changeName({ id: id.id, name: newName }));
  }

  async function deletePdf() {
    groupLocalAccess.deletePdf(id.id);
    await delete_group({ variables: { id: id.id } });
    dispatch(removeGroup({ id: id.id }));
  }

    function AdminGroupButtons(){
        if(adminState){
            return (
                <View style={styles.buttonsGroup}>
                    <View style={styles.leaveButtonBox}>
                        <TouchableOpacity style={styles.leaveButton}>
                            <Text style={styles.leaveButtonText}>Leave Group</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.deleteButtonBox}>
                        <TouchableOpacity style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Delete Group</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return null;
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
                        <TouchableOpacity style={styles.removeButton}>
                            <Icon name="minus" size={30} color={colourState} />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return null;
    }

    function ConditionalGroupName(){
      if(adminState){
        return (
          <TouchableOpacity 
            style={styles.groupNameBox}
            onPress={() => {

            }}
          >
              <Text style={styles.groupName}>{'Group Name'}</Text>
          </TouchableOpacity>
        )
      }
      return (
        <View style={styles.groupNameBox}>
            <Text style={styles.groupName}>{'Group Name'}</Text>
        </View>
      )
    }

  return (
    <View style={styles.groupPage}>
        <View style={styles.groupPageHeaderGroup}>
            <View style={styles.groupThumbnailBox}>
                <Image
                    style={styles.groupThumbnail}
                    source={{
                        uri:
                        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg',
                    }}
                />
            </View>

            <ConditionalGroupName/>

            <View style={styles.groupTextBox}>
                <Text style={styles.groupText} numberOfLines={2}>{'Group Description'}</Text>
            </View>
        </View>

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
      
    </View>
  );
};
export default GroupInfo;

const styles = StyleSheet.create({
  groupPage: {
    backgroundColor: '#ffffffff',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    flexGrow: 1,
    marginRight: 0,
    alignItems: 'center',
  },
  groupPageHeaderGroup: {
    flexGrow: 1,
    height: '25%',
    padding: 15,
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
    alignContent: 'center',
    alignItems: 'center',
    height: '15%',
  },
  groupName: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 28,
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
  },
  groupTextBox: {
    alignContent: 'center',
  },
  groupText: {
    color: '#667084ff',
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
  buttonsGroup: {
    flexDirection: 'row',
  },
  leaveButtonBox: {

  },
  leaveButton: {

  },
  leaveButtonText: {
    color: 'red',
  },
  deleteButtonBox: {

  },
  deleteButton: {

  },
  deleteButtonText: {
    color: 'red',
  },
  membersSection: {
    
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
    padding: 10,
  },
  invitebutton: {

  },
  removeButtonBox: {
    padding: 10,
  },
  removeButton: {

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
  groupMembersBox: {
    flexGrow: 1,
    
  },
  groupPageFooter: {
    width: '100%',
    flexShrink: 1,
    alignContent: 'center',
    alignItems: 'center',
    height: '10%',
    minHeight: 50,
  },
  backButton: {
    alignContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
  }
});
