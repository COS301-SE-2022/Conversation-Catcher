import React from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity} from 'react-native';
export const SettingsPage = ({ navigation }) => {
  return (
    <View style={[styles.settigs, styles.settigs_layout]}>
      < View x="12.5px 365fr 12.5px" y="60px minmax(0px, max-content) 60px" style={styles.settingsBody}>
        <View style={styles.settingsBody_item}>
          < View x="0% 34.52% 65.48%" y="51px minmax(0px, max-content) 0px" style={styles.settingsBody_box}>
            <Text style={styles.settingsBody1} ellipsizeMode={'clip'}>
              {'Settings'}
            </Text>
          </ View>
        </View>
        <View style={styles.settingsBody_item}>
          < View x="12.5px 340fr 12.5px" y="22px minmax(0px, max-content) 0px" style={styles.settingsButtonGroup}>
            < View x="24px 292fr 24px" y="0px minmax(0px, max-content) 0px" style={styles.settingsButtonContentGroup}>
              <View style={styles.settingsButtonContentGroup_item}>
                < View x="2px 290fr 0px" y="0px minmax(0px, max-content) 2px" style={styles.flex2}>
                  <View style={styles.flex2_item}>
                    < View x="0px 290fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.flex3}>
                      <View style={styles.flex3_item}>
                        < View x="0px 290fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.group}>
                          < View
                            x="0px 288fr 2px"
                            y="0px minmax(0px, max-content) 153px"
                            absolute
                            style={styles.settingsButton}>
                            <View style={styles.settingsButton_item}>
                              <View style={[styles.settingsButtonContent, styles.settingsButtonContent_layout]}>
                                <ImageBackground
                                  style={[styles.settingsButtonIcon, styles.settingsButtonIcon_layout]}
                                  source={require('../assets/79679bee68e57c649afa27a8de7f3414.png')}
                                />
                                <View style={[styles.settingsButtonText_box, styles.settingsButtonText_box_layout]}>
                                  <Text style={styles.settingsButtonText} ellipsizeMode={'clip'}>
                                    {'Change email'}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <View style={styles.settingsButton_item}>
                              <View style={[styles.settingsButtonDivider, styles.settingsButtonDivider_layout]} />
                            </View>
                          </ View>

                          < View
                            x="0px 288fr 2px"
                            y="51px minmax(0px, max-content) 102px"
                            absolute
                            style={styles.settingsButton}>
                            <View style={styles.settingsButton_item}>
                              <View style={[styles.settingsButtonContent, styles.settingsButtonContent_layout]}>
                                <ImageBackground
                                  style={[styles.settingsButtonIcon, styles.settingsButtonIcon_layout]}
                                  source={require('../assets/de8bda761eb9ceb32e01cf462e01ee7b.png')}
                                />
                                <View style={[styles.settingsButtonText_box, styles.settingsButtonText_box_layout1]}>
                                  <Text style={styles.settingsButtonText} ellipsizeMode={'clip'}>
                                    {'Change password'}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <View style={styles.settingsButton_item}>
                              <View style={[styles.settingsButtonDivider, styles.settingsButtonDivider_layout]} />
                            </View>
                          </ View>

                          < View
                            x="0px 288fr 2px"
                            y="102px minmax(0px, max-content) 51px"
                            absolute
                            style={styles.settingsButton}>
                            <View style={styles.settingsButton_item}>
                              <View style={[styles.settingsButtonContent, styles.settingsButtonContent_layout]}>
                                <ImageBackground
                                  style={[styles.settingsButtonIcon, styles.settingsButtonIcon_layout]}
                                  source={require('../assets/c2a1ee46204a89d839eacd0921c2b2f7.png')}
                                />
                                <View style={[styles.settingsButtonText_box, styles.settingsButtonText_box_layout2]}>
                                  <Text style={styles.settingsButtonText} ellipsizeMode={'clip'}>
                                    {'Change colour'}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <View style={styles.settingsButton_item}>
                              <View style={[styles.settingsButtonDivider, styles.settingsButtonDivider_layout]} />
                            </View>
                          </ View>

                          < View
                            x="0px 290fr 0px"
                            y="153px minmax(0px, max-content) 0px"
                            style={styles.settingsButton1}>
                            < View
                              x="2px 288fr 0px"
                              y="14px minmax(0px, max-content) 13px"
                              style={styles.settingsButtonText1}>
                              <View style={styles.settingsButtonText_item}>
                                <ImageBackground
                                  style={[styles.settingsButtonIcon, styles.settingsButtonIcon_layout1]}
                                  source={require('../assets/754d89ce51e0854b878e2ef557f04bde.png')}
                                />
                              </View>
                              <View style={styles.settingsButtonText_space} />
                              <View style={styles.settingsButtonText_item1}>
                                < View
                                  x="0px 65fr 175px"
                                  y="3px minmax(0px, max-content) 2px"
                                  style={styles.settingsButtonText_box1}>
                                  <Text style={styles.settingsButtonText} ellipsizeMode={'clip'}>
                                    {'Log out'}
                                  </Text>
                                </ View>
                              </View>
                            </ View>
                          </ View>
                        </ View>
                      </View>
                    </ View>
                  </View>
                </ View>
              </View>
            </ View>
          </ View>
        </View>
        <TouchableOpacity  style={styles.settingsBody_item} onPress={() => navigation.navigate('Home')}>
          <ImageBackground
            style={[styles.backButton, styles.backButton_layout]}
            source={require('../assets/f762e82c40c63fd888499d8d139bcf08.png')}
          />
        </TouchableOpacity >
      </ View>
    </View>
  );
}

SettingsPage.inStorybook = true;
SettingsPage.fitScreen = false;
SettingsPage.scrollHeight = 844;

const styles = StyleSheet.create({
  settigs: {
    backgroundColor: '#ffffffff',
    overflow: 'hidden'
  },
  settigs_layout: {
    marginTop: 0,
    marginBottom: 0,
    minHeight: 844,
    flexShrink: 0,
    marginLeft: 0,
    flexGrow: 1,
    marginRight: 0
  },
  settingsBody: {
    flexGrow: 1
  },
  settingsBody_item: {
    flexGrow: 0,
    flexShrink: 1
  },
  settingsBody1: {
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
  settingsBody_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  settingsButtonGroup: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#f5f5f5ff',
    borderRadius: 7
  },
  settingsButtonContentGroup: {
    flexGrow: 1
  },
  settingsButtonContentGroup_item: {
    flexGrow: 0,
    flexShrink: 1
  },
  flex2: {
    flexGrow: 1
  },
  flex2_item: {
    flexGrow: 0,
    flexShrink: 1
  },
  flex3: {
    flexGrow: 1
  },
  flex3_item: {
    flexGrow: 0,
    flexShrink: 1
  },
  group: {
    width: '100%',
    flexGrow: 1
  },
  settingsButton: {
    flexGrow: 1
  },
  settingsButton_item: {
    flexGrow: 0,
    flexShrink: 1
  },
  settingsButtonContent: {},
  settingsButtonContent_layout: {
    marginTop: 2,
    height: 29,
    marginBottom: 0,
    marginLeft: 0,
    flexGrow: 1,
    marginRight: 0
  },
  settingsButtonIcon: {
    resizeMode: 'contain'
  },
  settingsButtonIcon_layout: {
    position: 'absolute',
    height: 24,
    bottom: -5,
    left: 0,
    width: 24
  },
  settingsButtonText_box_layout: {
    position: 'absolute',
    bottom: -3,
    left: 48,
    width: 116
  },
  settingsButtonText: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  settingsButtonText_box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  settingsButtonDivider: {
    backgroundColor: '#d0d5ddff'
  },
  settingsButtonDivider_layout: {
    marginTop: 19,
    height: 1,
    marginBottom: 1,
    marginLeft: 0,
    flexGrow: 1,
    marginRight: 0
  },
  settingsButtonText_box_layout1: {
    position: 'absolute',
    bottom: -3,
    left: 50,
    width: 150
  },

  settingsButtonText_box_layout2: {
    position: 'absolute',
    bottom: -3,
    left: 49,
    width: 122
  },

  settingsButton1: {
    width: '100%',
    flexGrow: 1
  },
  settingsButtonText1: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  settingsButtonText_item: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 24
  },
  settingsButtonIcon_layout1: {
    marginTop: 1,
    height: 24,
    marginBottom: 0,
    marginLeft: 0,
    width: 24,
    minWidth: 24,
    marginRight: 0
  },
  settingsButtonText_space: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 24
  },
  settingsButtonText_item1: {
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0
  },

  settingsButtonText_box1: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  backButton: {
    resizeMode: 'contain'
  },
  backButton_layout: {
    marginTop: 396,
    height: 18,
    marginBottom: 0,
    width: 9,
    minWidth: 9,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});
