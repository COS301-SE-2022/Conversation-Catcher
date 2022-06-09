import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/FontAwesome';

export const PdfView = ({ navigation }) =>  {
  const {
    source
  } = this.props
  return (
    
    <View style={styles.pdfPage}>
      <Pdf 
        style={styles.pdfView}
        source={source}
      />
      
      <View style={styles.pdfBar}>
        <TouchableOpacity
              style={styles.moreModalButton}
              onPress={() => Alert.alert('click')}>
              <View style={styles.iconContainer}>
                <Icon 
                  style={styles.moreModalButtonIcon}
                  name="paper-plane-o"
                  size={18}
                />
              </View>
            </TouchableOpacity>

            <View style={styles.moreModalButtonDivider} /> 

            <TouchableOpacity
              style={styles.moreModalButton}
              onPress={() => Alert.alert('click')}>
              <View style={styles.iconContainer}>
                <Icon 
                  style={styles.moreModalButtonIcon}
                  name="pencil-square-o"
                  size={20}
                />
              </View>
            </TouchableOpacity>

            <View style={styles.moreModalButtonDivider} /> 

            <TouchableOpacity 
              style={styles.moreModalButton}
              onPress={() => Alert.alert('click')}>
              <View style={styles.iconContainer}>
                <Icon 
                  style={styles.moreModalButtonIcon}
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

  },
  pdfView: {

  },
  pdfBar: {

  },
})