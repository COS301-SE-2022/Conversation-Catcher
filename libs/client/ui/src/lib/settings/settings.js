import React from 'react';
import { View, Text } from 'react-native';
export default function SettingsPage(props) {
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
        <View style={styles.settingsBody_item}>
          <ImageBackground
            style={[styles.backButton, styles.backButton_layout]}
            source={require('../assets/f762e82c40c63fd888499d8d139bcf08.png')}
          />
        </View>
      </ View>
    </View>
  );
}
export default Settings;
