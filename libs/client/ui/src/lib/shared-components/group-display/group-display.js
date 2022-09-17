import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { Text, ScrollView, StyleSheet, DeviceEventEmitter } from 'react-native';
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
  const emailState = useSelector(selectEmail);
  const localgroups = useSelector(selectGroups);
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
  const GET_USER_groupS = gql`
    query getForUser($email: String!) {
      getgroups(id: $email) {
        id
        name
        creationDate
        downloaded
        #group
        text
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_USER_groupS, {
    variables: { email: emailState },
  });
  // console.log('GetGroups');
  // console.log(data);
  // console.log(loading);
  // console.log(error);
  if (loading)
    return (
      <ScrollView style={styles.recentGroupTiles}>
        {localgroups.map((item, key) => (
        <GroupTile
          key={key}
          id={item.id}
          name={item.name}
          date={item.creationDate}
          source={''}
          text={item.text}
          downloaded={item.downloaded}
          showCheck={selectMode}
          groupSource={'groupRefresh'}
          nav={navigation}
          refresh={setDidReload}
        />
      ))}
        {/*<Loading >*/}
      </ScrollView>
    );

  if (error)
    return (
      <ScrollView style={styles.recentGroupTiles}>
        <Text>An error occured...</Text>
        <Text>{error[0]}</Text>
      </ScrollView>
    );
  //If the group array is empty assign the result from the query
  //create deep copy of the returned data
  //Data is here in data if returned
  if (!isLoaded) {
    groupLocalAccess.clearGroups();
    for (let i = 0; i < data.getgroups.length; i++) {
      groupLocalAccess.addGroup({
        name: data.getgroups[i].name,
        creationDate: data.getgroups[i].creationDate,
        downloaded: data.getgroups[i].downloaded,
        group: data.getgroups[i].group,
        text: data.getgroups[i].text,
        id: data.getgroups[i].id,
      });
    }
    setIsLoaded(true);
    //Update local group storage
    //array of groups stored locally, selected from data to overwrite the slice
    if (data.getgroups[0].name !== "error"){
      let tempArray = [];
      var p;
      for (p in groupLocalAccess.getGroups()){
        if (data.getgroups[p].downloaded === true){
          tempArray.push(data.getgroups[p]);
        }
      }
      dispatch(refillGroups(tempArray));
    }
  }

  

  return (
    <ScrollView style={styles.recentGroupTiles}>
      {groupLocalAccess.getGroups().map((item, key) => (
        <GroupTile
          key={key}
          id={item.id}
          name={item.name}
          date={item.creationDate}
          source={''}
          text={item.text}
          downloaded={item.downloaded}
          showCheck={selectMode}
          groupSource={'groupRefresh'}
          nav={navigation}
          refresh={setDidReload}
        />
      ))}
    </ScrollView>
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
