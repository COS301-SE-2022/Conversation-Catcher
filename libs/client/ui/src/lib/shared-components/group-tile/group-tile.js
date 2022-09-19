import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectColour } from 'apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { toggleDown } from 'apps/client/src/app/slices/group.slice';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
//import FileViewer from "react-native-file-viewer";

const groupthumbnailSource = {
  uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
  cache: true,
};

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
        <ImageBackground
          style={styles.groupThumbnail}
          //thumbnailSource={thumbnailSource}
        />
      </View>
      <View style={styles.groupTile_contents_not_thumbnail}>
        <View style={styles.groupTile_contents_not_thumbnail_inner}>
          <View style={styles.groupName_box}>
            <Text style={styles.groupName}>{name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupTile;

const styles = StyleSheet.create({
  groupTile: {
    flexGrow: 1,
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
    margin: 5,
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
  groupTileInfo: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  groupTileInfo_item: {
    flexGrow: 0,
    flexShrink: 1,
  },
  groupTileText: {
    flexGrow: 1,
  },
  groupTileText_item: {
    flexGrow: 0,
    flexShrink: 1,
  },
  groupName: {
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
  groupName_box: {
    flexGrow: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    paddingTop: 15,
  },
  groupTile_contents_not_thumbnail: {
    flex: 4,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  groupTile_contents_not_thumbnail_inner: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 5,
    //flexGrow: 1, //flexgrow: 0
    marginRight: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10,
    flex: 10,
  },
});
