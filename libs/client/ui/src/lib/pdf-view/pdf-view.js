import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const PdfView = ({ route, navigation }) =>  {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const {
    source,
    name,
    date
  } = route.params

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <View style={styles.pdfPage}>
      <View style={styles.pdfTopBar}>
        <Text style={styles.pdfName}>
          {name}
        </Text>
        <Text style={styles.pdfDate}>
          {date}
        </Text>
      </View>
{/*
      <Document file={source} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <Text>
        Page {pageNumber} of {numPages}
      </Text>
  */}
      <View style={styles.pdfBottomBar}>
        <TouchableOpacity
          style={styles.optionsButton}
          onPress={() => navigation.goBack()}>
          <View style={styles.iconContainer}>
            <Icon 
              style={styles.optionsButtonIcon}
              name="angle-left"
              size={18}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionsButton}
          onPress={() => Alert.alert('click')}>
          <View style={styles.iconContainer}>
            <Icon 
              style={styles.optionsButtonIcon}
              name="paper-plane-o"
              size={18}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionsButton}
          onPress={() => Alert.alert('click')}>
          <View style={styles.iconContainer}>
            <Icon 
              style={styles.optionsButtonIcon}
              name="pencil-square-o"
              size={20}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.optionsButton}
          onPress={() => Alert.alert('click')}>
          <View style={styles.iconContainer}>
            <Icon 
              style={styles.optionsButtonIcon}
              name="trash-o"
              size={20}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default PdfView;

const styles = StyleSheet.create({
  pdfPage: {
    flex: 1
  },
  pdfTopBar: {
    width: '100%',
    flexDirection: 'row',
    //flexShrink: 1,
    flex: 1,
    backgroundColor: '#c4c4c4ff',
    borderRadius: 5,
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
    },
    justifyContent: 'center'
  },
  pdfName: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 28,
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
  },
  pdfDate: {
    color: '#667084ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    padding: 5,
    flexGrow: 1
  },
  pdfView: {
    flex: 6
  },
  pdfBottomBar: {
    width: '100%',
    flexDirection: 'row',
    //flexShrink: 1,
    flex: 1,
    backgroundColor: '#c4c4c4ff',
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: '#d0d5ddff',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1
    },
    justifyContent: 'center'
  },
  optionsButton: {
    flexGrow: 1,
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconContainer: {
    width: '40%',
    height: '100%',
    alignItems: 'center'
  },
  optionsButtonIcon: {
    color: "#3f89beff"
  },
})