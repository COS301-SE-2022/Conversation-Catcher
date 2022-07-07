import React from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colour from '../colour/colour';
//import Pdf from 'react-native-pdf';

export const PdfViewPage = ({ route, navigation }) => {
  const { pdfSource } = route.params;
  const source = {
    uri: pdfSource,
    cache: true,
  };
  return (
    <View style={styles.container}>
      {/*
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link presse: ${uri}`);
        }}
        style={styles.pdf}
      />
      */}
    </View>
  );
}

export default PdfViewPage;

PdfViewPage.inStorybook = true;
PdfViewPage.fitScreen = false;
//SettingsPage.scrollHeight = 844;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
