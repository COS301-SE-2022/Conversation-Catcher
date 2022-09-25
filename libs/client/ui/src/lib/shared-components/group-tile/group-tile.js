import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectColour } from '../../../../../../../apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { toggleDown } from '../../../../../../../apps/client/src/app/slices/group.slice';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
//import FileViewer from "react-native-file-viewer";

const GroupTile = ({
  id,
  name,
  thumbnailSource,
  text,
  nav,
}) => {
  const colourState = useSelector(selectColour);
  const buildGroup = () => {
    return { id: id, text: text , name: name }
  }
  return (
    <TouchableOpacity
      style={styles.groupTile}
      onPress={() =>
        nav.navigate('GroupInfo', { id: { id }, text: { text }, name: { name }, thumbnailSource: { thumbnailSource } })
      }
    >
      <View style={[styles.groupThumbnailBox, { borderColor: colourState }]}>
        <Image
          style={styles.groupThumbnail}
          source={thumbnailSource}
        />
      </View>
      <View style={styles.groupTile_contents_not_thumbnail}>
        <View style={styles.groupNameBox}>
          <Text style={styles.groupName} numberOfLines={1}>{name}</Text>
        </View>
        <View style={styles.groupDescriptionBox}>
          <Text style={styles.groupDescription} numberOfLines={1}>{text}</Text>
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
    borderColor: '#c4c4c4ff',
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#c4c4c4ff',
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
    backgroundColor: '#667084ff',
    aspectRatio: 1,
    width: '15%',
    margin: 10,
  },
  groupThumbnail: {
    flexGrow: 1,
    resizeMode: 'center',
    borderRadius: 180,
  },
  groupTile_contents_not_thumbnail: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  groupName: {
    color: '#344053ff',
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
    color: '#344053ff',
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
});
