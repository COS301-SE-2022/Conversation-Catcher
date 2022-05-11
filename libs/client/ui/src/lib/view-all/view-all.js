import React from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, Pressable, TouchableOpacity, Alert } from 'react-native';

export function ViewAll(props) {
  return (
    <View style={[styles.viewAllPage, styles.viewAllPage_layout]}>
      <View style={styles.viewAllPage_item}>
        <View x="0px 390fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.viewAllTopBar}>
          <View x="17px 356fr 17px" y="20px minmax(0px, max-content) 20px" style={styles.topFlex}>
            <View style={styles.topFlex_item}>
              <View x="7.3% 18.26% 74.44%" y="18px minmax(0px, max-content) 0px" style={styles.viewAllTitle_box}>
                <Text style={styles.viewAllTitle} ellipsizeMode={'clip'}>
                  {'PDFs'}
                </Text>
              </View>
            </View>
            <View style={styles.topFlex_item}>
              <View x="0px 356fr 0px" y="11px minmax(0px, max-content) 0px" style={styles.searchBar}>
                <View x="0px 356fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.block19}>
                  <Pressable style={[styles.block20, styles.block20_layout]} onPress={() => Alert.alert('click')}>
                    <View x="14px 328fr 14px" y="10px minmax(0px, max-content) 10px" style={styles.searchContents}>
                      <View style={styles.searchContents_item}>
                        <ImageBackground
                          style={[styles.searchIcon, styles.searchIcon_layout]}
                          source={require('../assets/cf60ecb68aa83021ee8ce615fa41038e.png')}
                        />
                      </View>
                      <View style={styles.searchContents_space} />
                      <View style={styles.searchContents_item1}>
                        <Px.View x="0px 57fr 243px" y="0px minmax(0px, max-content) 0px" style={styles.searchInput_box}>
                          <Text style={styles.searchInput} ellipsizeMode={'clip'}>
                            {'Search'}
                          </Text>
                        </Px.View>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.viewAllPage_item}>
        <Px.View x="0px 390fr 0px" y="640px minmax(0px, max-content) 0px" style={styles.viewAllBottomBar}>
          <Px.View
            x="57.18% 10.51% 32.31%"
            y="8px minmax(0px, max-content) 13px"
            absolute
            style={styles.orderByLabel_box}>
            <Text style={styles.orderByLabel} ellipsizeMode={'clip'}>
              {'Order by'}
            </Text>
          </Px.View>



          <Px.Pressable
            x="69.23% 23.08% 7.69%"
            y="8px minmax(0px, max-content) 9px"
            absolute
            style={styles.orderByDropDown}
            onPress={() => Alert.alert('click')}>
            <View style={styles.orderByDropDown_item}>
              <View style={[styles.orderByDropDownTextBox, styles.orderByDropDownTextBox_layout]}>
                <View style={[styles.orderByDropDownText_box, styles.orderByDropDownText_box_layout]}>
                  <Text style={styles.orderByDropDownText} ellipsizeMode={'clip'}>
                    {'Date'}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.orderByDropDown_space} />
            
          </Px.Pressable>

        </Px.View>
      </View>
    </View>
  );
}
export default ViewAll;

const styles = StyleSheet.create({
  viewAllPage: {
    backgroundColor: '#ffffffff'
  },
  viewAllPage_layout: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    flexGrow: 1,
    marginRight: 0
  },
  viewAllPage_item: {
    flexGrow: 0,
    flexShrink: 1
  },
  viewAllTopBar: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#c4c4c4ff',
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1
    }
  },
  topFlex: {
    flexGrow: 1
  },
  topFlex_item: {
    flexGrow: 0,
    flexShrink: 1
  },
  viewAllTitle: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 30,
    fontSize: 30,
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  viewAllTitle_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  searchBar: {
    width: '100%',
    flexGrow: 1
  },
  block19: {
    width: '100%',
    flexGrow: 1
  },
  block20: {
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
    }
  },
  block20_layout: {
    marginTop: 0,
    height: 44,
    marginLeft: 0,
    width: 356,
    minWidth: 356
  },
  searchContents: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  searchContents_item: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 20
  },
  searchIcon: {
    resizeMode: 'contain'
  },
  searchIcon_layout: {
    marginTop: 2,
    height: 20,
    marginBottom: 2,
    marginLeft: 0,
    width: 20,
    minWidth: 20,
    marginRight: 0
  },
  searchContents_space: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 8
  },
  searchContents_item1: {
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0
  },
  searchInput: {
    color: '#667084ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  searchInput_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  viewAllBottomBar: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#c4c4c4ff',
    shadowColor:
      'transparent' /* cannot find mapping from CSS: 0px -4px 4px 0px rgba(0,0,0,0.09803921568627451), https://ethercreative.github.io/react-native-shadow-generator/ */
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
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  orderByLabel_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  bottomFlex: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  bottomFlex_item: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 42
  },
  backIcon: {
    resizeMode: 'contain'
  },
  bottomFlex_space: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 76
  },
  bottomFlex_item1: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 24
  },
  moreOptionsIcon: {
    resizeMode: 'contain'
  },
  bottomFlex_space1: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 67
  },
  bottomFlex_item2: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 153
  },
  block12: {
    width: '100%',
    flexGrow: 1
  },
  block13: {
    width: '100%',
    flexGrow: 1
  },
  group: {
    width: '100%',
    flexGrow: 1
  },
  pdfFrame: {},
  pdfFrame_layout: {
    position: 'absolute',
    top: -628,
    height: 1290,
    left: -206,
    width: 356
  },
  pdfFrame_item: {
    flexGrow: 0,
    flexShrink: 1
  },
  pdfTile: {
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
  pdfTile_item: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 90
  },
  pdfThumbnail: {
    resizeMode: 'contain',
    borderRadius: 5
  },
  pdfThumbnail_layout: {
    marginTop: 0,
    height: 127,
    marginBottom: 0,
    marginLeft: 0,
    width: 90,
    minWidth: 90,
    marginRight: 0
  },
  pdfTile_space: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 13
  },
  pdfTile_item1: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 253
  },
  pdfTileInfo: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  pdfTileInfo_item: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 220
  },
  pdfTileText: {
    flexGrow: 1
  },
  pdfTileText_item: {
    flexGrow: 0,
    flexShrink: 1
  },
  pdfName: {
    color: '#344053ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  pdfName_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  pdfDate: {
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
  pdfDate_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  pdfTileInfo_item1: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 33
  },
  downloadState: {
    width: '100%',
    flexGrow: 1
  },
  downloadIcon: {
    resizeMode: 'contain'
  },
  downloadIcon_layout: {
    marginTop: 10,
    height: 18,
    marginBottom: 10,
    marginLeft: 4,
    width: 18,
    minWidth: 18,
    marginRight: 11
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
  block7_item1: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 36
  },
  image2: {
    resizeMode: 'contain'
  },
  image: {
    resizeMode: 'contain',
    borderRadius: 5
  },
  image_layout: {
    marginTop: 0,
    height: 127,
    marginBottom: 0,
    marginLeft: 0,
    width: 90,
    minWidth: 90,
    marginRight: 0
  },
  pdfTile_item2: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 253
  },
  block3: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  block3_item: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 220
  },
  text_body_box1: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  block3_item1: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 33
  },
  block5: {
    width: '100%',
    flexGrow: 1
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
  block9_item: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 90
  },
  block9_space: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 13
  },
  block9_item1: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 253
  },
  pdfName_box2_layout: {
    position: 'absolute',
    top: 29,
    width: 218,
    right: -3
  },
  pdfName_box2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text_body_box_layout1: {
    position: 'absolute',
    top: 78,
    height: 20,
    left: -2,
    width: 123
  },
  block7_item2: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 36
  },
  image2_layout: {
    marginTop: 0,
    height: 34,
    marginBottom: 93,
    marginLeft: 0,
    width: 31,
    minWidth: 31,
    marginRight: 5
  },
  pdfTile_item3: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 253
  },
  text_body_box2: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  block3_item2: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 33
  },
  pdfFrame_space: {
    flexGrow: 0,
    flexShrink: 1
  },
  orderByDropDown: {
    flexGrow: 1,
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
    flexDirection: 'row'
  },
  orderByDropDown_item: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 48
  },
  orderByDropDownTextBox: {},
  orderByDropDownTextBox_layout: {
    marginTop: 10,
    height: 24,
    marginBottom: 10,
    marginLeft: 14,
    flexGrow: 1,
    marginRight: 0
  },
  orderByDropDownText_box_layout: {
    position: 'absolute',
    top: 0,
    width: 40,
    right: -6
  },
  orderByDropDownText: {
    color: '#667084ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  orderByDropDownText_box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  orderByDropDown_space: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 8
  },
  orderByDropDown_item1: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 34
  },
  orderByButton: {
    width: '100%',
    flexGrow: 1
  },
  orderByIcon: {
    resizeMode: 'contain'
  },
  orderByIcon_layout: {
    marginTop: 8,
    height: 5,
    marginBottom: 7,
    marginLeft: 5,
    width: 10,
    minWidth: 10,
    marginRight: 5
  }
});