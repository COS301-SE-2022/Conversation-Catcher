import React from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, Pressable, TouchableOpacity, Alert } from 'react-native';

export function ViewAll(props) {
  return (
    <View style={[styles.viewAllPage, styles.viewAllPage_layout]}>
      
    </View>
  );
}
export default ViewAll;

const styles = StyleSheet.create({
  viewAllPage: {
    backgroundColor: '#ffffffff'
  },
  viewAllPage_layout: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    flexGrow: 1,
    marginRight: 0
  },
  viewAllPage_item: {
    flexGrow: 0,
    flexShrink: 1
  },
  viewAllTopBar: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#c4c4c4ff',
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1
    }
  },
  topFlex: {
    flexGrow: 1
  },
  topFlex_item: {
    flexGrow: 0,
    flexShrink: 1
  },
  viewAllTitle: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 30,
    fontSize: 30,
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  viewAllTitle_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  searchBar: {
    width: '100%',
    flexGrow: 1
  },
  block19: {
    width: '100%',
    flexGrow: 1
  },
  block20: {
    backgroundColor: '#ffffffff',
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: '#d0d5ddff',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1
    }
  },
  block20_layout: {
    marginTop: 0,
    height: 44,
    marginLeft: 0,
    width: 356,
    minWidth: 356
  },
  searchContents: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  searchContents_item: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 20
  },
  searchIcon: {
    resizeMode: 'contain'
  },
  searchIcon_layout: {
    marginTop: 2,
    height: 20,
    marginBottom: 2,
    marginLeft: 0,
    width: 20,
    minWidth: 20,
    marginRight: 0
  },
  searchContents_space: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 8
  },
  searchContents_item1: {
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0
  },
  searchInput: {
    color: '#667084ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  searchInput_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
});