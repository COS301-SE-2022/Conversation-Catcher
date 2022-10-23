import { render } from '@testing-library/react-native';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import BouncyCheckboxGroup, {ICheckboxButton,} from "react-native-bouncy-checkbox-group";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { setColour, selectUser} from '../../../../../../apps/client/src/app/slices/user.slice'
//import RNRestart from 'react-native-restart';
import { gql, useMutation } from '@apollo/client';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectColour } from '../../../../../../apps/client/src/app/slices/user.slice';


export const ColourPage = ({ navigation}) => {
  const colourState = useSelector(selectColour);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const SET_USER = gql`
    mutation setUser(
      $oldEmail: String!
      $email: String!
      $colour: ColourObj!
      $pdfs: [String!]!
    ) {
      setUser(oldEmail: $oldEmail, email: $email, colour: $colour, pdfs: $pdfs)
    }
  `;

  function DetermineMode(){
    if (colourState.mode === '#FFFFFF')
    {
      return false;
    }
    return true;
  }

  var isEnabled = DetermineMode();

  const [setUser] = useMutation(SET_USER);
  const getColour = (accent) => {
    console.log("Accent: ", accent, "   Toggle: ", isEnabled);
    switch (accent) {
      case "#3F89BE": {
        if (!isEnabled) {
          return {
            accent: "#3F89BE",
            mode:"#FFFFFF",
            bottom:"#E6ECF0",
            low:"#B6BFC6",
            high:"#667685",
            top:"#344554",
          };
        }
        else{
          return {
            accent: "#9DCEF6",
            mode:"#344554",
            bottom:"#8D99A3",
            low:"#AAB5BE",
            high:"#E6ECF0",
            top:"#FFFFFF",
          };
        }
      }

      case "#A776B1": {
        if (!isEnabled) {
          return {
            accent: "#A776B1",
            mode:"#FFFFFF",
            bottom:"#EEE9EF",
            low:"#C6BCC8",
            high:"#826685",
            top:"#4E3B51",
          };
        }
        else {
          return {
            accent: "#E5C9F7",
            mode:"#4E3B51",
            bottom:"#826685",
            low:"#C1B5C1",
            high:"#EEE9EF",
            top:"#FFFFFF",
          };
        }
      }

      case "#B06F7F": {
        if(!isEnabled) {
          return {
            accent: "#B06F7F",
            mode:"#FFFFFF",
            bottom:"#EFE9EA",
            low:"#C8BCBE",
            high:"#85666C",
            top:"#513B40",
          };
        }
        else {
          return {
            accent: "#ECBDC8",
            mode:"#513B40",
            bottom:"#85666C",
            low:"#B29DA1",
            high:"#EFE9EA",
            top:"#FFFFFF",
          };
        }
      }

      case "#679E5E": {
        if (!isEnabled) {
          return {
            accent: "#679E5E",
            mode:"#FFFFFF",
            bottom:"#E9EFE9",
            low:"#BCC8BD",
            high:"#4A6749",
            top:"#2D4731",
          };
        }
        else {
          return {
            accent: "#B5DDAF",
            mode:"#2D4731",
            bottom:"#4A6749",
            low:"#97AD99",
            high:"#E9EFE9",
            top:"#FFFFFF",
          };
        }
      }

      case "#D17B3C": {
        if (!isEnabled) {
          return {
            accent: "#D17B3C",
            mode:"#FFFFFF",
            bottom:"#F5EEE8",
            low:"#D2C0B5",
            high:"#857166",
            top:"#51433B",
          };
        }
        else {
          return {
            accent: "#F4B688",
            mode:"#51433B",
            bottom:"#857166",
            low:"#BFA798",
            high:"#F5EEE8",
            top:"#FFFFFF",
          };
        }
      }

      default://lightmode blue
        return {accent: "#3F89BE",
          mode:"#FFFFFF",
          bottom:"#E6ECF0",
          low:"#B6BFC6",
          high:"#667685",
          top:"#344554",};
    }
  }

  const toggleSwitch = () => {
    console.log("aaaaaaaaaaa: ", isEnabled);
    isEnabled = !isEnabled;
    console.log("isEnabled: ", isEnabled);
    user.pdfs.forEach((element,index) => {
      if (element === null) user.pdfs.splice(index,1);
    });
    let colourObj = getColour(colourState.accent);
    dispatch(setColour(colourObj))
    setUser({
      variables: {
        oldEmail: user.email,
        email: user.email,
        colour: colourObj,
        pdfs: user.pdfs,
      },
    }).then(()=>
      console.log('Successfully updated colour')
    ).catch((error) => {
      console.log('Darkmode error', error);
    });
  };

  const _iconStyle = (borderColor) => ({
    height: 30,
    width: 30,
    borderRadius: 25,
    borderColor: borderColor,
  });
  
  const verticalStaticData = [
    {
      id: 0,
      text: "Blue",
      fillColor: "#3F89BE",
      unfillColor: "#9DCEF6",
      iconStyle: _iconStyle("#9DCEF6"),
      textStyle: [styles.colourName, {color: colourState.top}],
      style: styles.verticalStyle,
      iconImageStyle: styles.iconImageStyle,
    },
    {
      id: 1,
      text: "Purple",
      fillColor: "#A776B1",
      unfillColor: "#E5C9F7",
      iconStyle: _iconStyle("#E5C9F7"),
      textStyle: [styles.colourName, {color: colourState.top}],
      style: styles.verticalStyle,
      iconImageStyle: styles.iconImageStyle,
    },
    {
      id: 2,
      text: "Pink",
      fillColor: "#B06F7F",
      unfillColor: "#db9cac",
      iconStyle: _iconStyle("#db9cac"),
      textStyle: [styles.colourName, {color: colourState.top}],
      style: styles.verticalStyle,
      iconImageStyle: styles.iconImageStyle,
    },
    {
      id: 3,
      text: "Green",
      fillColor: "#679E5E",
      unfillColor: "#B5DDAF",
      iconStyle: _iconStyle("#B5DDAF"),
      textStyle: [styles.colourName, {color: colourState.top}],
      style: styles.verticalStyle,
      iconImageStyle: styles.iconImageStyle,
    },
    {
      id: 4,
      text: "Orange",
      fillColor: "#D17B3C",
      unfillColor: "#F4B688",
      iconStyle: _iconStyle("#F4B688"),
      textStyle: [styles.colourName, {color: colourState.top}],
      style: styles.verticalStyle,
      iconImageStyle: styles.iconImageStyle,
    },
  ];
  

  return (
    <SafeAreaView style={[styles.colourPage, {backgroundColor: colourState.mode}]}>
      <View style={styles.big_title_box}>
        <Text style={[styles.big_title, {color: colourState.top}]}>
          {'Change colour'}
        </Text>
      </View>

      <View style={[styles.container, styles.colourOptionsBackground, {backgroundColor: colourState.bottom}]}>
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
            onChange={async (selectedItem) => {
              //Add call to update colour and remove null values in pdf array
              user.pdfs.forEach((element,index) => {
                if (element === null) user.pdfs.splice(index,1);
              });
              let colourObj = getColour(selectedItem.fillColor);
              dispatch(setColour(colourObj));
              setUser({
                variables: {
                  oldEmail: user.email,
                  email: user.email,
                  colour: colourObj,
                  pdfs: user.pdfs,
                },
              }).then(()=>
                console.log('Successfully updated colour')
              ).catch((error) => {
                console.log('Failed to update colour', error);
              });
            }}
          />
        </View>
      </View>

      <View style={styles.darkSwitchGroup}>
        <View style={styles.darkLabelBox}>
          <Text style={[styles.darkLabel, {color: colourState.top}]}>Dark Mode</Text>
        </View>
        <View style={styles.darkSwitchBox}>
          <Switch
            trackColor={{ false: colourState.low, true: colourState.accent }}
            thumbColor={isEnabled ? colourState.low : colourState.accent}
            ios_backgroundColor={colourState.high}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
          <Icon
            name="angle-left"
            color={colourState.high}
            size={28}
          />
      </TouchableOpacity >
    </SafeAreaView>


  );
};
export default ColourPage;

ColourPage.inStorybook = true;
ColourPage.fitScreen = false;
ColourPage.scrollHeight = 844;

const styles = StyleSheet.create({
  colourPage: {
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center'
  },
  big_title: {
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
  darkSwitchGroup: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    flexGrow: 1,
    alignContent: 'center',
    padding: 20,
  },
  darkLabel: {
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  darkLabelBox: {

  },
  darkSwitchBox: {

  },
  colourOptionsBackground: {
    width: '80%',
    borderRadius: 7,
    flexDirection: 'column',
    flexShrink: 1
  },
  colourName: {
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

