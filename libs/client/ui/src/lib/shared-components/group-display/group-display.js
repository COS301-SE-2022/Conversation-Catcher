import { gql, useMutation, useQuery, useLazyQuery} from '@apollo/client';
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { Text, ScrollView, StyleSheet, DeviceEventEmitter, RefreshControl } from 'react-native';
import Loading from '../loading/loading';
// import LocalGroupsAccess from '../local-groups-access/local-groups-access';
import GroupTile from '../group-tile/group-tile';
import groupLocalAccess from '../local-groups-access/local-groups-access';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectEmail} from 'apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectGroups, refillGroups } from 'apps/client/src/app/slices/group.slice';
import { useSelector, useDispatch } from 'react-redux';

export function GroupDisplay({ navigation, selectMode }, ref) {
  // const [selectMode, setSelectMode] = useState(false);
  const [didReload, setDidReload] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const emailState = useSelector(selectEmail);
  const localGroups = useSelector(selectGroups);
  const dispatch = useDispatch();
  //Expose refresh function to parent(View-all page)
  useImperativeHandle(ref, () => ({
    refreshPfds: () => {
      // console.log('refreshing');
      setDidReload(!didReload);
    },
  }));

  //Listen to when to update page
  DeviceEventEmitter.addListener('updatePage', () => setDidReload(!didReload));
  //graphql syntax trees
  const GET_USER_GROUPS = gql`
    query getForUser($email: String!) {
      getGroups(id: $email) {
        id
        name
        creationDate
        downloaded
        #group
        text
      }
    }
  `;
  //Look at query
  const SET_GROUP = gql`
    mutation setUser(
      $oldEmail: String!
      $email: String!
      $colour: String!
      $pdfs: [String!]!
    ) {
      setUser(oldEmail: $oldEmail, email: $email, colour: $colour, pdfs: $pdfs)
    }
  `; 
  const [setGroup] = useMutation(SET_GROUP);
  const { data, loading, error } = useQuery(GET_USER_GROUPS, {
    variables: { email: emailState },
  });
  const [fetchGroups] = useLazyQuery(GET_USER_GROUPS);

  const setData = (d) => {
    for (let i = 0; i < d.getGroups.length; i++) {
      groupLocalAccess.addGroup({
        name: d.getGroups[i].name,
        creationDate: d.getGroups[i].creationDate,
        downloaded: d.getGroups[i].downloaded,
        group: d.getGroups[i].group,
        text: d.getGroups[i].text,
        id: d.getGroups[i].id,
      });
    }
  }

  const ReloadData = () => {
    setRefreshing(true);
    fetchGroups({
      variables: {
        email: emailState,
      },
      fetchPolicy: 'no-cache',
    })
      .then((d) => {
        groupLocalAccess.clearPdfs();
        setData(d.data)
        setRefreshing(false);
        // setDidReload(!didReload);
      })
      .catch((e) => {
        console.log(e);
        groupLocalAccess.clearPdfs();
        setDidReload(!didReload);
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
          <Loading width={100} height={100} load={props.load} />
          {props.arr.map((item, key) => (
            <GroupTile
            key={key}
            id={item.id}
            name={item.name}
            text={item.text}
            thumbnailSource={'groupRefresh'}
            nav={navigation}
            refresh={setDidReload}
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
          <Loading width={100} height={100} load={props.load} />
          <Text style={{ textAlign: 'center' }}>{props.text}</Text>
        </ScrollView>
      );
  };

  // console.log('GetGroups');
  // console.log(data);
  // console.log(loading);
  // console.log(error);
  if (loading)
    return (
      <ScrollDisplay
        arr={localGroups}
        text={"No Groups Stored Locally"}
        load={true}
      />
    );

  if (error)
    return (
      <ScrollDisplay
        arr={localGroups}
        text={"No Groups Stored Locally"}
        load={true}
      />
    );
  //If the group array is empty assign the result from the query
  //create deep copy of the returned data
  //Data is here in data if returned
  if (!groupLocalAccess.isLoaded()) {
    groupLocalAccess.clearGroups();
    setData(data);
    if (groupLocalAccess.isLoaded()) {
      // console.log('setting pdf');
      setGroup({
        
      }).catch((e) => {
        // console.log('error in delete of pdf in pdf array');
        console.log(e);
      });
    }
    //setIsLoaded(true);
    //Update local group storage
    //array of groups stored locally, selected from data to overwrite the slice
    if (data.getGroups[0] !== undefined && data.getGroups[0].name !== "error"){
      let tempArray = [];
      var p;
      for (p in groupLocalAccess.getGroups()){
        if (data.getGroups[p].downloaded === true){
          tempArray.push(data.getGroups[p]);
        }
      }
      dispatch(refillGroups(tempArray));
    }
  }

  return (
    <ScrollDisplay
    arr={groupLocalAccess.getGroups()}
    text={""}
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
