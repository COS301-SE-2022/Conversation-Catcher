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

  const [setUser] = useMutation(SET_USER);
  const getColour = (accent) => {
    let key = {a:accent,m:isEnabled};
    switch (key) {
      case {a:"#3F89BE",m:false}:
        return {
          accent: "#3F89BE",
          mode:"#FFFFFF",
          bottom:"#E6ECF0",
          low:"#B6BFC6",
          high:"#667685",
          top:"#344554",
        };
      case {a:"#3F89BE",m:true}:
        return {
          accent: "#9DCEF6",
          mode:"#344554",
          bottom:"#8D99A3",
          low:"#AAB5BE",
          high:"#E6ECF0",
          top:"#FFFFFF",
        };
      case {a:"#A776B1",m:false}:
        return {
          accent: "#A776B1",
          mode:"#FFFFFF",
          bottom:"#EEE9EF",
          low:"#C6BCC8",
          high:"#826685",
          top:"#4E3B51",
        };
      case {a:"#A776B1",m:true}:
        return {
          accent: "#E5C9F7",
          mode:"#4E3B51",
          bottom:"#826685",
          low:"#C1B5C1",
          high:"#EEE9EF",
          top:"#FFFFFF",
        };
      case {a:"#B06F7F",m:false}:
        return {
          accent: "#B06F7F",
          mode:"#FFFFFF",
          bottom:"#EFE9EA",
          low:"#C8BCBE",
          high:"#85666C",
          top:"#513B40",
        };
      case {a:"#B06F7F",m:true}:
        return {
          accent: "#ECBDC8",
          mode:"#513B40",
          bottom:"#85666C",
          low:"#B29DA1",
          high:"#EFE9EA",
          top:"#FFFFFF",
        };
      case {a:"#679E5E",m:false}:
        return {
          accent: "#679E5E",
          mode:"#FFFFFF",
          bottom:"#E9EFE9",
          low:"#BCC8BD",
          high:"#4A6749",
          top:"#2D4731",
        };
      case {a:"#679E5E",m:true}:
        return {
          accent: "#B5DDAF",
          mode:"#2D4731",
          bottom:"#4A6749",
          low:"#97AD99",
          high:"#E9EFE9",
          top:"#FFFFFF",
        };
      case {a:"#D17B3C",m:false}:
        return {
          accent: "#D17B3C",
          mode:"#FFFFFF",
          bottom:"#F5EEE8",
          low:"#D2C0B5",
          high:"#857166",
          top:"#51433B",
        };
      case {a:"#D17B3C",m:true}:
        return {
          accent: "#F4B688",
          mode:"#51433B",
          bottom:"#857166",
          low:"#BFA798",
          high:"#F5EEE8",
          top:"#FFFFFF",
        };
      default://lightmode blue
        return {accent: accent,
          mode:"#FFFFFF",
          bottom:"#E6ECF0",
          low:"#B6BFC6",
          high:"#667685",
          top:"#344554",};
    }
  }
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    user.pdfs.forEach((element,index) => {
      if (element === null) user.pdfs.splice(index,1);
    });
    let colourObj = getColour(colourState.accent);
    setUser({
      variables: {
        oldEmail: user.email,
        email: user.email,
        colour: colourObj,
        pdfs: user.pdfs,
      },
    }).then(()=>
    //dispatches the setColour action with colour payload
    dispatch(setColour(colourObj))
    ).catch((error) => {
      console.log(error);
    });
  };

  return (
    <SafeAreaView style={styles.colourPage}>
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
              //dispatches the setColour action with colour payload
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
          <Text style={styles.darkLabel}>Dark Mode</Text>
        </View>
        <View style={styles.darkSwitchBox}>
          <Switch
            trackColor={{ false: "#f5f5f5ff", true: "#f5f5f5ff" }}
            thumbColor={isEnabled ? "#3e3e3e" : "#3e3e3e"}
            ios_backgroundColor="#3e3e3e"
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
            color="#344053ff"
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
  darkSwitchGroup: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    flexGrow: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  darkLabel: {
    color: '#344053ff',
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
    text: "Blue",
    fillColor: "#3F89BE",
    unfillColor: "#66a8d6",
    iconStyle: _iconStyle("#66a8d6"),
    textStyle: styles.colourName,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
  {
    id: 1,
    text: "Purple",
    fillColor: "#A776B1",
    unfillColor: "#c597cf",
    iconStyle: _iconStyle("#c597cf"),
    textStyle: styles.colourName,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
  {
    id: 2,
    text: "Pink",
    fillColor: "#B06F7F",
    unfillColor: "#db9cac",
    iconStyle: _iconStyle("#db9cac"),
    textStyle: styles.colourName,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
  {
    id: 3,
    text: "Green",
    fillColor: "#679E5E",
    unfillColor: "#8cbd84",
    iconStyle: _iconStyle("#8cbd84"),
    textStyle: styles.colourName,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
  {
    id: 4,
    text: "Orange",
    fillColor: "#D17B3C",
    unfillColor: "#db9e72",
    iconStyle: _iconStyle("#db9e72"),
    textStyle: styles.colourName,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
];
