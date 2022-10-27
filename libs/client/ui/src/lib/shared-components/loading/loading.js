import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LottieView from "lottie-react-native";
import { useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectColour } from '../../../../../../../apps/client/src/app/slices/user.slice';
export function Loading(props) {
  const colourState = useSelector(selectColour);
  if (props.load)
  return (
    <View style = {styles.view}>
      <Text style={[styles.text, {color: colourState.top}]}>{props.text}</Text>
      <LottieView
        source={require("../../assets/loading-circle.json")}
        style={{width: props.width, height: props.height, alignSelf: 'center'}}
        autoPlay
      />
    </View>
  );
  else return(null);
}
const styles = StyleSheet.create({
  // animation: {
  //   width: 250,
  //   height: 250,
  //   alignSelf: 'center'
  // },
  text: {
    fontSize: 24,
    textAlign: 'center'
  },
  view: {
    // borderWidth: 1,
    // borderColor: 'black',
    // borderStyle: 'dashed',
    marginTop: 15,
  }
});
export default Loading;
