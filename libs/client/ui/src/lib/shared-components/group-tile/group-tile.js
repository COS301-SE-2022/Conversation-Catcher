// import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectColour } from '../../../../../../../apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// import { toggleDown } from '../../../../../../../apps/client/src/app/slices/group.slice';
// import { gql, useLazyQuery, useMutation } from '@apollo/client';
//import FileViewer from "react-native-file-viewer";

//const [addPdf] = useMutation(ADD_PDF);

const GroupTile = ({
  name,
  admin,
  users,
  thumbnail,
  description,
  pdfs,
  nav,
  add,
}) => {
  const colourState = useSelector(selectColour);
  //console.log(props);
  const buildGroup = () => {
    return { name:name, thumbnail:thumbnail, admin:admin, users:users, description:description, pdfs:pdfs }
  }
  return (
    <TouchableOpacity
      style={[styles.groupTile, {borderColor: colourState.low}, {shadowColor: colourState.low}]}
      onPress={() =>{
        if (add){
          DeviceEventEmitter.emit("AddPdf",name);
        } else {
          nav.navigate('ViewAll', { groupObject: buildGroup() })
        }
      }}
    >
      <View style={[styles.groupThumbnailBox, { borderColor: colourState.accent }, {backgroundColor: colourState.high}]}>
        {/* </View><View style={[styles.groupThumbnail, {backgroundColor: thumbnail}]}> */}
        <View style={[styles.groupThumbnail, {backgroundColor: colourState.accent}]}>
          <Text style={[styles.groupIcon, {color: colourState.mode}]}>{name.toUpperCase()[0]}</Text>
        </View>
      </View>
      <View style={styles.groupTile_contents_not_thumbnail}>
        <View style={styles.groupNameBox}>
          <Text style={[styles.groupName, {color: colourState.top}]} numberOfLines={1}>{name}</Text>
        </View>
        <View style={styles.groupDescriptionBox}>
          <Text style={[styles.groupDescription, {color: colourState.top}]} numberOfLines={1}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupTile;

const styles = StyleSheet.create({
  groupTile: {
    flexShrink: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    elevation: 1,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    flexDirection: 'row',
    
  },
  groupThumbnailBox: {
    borderRadius: 180,
    aspectRatio: 1,
    width: '15%',
    margin: 10,
  },
  groupThumbnail: {
    flexGrow: 1,
    resizeMode: 'center',
    borderRadius: 180,
    justifyContent: "center",
  },
  groupTile_contents_not_thumbnail: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  groupName: {
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 20,
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
  },
  groupNameBox: {
    flexShrink: 1,
    width: '80%',
    resizeMode: 'contain',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  groupDescription: {
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    paddingHorizontal: 0,
  },
  groupDescriptionBox: {
    flexShrink: 1,
    width: '80%',
    paddingHorizontal: 5,
  },
  groupIcon: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
});
