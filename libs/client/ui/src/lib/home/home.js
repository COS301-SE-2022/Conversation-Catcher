import React from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';

export const Home = ({ navigation }) => {
  return (
    <View style={[styles.home, styles.home_layout]}>
      <View style={[styles.homeFlex, styles.homeFlex_layout]}>
        <View style={styles.homeFlex_item}>
          <View x="0px 360fr 4px" y="0px minmax(0px, max-content) 0px" style={styles.pdfContents}>
            <View style={styles.pdfContents_item}>
              <View x="3.61% 27.5% 68.89%" y="0px minmax(0px, max-content) 0px" style={styles.big_title_box}>
                <Text style={styles.big_title} ellipsizeMode={'clip'}>
                  {'Recents'}
                </Text>
              </View>
            </View>
            <View style={styles.pdfContents_item}>
              <View x="4px 356fr 0px" y="24px minmax(0px, max-content) 0px" style={styles.recentPdfTiles}>
                <View style={styles.recentPdfTiles_item}>
                  <TouchableOpacity type="TouchableOpacity" id="btn"
                    x="0px 356fr 0px"
                    y="0px minmax(0px, max-content) 0px"
                    style={styles.pdfTile}
                    onPress={() => Alert.alert('click')}>
                    <View style={styles.pdfTile_item}>
                      <ImageBackground
                        style={[styles.pdfThumbnail, styles.pdfThumbnail_layout]}
                        source={require('../assets/23a067db3896c1ac956e0e22fe9c7588.png')}
                      />
                    </View>
                    <View style={styles.pdfTile_space}/>
                    <View style={styles.pdfTile_item1}>
                      <View x="0px 253fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.pdfTileInfo}>
                        <View style={styles.pdfTileInfo_item}>
                          <View x="1px 219fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.pdfTileText}>
                            <View style={styles.pdfTileText_item}>
                              <View
                                x="0px 218fr 1px"
                                y="29px minmax(0px, max-content) 0px"
                                style={styles.pdfName_box}>
                                <Text style={styles.pdfName} ellipsizeMode={'clip'}>
                                  {'Bug introduction: a modification of code'}
                                </Text>
                              </View>
                            </View>
                            <View style={styles.pdfTileText_item}>
                              <View
                                x="1px 217fr 1px"
                                y="9px minmax(0px, max-content) 29px"
                                style={styles.pdfDate_box}>
                                <Text style={styles.pdfDate} ellipsizeMode={'clip'}>
                                  {'1 May 2022, 9:37'}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View style={styles.pdfTileInfo_item1}>
                          <TouchableOpacity 
                            x="0px 33fr 0px"
                            y="0px minmax(0px, max-content) 89px"
                            style={styles.downloadState}
                            onPress={() => Alert.alert('click')}>
                            <ImageBackground
                              style={[styles.downloadIcon, styles.downloadIcon_layout]}
                              source={require('../assets/6784b72f243ed3938b4effbf0ffc0c7a.png')}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.recentPdfTiles_item}>
                  <TouchableOpacity
                    x="0px 356fr 0px"
                    y="18px minmax(0px, max-content) 0px"
                    style={styles.pdfTile}
                    onPress={() => Alert.alert('click')}>
                    <View style={styles.pdfTile_item}>
                      <ImageBackground
                        style={[styles.pdfThumbnail, styles.pdfThumbnail_layout1]}
                        source={require('../assets/2b2d102eac55f56c11649d75b48bf464.png')}
                      />
                    </View>
                    <View style={styles.pdfTile_space} />
                    <View style={styles.pdfTile_item2}>
                      <View x="0px 253fr 0px" y="0px minmax(0px, max-content) 1px" style={styles.block8}>
                        <View style={styles.block8_item}>
                          <View style={[styles.block9, styles.block9_layout]}>
                            <View style={[styles.pdfName_box1, styles.pdfName_box1_layout]}>
                              <Text style={styles.pdfName} ellipsizeMode={'clip'}>
                                {'Human-computer interaction'}
                              </Text>
                            </View>
                            <View style={[styles.pdfDate_box1, styles.pdfDate_box1_layout]}>
                              <Text style={styles.pdfDate} ellipsizeMode={'clip'}>
                                {'21 Apr 2022, 14:18'}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.block8_item1}>
                          <ImageBackground
                            x="0px 31px 5px"
                            y="0px 34px 93px"
                            style={styles.image2}
                            onPress={() => Alert.alert('click')}
                            source={require('../assets/4517a97e95ebe8ad3751a63a5759b6d2.png')}
                            container={TouchableOpacity}
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.recentPdfTiles_item}>
                  <TouchableOpacity
                    x="0px 356fr 0px"
                    y="18px minmax(0px, max-content) 0px"
                    style={styles.pdfTile}
                    onPress={() => Alert.alert('click')}>
                    <View style={styles.pdfTile_item}>
                      <ImageBackground
                        style={[styles.pdfThumbnail, styles.pdfThumbnail_layout]}
                        source={require('../assets/634a9d41d1a919acda75dccb24941e81.png')}
                      />
                    </View>
                    <View style={styles.pdfTile_space} />
                    <View style={styles.pdfTile_item3}>
                      <View x="0px 253fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.pdfTileInfo}>
                        <View style={styles.pdfTileInfo_item}>
                          <View x="1px 219fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.pdfTileText}>
                            <View style={styles.pdfTileText_item}>
                              <View
                                x="0px 218fr 1px"
                                y="29px minmax(0px, max-content) 0px"
                                style={styles.pdfName_box}>
                                <Text style={styles.pdfName} ellipsizeMode={'clip'}>
                                  {'The tropical plants of the Philippines'}
                                </Text>
                              </View>
                            </View>
                            <View style={styles.pdfTileText_item}>
                              <View
                                x="1px 217fr 1px"
                                y="9px minmax(0px, max-content) 29px"
                                style={styles.pdfDate_box}>
                                <Text style={styles.pdfDate} ellipsizeMode={'clip'}>
                                  {'13 Apr 2022, 11:53'}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View style={styles.pdfTileInfo_item2}>
                          <TouchableOpacity
                            x="0px 33fr 0px"
                            y="0px minmax(0px, max-content) 89px"
                            style={styles.downloadState}
                            onPress={() => Alert.alert('click')}>
                            <ImageBackground
                              style={[styles.downloadIcon, styles.downloadIcon_layout]}
                              source={require('../assets/6784b72f243ed3938b4effbf0ffc0c7a.png')}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.pdfContents_item}>
              <View x="4px 356fr 0px" y="27px minmax(0px, max-content) 0px" style={styles.viewAllTouchableOpacityFrame}>
                <TouchableOpacity
                  x="23px 310fr 23px"
                  y="0px minmax(0px, max-content) 0px"
                  style={styles.viewAllTouchableOpacity}
                  onPress={() =>
                    navigation.navigate('ViewAll')}>
                  <View
                    x="103px minmax(0px, max-content) 98fr"
                    y="10px minmax(0px, max-content) 10fr"
                    style={styles.viewAllTouchableOpacityLabel_box}>
                    <Text style={styles.viewAllTouchableOpacityLabel} ellipsizeMode={'clip'}>
                      {'View all PDFs'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.homeFlex_item}>
          <View style={[styles.homeDiv, styles.homeDiv_layout]} />
        </View>
        <View style={styles.homeFlex_item}>
          <TouchableOpacity
            x="27px 310fr 27px"
            y="25px minmax(0px, max-content) 0px"
            style={styles.settingsTouchableOpacity}
            onPress={() => navigation.navigate('Home')}>
            <view
              x="0px 310fr 0px"
              y="0px minmax(0px, max-content) 0px"
              style={styles.settingsSpacing}>
              <View style={styles.settingsSpacing_item}>
                <ImageBackground
                  style={[styles.settingsIcon, styles.settingsIcon_layout]}
                  source={require('../assets/7ad1b7976053414cc835006cba34b16d.png')}
                />
              </View>
              <View style={styles.settingsSpacing_space} />
              <View style={styles.settingsSpacing_item1}>
                <View x="0px 66fr 121px" y="10px minmax(0px, max-content) 10px" style={styles.settingsText_box}>
                  <Text style={styles.settingsText} ellipsizeMode={'clip'}>
                    {'Settings'}
                  </Text>
                </View>
              </View>
            </view>
          </TouchableOpacity>
        </View>
        <View style={styles.homeFlex_item}>
          <View x="28.3% 43.96% 27.75%" y="38px minmax(0px, max-content) 11px" style={styles.audioTouchableOpacityGroup}>
            <View style={styles.audioTouchableOpacityGroup_item}>
              <TouchableOpacity
                x="0px 80fr 0px"
                y="0px minmax(0px, max-content) 0px"
                style={styles.recordAudioTouchableOpacity}
                onPress={() => Alert.alert('click')}>
                <ImageBackground
                  style={[styles.recordAudioIcon, styles.recordAudioIcon_layout]}
                  source={require('../assets/6224a20de8d1d66e441de471733c2168.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.audioTouchableOpacityGroup_item}>
              <TouchableOpacity
                x="0px 80fr 0px"
                y="0px minmax(0px, max-content) 0px"
                style={styles.uploadAudioTouchableOpacity}
                onPress={() => Alert.alert('click')}>
                <ImageBackground
                  style={[styles.audioTouchableOpacityGroupDiv, styles.audioTouchableOpacityGroupDiv_layout]}
                  source={require('../assets/0b67feb53a71fc494ea1192023ca3fe0.png')}
                />
                <ImageBackground
                  style={[styles.uploadAudioIcon, styles.uploadAudioIcon_layout]}
                  source={require('../assets/f096234e78f59a804b946264f7026e00.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
export default Home;

Home.inStorybook = true;
Home.fitScreen = false;
Home.scrollHeight = 844;

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#ffffffff',
    overflow: 'hidden'
  },
  home_layout: {
    marginTop: 0,
    marginBottom: 0,
    minHeight: 844,
    flexShrink: 0,
    marginLeft: 0,
    flexGrow: 1,
    marginRight: 0
  },
  homeFlex: {
    overflow: 'hidden'
  },
  homeFlex_layout: {
    marginTop: 38,
    height: 768,
    marginLeft: 13,
    width: 364,
    minWidth: 364
  },
  homeFlex_item: {
    flexGrow: 0,
    flexShrink: 1
  },
  pdfContents: {
    flexGrow: 1
  },
  pdfContents_item: {
    flexGrow: 0,
    flexShrink: 1
  },
  big_title: {
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
  big_title_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  recentPdfTiles: {
    flexGrow: 1
  },
  recentPdfTiles_item: {
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
  pdfThumbnail_layout1: {
    marginTop: 0,
    height: 128,
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
  block8: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  block8_item: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 217
  },
  block9: {},
  block9_layout: {
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
  pdfDate_box1_layout: {
    position: 'absolute',
    top: 78,
    height: 20,
    left: -2,
    width: 127
  },
  pdfDate_box1: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  block8_item1: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 36
  },
  image2: {
    resizeMode: 'contain'
  },
  pdfTile_item3: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 253
  },
  pdfTileInfo_item2: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 33
  },
  viewAllTouchableOpacityFrame: {
    width: '100%',
    flexGrow: 1,
    borderRadius: 8
  },
  viewAllTouchableOpacity: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#3f89beff',
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: '#3f89beff',
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
  viewAllTouchableOpacityLabel: {
    color: '#ffffffff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 24,
    fontSize: 20,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  viewAllTouchableOpacityLabel_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  homeDiv: {
    backgroundColor: '#d0d5ddff',
    borderRadius: 0.5,
    overflow: 'hidden' /* for borderRadius */,
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1
    }
  },
  homeDiv_layout: {
    marginTop: 26,
    height: 1,
    marginBottom: 0,
    marginLeft: 4,
    flexGrow: 1,
    marginRight: 4
  },
  settingsTouchableOpacity: {
    width: '100%',
    flexGrow: 1,
    borderRadius: 8
  },
  settingsSpacing: {
    flexGrow: 1,
    backgroundColor: '#9bcbedff',
    borderRadius: 8,
    overflow: 'hidden',
    borderStyle: 'solid',
    borderColor: '#9bcbedff',
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
  settingsSpacing_item: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 39
  },
  settingsIcon: {
    resizeMode: 'contain'
  },
  settingsIcon_layout: {
    marginTop: 10,
    height: 24,
    marginBottom: 10,
    marginLeft: 10,
    width: 29,
    minWidth: 29,
    marginRight: 0
  },
  settingsSpacing_space: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 84
  },
  settingsSpacing_item1: {
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0
  },
  settingsText: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 24,
    fontSize: 20,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  settingsText_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  audioTouchableOpacityGroup: {
    flexGrow: 1,
    borderRadius: 8,
    flexDirection: 'row'
  },
  audioTouchableOpacityGroup_item: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 80
  },
  recordAudioTouchableOpacity: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#d0d5ddff',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000000',
    shadowRadius: 1.810810810810811,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 1
    }
  },
  recordAudioIcon: {
    resizeMode: 'contain'
  },
  recordAudioIcon_layout: {
    marginTop: 20,
    height: 40,
    marginBottom: 20,
    marginLeft: 27,
    width: 26,
    minWidth: 26,
    marginRight: 27
  },
  uploadAudioTouchableOpacity: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#d0d5ddff',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000000',
    shadowRadius: 1.810810810810811,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 1
    }
  },
  audioTouchableOpacityGroupDiv: {
    resizeMode: 'contain',
    borderStyle: 'solid',
    borderColor: '#667085ff'
  },
  audioTouchableOpacityGroupDiv_layout: {
    position: 'absolute',
    top: -10,
    height: 100,
    left: -10,
    width: 21
  },
  uploadAudioIcon: {
    resizeMode: 'contain'
  },
  uploadAudioIcon_layout: {
    marginTop: 22,
    height: 36,
    marginBottom: 22,
    marginLeft: 22,
    width: 36,
    minWidth: 36,
    marginRight: 22
  }
});