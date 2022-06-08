import React from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, Alert, ScrollView, TextInput} from 'react-native';
import PdfTile from '../shared-components/pdf-tile/pdf-tile.js';
import ModalDropdown from 'react-native-modal-dropdown';

export const ViewAll = ({ navigation }) =>  {
  return (
    <View style={styles.viewAllPage}>
      <View style={styles.viewAllTopBar}>
        <View style={styles.big_title_box}>
          <Text style={styles.big_title}>
            {'PDFs'}
          </Text>
        </View>

        <View style={styles.searchBarGroup}>
          <ImageBackground
            style={styles.searchIcon}
            //source={require('../assets/search.png')}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={() => Alert.alert('click')}
          />
        </View>
      </View>

      <ScrollView style={styles.recentPdfTiles}>
        <PdfTile 
          name = 'Bug introduction: a modification of code' 
          date = '1 May 2022, 9:37' 
          source = {"../assets/pdf-bug-intro.png"} 
          downloaded = {true}/>
        <PdfTile 
          name = 'Human-computer interaction' 
          date = '21 Apr 2022, 14:18' 
          source = {"../assets/pdf-human-computer.png"} 
          downloaded = {false}/>
        <PdfTile 
          name = 'The tropical plants of the Philippines' 
          date = '13 Apr 2022, 11:53' 
          source = {"../assets/pdf-tropical-plants.png"} 
          downloaded = {true}/>
        <PdfTile 
          name = 'Devin Brittain The snacks of the popcorn' 
          date = '13 Apr 2022, 11:53' 
          source = {"../assets/pdf-tropical-plants.png"} 
          downloaded = {true}/>
        <PdfTile 
          name = 'The tropical plants of the Philippines' 
          date = '13 Apr 2022, 11:53' 
          source = {"../assets/pdf-tropical-plants.png"} 
          downloaded = {true}/>
        <PdfTile 
          name = 'The tropical plants of the Philippines' 
          date = '13 Apr 2022, 11:53' 
          source = {"../assets/pdf-tropical-plants.png"} 
          downloaded = {true}/>
      </ScrollView>

      <View style={styles.viewAllBottomBar}>
        <TouchableOpacity style={styles.backButton}>
          <ImageBackground
            style={styles.backIcon}
            onPress={() =>
              navigation.navigate('Home')}
            //source={require('../assets/back-arrow.png')}
            container={TouchableOpacity}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.moreButton}>
          <ImageBackground
            style={styles.moreOptionsIcon}
            onPress={() => Alert.alert('click')}
            //source={require('../assets/dots.png')}
            container={TouchableOpacity}
          />
        </TouchableOpacity>

        <View
          style={styles.orderByGroup}>
          <Text style={styles.orderByLabel}>
            {'Order by'}
          </Text>
          <ModalDropdown 
            options={['Date', 'Name']}
            defaultIndex={1}
            style={styles.orderByDropdown}
            textStyle={styles.orderByDropdownText}
            dropdownStyle={styles.orderByDropdownStyle}/>
        </View>     
      </View>
    </View>
  );
}
export default ViewAll;

const styles = StyleSheet.create({
  viewAllPage: {
    backgroundColor: '#ffffffff',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    flexGrow: 1,
    marginRight: 0
  },
  viewAllTopBar: {
    width: '100%',
    flexShrink: 1,
    backgroundColor: '#c4c4c4ff',
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1
    },
    alignItems: 'center',
    flexDirection: 'column'
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
  },
  big_title_box: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
    height: '5%',
    width: '100%',
    minHeight: 28,
  },
  searchBarGroup: {
    width: '80%',
    flexShrink: 1,
    margin: 10
  },
  searchInput: {
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
    },
    color: '#667084ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    padding: 5
  },
  searchIcon: {
    resizeMode: 'contain',
    marginTop: 2,
    height: 20,
    marginBottom: 2,
    marginLeft: 0,
    width: 20,
    minWidth: 20,
    marginRight: 0
  },
  recentPdfTiles: {
    height: '70%',
    paddingLeft: 15,
    paddingRight: 15,
    overflow: 'visible',
  },
  viewAllBottomBar: {
    width: '100%',
    flexDirection: 'row',
    flexGrow: 1,
    backgroundColor: '#c4c4c4ff',
    //shadowColor: 'transparent' /* cannot find mapping from CSS: 0px -4px 4px 0px rgba(0,0,0,0.09803921568627451), https://ethercreative.github.io/react-native-shadow-generator/ */
  },
  backButton: {

  },
  backIcon: {
    resizeMode: 'contain'
  },
  moreButton: {

  },
  moreOptionsIcon: {
    resizeMode: 'contain'
  },
  block6: {
    flexGrow: 1,
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
    flexDirection: 'row'
  },
  block6_item: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 90
  },
  image1: {
    resizeMode: 'contain',
    borderRadius: 5
  },
  image1_layout: {
    marginTop: 0,
    height: 128,
    marginBottom: 0,
    marginLeft: 0,
    width: 90,
    minWidth: 90,
    marginRight: 0
  },
  block6_space: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 13
  },
  block6_item1: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 253
  },
  block7: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  block7_item: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 217
  },
  block8: {},
  block8_layout: {
    marginTop: 0,
    height: 127,
    marginBottom: 0,
    marginLeft: 5,
    flexGrow: 1,
    marginRight: 0
  },
  pdfName_box1_layout: {
    position: 'absolute',
    top: 39,
    width: 223,
    right: -8
  },
  pdfName_box1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text_body_box_layout: {
    position: 'absolute',
    top: 78,
    height: 20,
    left: -2,
    width: 127
  },
  text_body: {
    color: '#667084ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  text_body_box: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  block9: {
    flexGrow: 1,
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
    flexDirection: 'row'
  },
  orderByGroup: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginVertical: 5,
  },
  orderByLabel: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    padding: 3,
  },
  orderByDropdown: {
    flexShrink: 1,
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
    },
    flexDirection: 'row',
    marginVertical: 5,
    width: 120
  },
  orderByDropdownText: {
    color: '#667084ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 18,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    padding: 10
  },
  orderByDropDownText_box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  orderByDropdownStyle: {

  }
});