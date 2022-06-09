import { render } from '@testing-library/react-native';
import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, Button, Alert } from 'react-native';
import colour from '../colour/colour';

export const ColourPage = ({ navigation}) => {
  return (
    <View style={[styles.colourPage, styles.colourPage_layout]}>
      <View x="50.5fr 74.04% 50.5fr" y="60px minmax(0px, max-content) 60px" style={styles.colourPageBody}>
        <View style={styles.colourPageBody_item}>
          <View x="0% 61.11% 38.89%" y="47px minmax(0px, max-content) 0px" style={styles.colourPageTitle_box}>
            <Text style={styles.colourPageTitle} ellipsizeMode={'clip'}>
              {'Change colour'}
            </Text>
          </View>
        </View>
        <View style={styles.colourPageBody_item}>
          <View x="18.5px 250fr 19.5px" y="31px minmax(0px, max-content) 0px" style={styles.colourOptionsBackground}>
            <View x="9px 232fr 9px" y="6px minmax(0px, max-content) 6px" style={styles.colourOptionsGroup}>
              <Button
                onPress={()=>{colour.state = "Green"}}
                title={"Green"}
                color="#3F89BE"
              />
              <Button
                onPress={()=>{colour.state = "Blue"}}
                title={"Blue"}
                color="forestgreen"
              />
            </View>
          </View>
        </View>
        <View style={styles.colourPageBody_item}>
          <ImageBackground
            style={[styles.backButton, styles.backButton_layout]}
            //source={require('../assets/back-arrow.png')}
          />
        </View>
      </View>
    </View>
  );
};
export default ColourPage;

ColourPage.inStorybook = true;
ColourPage.fitScreen = false;
ColourPage.scrollHeight = 844;

const styles = StyleSheet.create({
  CircleStyle: {
    width: 22,
    height: 22,
    borderWidth: 0.8,
    marginRight: 10,
  },
  colourPage: {
    backgroundColor: '#c4c4c4ff',
    overflow: 'hidden'
  },
  colourPage_layout: {
    marginTop: 0,
    marginBottom: 0,
    minHeight: 844,
    flexShrink: 0,
    marginLeft: 0,
    flexGrow: 1,
    marginRight: 0
  },
  colourPageBody: {
    flexGrow: 1
  },
  colourPageBody_item: {
    flexGrow: 0,
    flexShrink: 1
  },
  colourPageTitle: {
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
  colourPageTitle_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  colourOptionsBackground: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#f5f5f5ff',
    borderRadius: 7
  },
  colourOptionsGroup: {
    flexGrow: 1
  },
  colourOptionsGroup_item: {
    flexGrow: 0,
    flexShrink: 1
  },
  colourOptionTile: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  colourOptionTile_item: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 32
  },
  icon: {
    resizeMode: 'contain'
  },
  icon_layout: {
    marginTop: 12,
    height: 16,
    marginBottom: 12,
    marginLeft: 16,
    width: 16,
    minWidth: 16,
    marginRight: 0
  },
  colourOptionTile_space: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 12
  },
  colourOptionTile_item1: {
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0
  },
  colourName: {
    color: '#344053ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  colourName_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  colourOptionTile_item2: {
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0
  },
  colourOptionTile_item3: {
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0
  },
  colourOptionTile1: {
    flexGrow: 1,
    backgroundColor: '#ffffffff',
    borderRadius: 5,
    flexDirection: 'row'
  },
  colourOptionTile_item4: {
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0
  },
  colourName1: {
    color: '#344053ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  colourOptionTile_item5: {
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0
  },
  colourOptionTile_item6: {
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0
  },
  colourOptionTile_item7: {
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0
  },
  colourOptionTile_item8: {
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0
  },
  colourOptionTile_item9: {
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0
  },
  backButton: {
    resizeMode: 'contain'
  },
  backButton_layout: {
    marginTop: 224,
    height: 18,
    marginBottom: 0,
    width: 9,
    minWidth: 9,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
  
});
