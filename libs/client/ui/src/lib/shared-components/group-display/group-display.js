import { gql, useMutation, useQuery, useLazyQuery} from '@apollo/client';
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { Text, ScrollView, StyleSheet, RefreshControl, NativeAppEventEmitter } from 'react-native';
import Loading from '../loading/loading';
import GroupTile from '../group-tile/group-tile';
import groupLocalAccess from '../local-groups-access/local-groups-access';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectEmail} from '../../../../../../../apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useSelector} from 'react-redux';

export function GroupDisplay({ navigation, selectMode, add}, ref) {
  // const [selectMode, setSelectMode] = useState(false);
  const [didReload, setDidReload] = useState(true);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshFlag,setRefreshFlag] = useState(false);
  const emailState = useSelector(selectEmail);
  //Listen to when to update page
  if (groupLocalAccess.addEvent3.length !== 0) {
    //If statement to ensure that only one listener is created for the summarise command
    NativeAppEventEmitter.addListener('updateGroups', () => {
      // console.log("Hi");
      setRefreshFlag(!refreshFlag);
    });
    groupLocalAccess.addEvent3.length = 0;
  }
  if (groupLocalAccess.addEvent2.length !== 0) {
    //If statement to ensure that only one listener is created for the summarise command
    NativeAppEventEmitter.addListener("reloadGroup",()=>{
      ReloadData();
    });
    groupLocalAccess.addEvent2.length = 0;
  }
  //graphql syntax trees
  const GET_USER_GROUPS = gql`
    query getForUser($email: String!) {
      getGroupsFor(email: $email) {
        name
        admin
        description
        pdfs
        requests
        users
      }
    }
  `;
  //Look at query
  // const SET_GROUP = gql`
  //   mutation setUser(
  //     $oldEmail: String!
  //     $email: String!
  //     $colour: String!
  //     $pdfs: [String!]!
  //   ) {
  //     setUser(oldEmail: $oldEmail, email: $email, colour: $colour, pdfs: $pdfs)
  //   }
  // `; 
  // const [setGroup] = useMutation(SET_GROUP);
  const { data, loading, error } = useQuery(GET_USER_GROUPS, {
    variables: { email: emailState },
  });
  const [fetchGroups] = useLazyQuery(GET_USER_GROUPS);
  const setData = (d) => {
    for (let i = 0; i < d.getGroupsFor.length; i++) {
      groupLocalAccess.addGroup({
        name: d.getGroupsFor[i].name,
        admin: d.getGroupsFor[i].admin,
        users: d.getGroupsFor[i].users,
        description: d.getGroupsFor[i].description,
        pdfs: d.getGroupsFor[i].pdfs,
        requests: d.getGroupsFor[i].requests,
      });
    }
  }

  const ReloadData = () => {
    groupLocalAccess.deleteGroup()
    setRefreshing(true);
    //setRefreshFlag(false);
    fetchGroups({
      variables: {
        email: emailState,
      },
      fetchPolicy: 'no-cache',
    })
      .then((d) => {
        groupLocalAccess.clearGroups();
        setData(d.data)
        setRefreshing(false);
        // setDidReload(!didReload);
      })
      .catch((e) => {
        console.log(e);
        groupLocalAccess.clearGroups();
        //setDidReload(!didReload);
        setRefreshing(false);
      });
  };
  
  const ScrollDisplay = (props) => {
    if (props.arr.length !== 0)
      return (
        <ScrollView
          style={styles.recentGroupTiles}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={ReloadData} />
          }
        >
          <Loading width={100} height={100} load={props.load} text={"Fetching your groups"}/>
          {props.arr.map((item, key) => (
            <GroupTile
            key={key}
            name={item.name}
            description={item.description}
            thumbnail={"#123456"}
            admin={item.admin}
            users={item.users}
            pdfs={item.pdfs}
            nav={navigation}
            refresh={setDidReload}
            add={add}
          />
          ))}
        </ScrollView>
      );
    else
      return (
        <ScrollView
          style={styles.recentGroupTiles}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={ReloadData} />
          }
        >
          <Loading width={100} height={100} load={props.load} text={"Fetching your groups"}/>
          <Text style={{ textAlign: 'center' }}>{props.text}</Text>
        </ScrollView>
      );
  };

  // console.log('GetGroups');
  // console.log(data);
  // console.log(loading);
  // console.log(error);
  if (refreshFlag) ReloadData();
  if (loading)
    return (
      //loading animation
      <ScrollView
          style={styles.recentGroupTiles}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={ReloadData} />
          }
        >
          <Loading width={100} height={100} load={true} text={"Fetching your groups"}/>
          <Text style={{ textAlign: 'center' }}>{"Retrieving groups"}</Text>
        </ScrollView>
    );

  if (error)
    return (
      //error message
      <ScrollView
          style={styles.recentGroupTiles}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={ReloadData} />
          }
        >
          <Text style={{ textAlign: 'center' }}>{"No network connection"}</Text>
        </ScrollView>
    );
  //If the group array is empty assign the result from the query
  //create deep copy of the returned data
  //Data is here in data if returned
  if (!groupLocalAccess.isLoaded()) {
    //clears and then re adds data to local access
    groupLocalAccess.clearGroups();
    setData(data);
    // if (groupLocalAccess.isLoaded()) {
    //   // console.log('setting pdf');
    //   setGroup({
        
    //   }).catch((e) => {
    //     // console.log('error in delete of pdf in pdf array');
    //     console.log(e);
    //   });
    // }
    //setIsLoaded(true);
    //Update local group storage
    //array of groups stored locally, selected from data to overwrite the slice
    // if (data.getGroups[0] !== undefined && data.getGroups[0].name !== "error"){
    //   let tempArray = [];
    //   var p;
    //   for (p in groupLocalAccess.getGroups()){
    //     if (data.getGroups[p].downloaded === true){
    //       tempArray.push(data.getGroups[p]);
    //     }
    //   }
    //   dispatch(refillGroups(tempArray));
    // }
  }

  return (
    <ScrollDisplay
    arr={groupLocalAccess.getGroups()}
    text={"You are not a member of any groups"}
    load={false}
    />
  );
}
export default forwardRef(GroupDisplay);

const styles = StyleSheet.create({
  recentGroupTiles: {
    height: '70%',
    paddingLeft: 15,
    paddingRight: 15,
    overflow: 'visible',
  },
});
