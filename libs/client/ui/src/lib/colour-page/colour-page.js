import { render } from '@testing-library/react-native';
import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, Button, Alert, TouchableOpacity } from 'react-native';
import BouncyCheckboxGroup, {ICheckboxButton,} from "react-native-bouncy-checkbox-group";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { setColour} from 'apps/client/src/app/slices/user.slice'
import RNRestart from 'react-native-restart';


export const ColourPage = ({ navigation}) => {
  const dispatch = useDispatch()
  return (
    <View style={styles.colourPage}>
      <View style={styles.big_title_box}>
        <Text style={styles.big_title}>
          {'Change colour'}
        </Text>
      </View>

      <View style={[styles.container, styles.colourOptionsBackground]}>
        <View
          style={{
            //marginTop: 16,
            //marginLeft: 32,
            justifyContent: "center",
            margin: 10
          }}
        >
          <BouncyCheckboxGroup
            data={verticalStaticData}
            style={{ flexDirection: "column" }}
            onChange={(selectedItem) => {//colourSlice.caseReducers.setColour(selectedItem.fillColor)
              //{type:'colour/setColour',payload:selectedItem.fillColor}
              dispatch(setColour(selectedItem.fillColor));//dispatches the setColour action with colour payload
              //RNRestart.Restart();
            }}
          />
        </View>
      </View>

      <TouchableOpacity  
        style={styles.backButton} 
        onPress={() => navigation.goBack()}>
          <Icon 
            name="angle-left"
            color="#344053ff"
            size={28}
          />
      </TouchableOpacity >
    </View>

    
  );
};
export default ColourPage;

ColourPage.inStorybook = true;
ColourPage.fitScreen = false;
ColourPage.scrollHeight = 844;

const styles = StyleSheet.create({
  colourPage: {
    backgroundColor: '#ffffffff',
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center'
  },
  big_title: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 28,
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  big_title_box: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
    height: '10%',
    width: '100%',
    minHeight: 28
  },
  colourOptionsBackground: {
    width: '80%',
    backgroundColor: '#f5f5f5ff',
    borderRadius: 7,
    flexDirection: 'column',
    flexShrink: 1
  },
  colourName: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    textDecorationLine: 'none'
  },
  colourItemDivider: {
    backgroundColor: '#d0d5ddff',
    height: 1,
    width: '80%',
    alignSelf: 'center'
  },
  backButton: {
    width: '15%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  },
  verticalStyle: { margin: 10 },
  textStyle: { textDecorationLine: "none" },
  iconImageStyle: { height: 15, width: 15 },
  
  
});

const _iconStyle = (borderColor) => ({
  height: 30,
  width: 30,
  borderRadius: 25,
  borderColor: borderColor,
});

const verticalStaticData = [
  {
    id: 0,
    text: "Salmon",
    fillColor: "#ea7456",
    unfillColor: "#ff987e",
    iconStyle: _iconStyle("#ff987e"),
    textStyle: styles.colourName,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
  {
    id: 1,
    text: "Blue",
    fillColor: "#3f89beff",
    unfillColor: "#66a8d6",
    iconStyle: _iconStyle("#66a8d6"),
    textStyle: styles.colourName,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
  {
    id: 2,
    text: "Soft Purple",
    fillColor: "#a98ae7",
    unfillColor: "#cab6f4",
    iconStyle: _iconStyle("#cab6f4"),
    textStyle: styles.colourName,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
  {
    id: 3,
    text: "Pale yellow",
    fillColor: "#fcb779",
    unfillColor: "#ffd1a7",
    iconStyle: _iconStyle("#ffd1a7"),
    textStyle: styles.colourName,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
  {
    id: 4,
    text: "Green",
    fillColor: "#369a32",
    unfillColor: "#71d86d",
    iconStyle: _iconStyle("#71d86d"),
    textStyle: styles.colourName,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
];
