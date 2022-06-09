import React, {useState} from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, Alert, ScrollView, TextInput} from 'react-native';
import PdfTile from '../shared-components/pdf-tile/pdf-tile.js';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

export const ViewAll = ({ navigation }) =>  {
  const [moreVisible, setMoreVisible] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  return (
    <View style={styles.viewAllPage}>
      <View style={styles.viewAllTopBar}>
        <View style={styles.big_title_box}>
          <Text style={styles.big_title}>
            {'PDFs'}
          </Text>
        </View>

        <View style={styles.searchBarGroup}>
          <View style={styles.searchIconFrame}>
            <Icon 
              color="#667084ff"
              name="search"
              size={24}
            />
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={() => Alert.alert('click')}
          />
        </View>
      </View>

      <ScrollView style={styles.recentPdfTiles}>
        <PdfTile 
          id = {1}
          name = 'Bug introduction: a modification of code' 
          date = '1 May 2022, 9:37' 
          source = {"../assets/pdf-bug-intro.png"} 
          downloaded = {true}
          showCheck = {deleteMode}/>
        <PdfTile 
          id = {2}
          name = 'Human-computer interaction' 
          date = '21 Apr 2022, 14:18' 
          source = {"../assets/pdf-human-computer.png"} 
          downloaded = {false}
          showCheck = {deleteMode}/>
        <PdfTile 
          id = {3}
          name = 'The tropical plants of the Philippines' 
          date = '13 Apr 2022, 11:53' 
          source = {"../assets/pdf-tropical-plants.png"} 
          downloaded = {true}
          showCheck = {deleteMode}/>
        <PdfTile 
          id = {4}
          name = 'Devin Brittain The snacks of the popcorn' 
          date = '13 Apr 2022, 11:53' 
          source = {"../assets/pdf-tropical-plants.png"} 
          downloaded = {true}
          showCheck = {deleteMode}/>
        <PdfTile 
          id = {5}
          name = 'The tropical plants of the Philippines' 
          date = '13 Apr 2022, 11:53' 
          source = {"../assets/pdf-tropical-plants.png"} 
          downloaded = {true}
          showCheck = {deleteMode}/>
        <PdfTile 
          id = {6}
          name = 'The tropical plants of the Philippines' 
          date = '13 Apr 2022, 11:53' 
          source = {"../assets/pdf-tropical-plants.png"} 
          downloaded = {true}
          showCheck = {deleteMode}/>
      </ScrollView>

      <View style={styles.viewAllBottomBar}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}>
          <Icon 
            name="angle-left"
            color="#344053ff"
            size={30}
          />     
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.moreButton}
          onPress={() => setMoreVisible(true)}>
          <Icon 
            name="ellipsis-h"
            color="#344053ff"
            size={30}
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


      <Modal
        style={styles.modal}
        isVisible={moreVisible}
        avoidKeyboard={true}
        hasBackdrop={true}
        backdropColor='white'
        onBackdropPress={() => setMoreVisible(false)}
      >
        <View style={styles.moreModalInner}>
          <TouchableOpacity
            style={styles.moreModalButton}
            onPress={() => Alert.alert('click')}>
            <View style={styles.moreModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon 
                  style={styles.moreModalButtonIcon}
                  name="paper-plane-o"
                  size={18}
                />
              </View>
              <View style={styles.moreModalButtonText_box}>
                <Text style={styles.moreModalButtonText} ellipsizeMode={'clip'}>
                  {'Share'}
                </Text>
              </View>
            </View>   
          </TouchableOpacity>

          <View style={styles.moreModalButtonDivider} /> 

          <TouchableOpacity
            style={styles.moreModalButton}
            onPress={() => Alert.alert('click')}>
            <View style={styles.moreModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon 
                  style={styles.moreModalButtonIcon}
                  name="pencil-square-o"
                  size={20}
                />
              </View>
              <View style={styles.moreModalButtonText_box}>
                <Text style={styles.moreModalButtonText}>
                  {'Rename'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.moreModalButtonDivider} /> 

          <TouchableOpacity 
            style={styles.moreModalButton}
            onPress={() => setDeleteMode(true)}>
            <View style={styles.moreModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon 
                  style={styles.moreModalButtonIcon}
                  name="trash-o"
                  size={20}
                />
              </View>
              <View style={styles.moreModalButtonText_box}>
                <Text style={styles.moreModalButtonText}>
                  {'Delete'}
                </Text>
              </View>
            </View> 
          </TouchableOpacity>
        </View>
      </Modal>
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
    width: '85%',
    flexShrink: 1,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
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
    padding: 5,
    flexGrow: 1
  },
  searchIconFrame: {
    resizeMode: 'contain',
    marginHorizontal: 10
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
    flexShrink: 1,
    backgroundColor: '#c4c4c4ff',
    //shadowColor: 'transparent' /* cannot find mapping from CSS: 0px -4px 4px 0px rgba(0,0,0,0.09803921568627451), https://ethercreative.github.io/react-native-shadow-generator/ */
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
  backButton: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButton: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    flexShrink: 1
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

  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  moreModalInner: {
    width: '45%',
    flexShrink: 1,
    backgroundColor: '#f5f5f5ff',
    borderRadius: 7,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#667084ff',
    opacity: 1
  },
  moreModalButton: {
    flexGrow: 1,
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  moreModalButtonContent: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //padding: 5
  },
  iconContainer: {
    width: '40%',
    height: '100%',
    alignItems: 'center'
  },
  moreModalButtonIcon: {
    color: "#3f89beff"
  },
  moreModalButtonText: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
  },
  moreModalButtonText_box: {
    flexShrink: 1
  },
  moreModalButtonDivider: {
    backgroundColor: '#d0d5ddff',
    height: 1,
    width: '87%',
    alignSelf: 'center'
  },
});