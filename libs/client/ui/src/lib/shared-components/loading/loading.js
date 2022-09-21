import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LottieView from "lottie-react-native";
export function Loading(props) {
  if (props.load)
  return (
    <View style = {styles.view}>
      <Text style={styles.text}>Fetching your pdfs</Text>
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
