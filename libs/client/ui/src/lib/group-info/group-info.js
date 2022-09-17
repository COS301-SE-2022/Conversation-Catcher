import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import { useSelector } from 'react-redux';
import { selectColour } from 'apps/client/src/app/slices/user.slice';

export const GroupInfo = ({ navigation }) => {

  return (
    <View style={styles.groupsPage}>
      
    </View>
  );
};
export default GroupInfo;

const styles = StyleSheet.create({
  groupsPage: {
    backgroundColor: '#ffffffff',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    flexGrow: 1,
    marginRight: 0,
  },
  
});
