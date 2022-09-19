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
import { toggleDown } from 'apps/client/src/app/slices/member.slice';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
//import FileViewer from "react-native-file-viewer";

function DetermineTileCorner(props) {
  const colourState = useSelector(selectColour);
  const [checkboxState, setCheckboxState] = React.useState(false);
  const c = props.c;
  if (c) {
    return (
      <BouncyCheckbox
        size={20}
        fillColor={colourState}
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: colourState }}
        isChecked={checkboxState}
        onPress={() => setCheckboxState(!checkboxState)}
      />
    );
  }
  return null;
}

const MemberTile = ({
  id,
  name,
  showCheck,
  nav,
}) => {
  const colourState = useSelector(selectColour);
  const buildMember = () => {
    return { id: id, name: name }
  }
  return (
    <TouchableOpacity
      style={styles.memberTile}
    >
      <View style={styles.memberTile_contents_not_thumbnail}>
        <View style={styles.memberTile_contents_not_thumbnail_inner}>
          <View style={styles.memberName_box}>
            <Text style={styles.memberName}>{name}</Text>
          </View>
        </View>
        <View style={styles.corner_button}>
          <DetermineTileCorner c={showCheck} a={buildMember()}/>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MemberTile;

const styles = StyleSheet.create({
  memberTile: {
    flexGrow: 1,
    borderStyle: 'solid',
    borderColor: '#c4c4c4ff',
    borderWidth: 1,
    flexDirection: 'row',
  },
  memberTileInfo: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  memberTileInfo_item: {
    flexGrow: 0,
    flexShrink: 1,
  },
  memberTileText: {
    flexGrow: 1,
  },
  memberTileText_item: {
    flexGrow: 0,
    flexShrink: 1,
  },
  memberName: {
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
  memberName_box: {
    flexGrow: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    padding: 15,
  },
  corner_button: {
    padding: 10,
    flex: 1,
  },
  memberTile_contents_not_thumbnail: {
    flex: 4,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  memberTile_contents_not_thumbnail_inner: {
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
