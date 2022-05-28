import React from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Alert, Component } from 'react-native';

class PdfTile extends Component {
  constructor(props) {
    super(props)
    this.state = { loaded: false }
  }

  render() {
    const {
      name,
      date,
      source
    } = this.props

    return (
      <View style={styles.recentPdfTiles_item}>
        <TouchableOpacity
          x="0px 356fr 0px"
          y="18px minmax(0px, max-content) 0px"
          style={styles.pdfTile}
          onPress={() => Alert.alert('click')}>
          <View style={styles.pdfTile_item}>
            <ImageBackground
              style={[styles.pdfThumbnail, styles.pdfThumbnail_layout1]}
              source={source}
            />
          </View>
          <View style={styles.pdfTile_space} />
          <View style={styles.pdfTile_item2}>
            <View x="0px 253fr 0px" y="0px minmax(0px, max-content) 1px" style={styles.block8}>
              <View style={styles.block8_item}>
                <View style={[styles.block9, styles.block9_layout]}>
                  <View style={[styles.pdfName_box1, styles.pdfName_box1_layout]}>
                    <Text style={styles.pdfName} ellipsizeMode={'clip'}>
                      {name}
                    </Text>
                  </View>
                  <View style={[styles.pdfDate_box1, styles.pdfDate_box1_layout]}>
                    <Text style={styles.pdfDate} ellipsizeMode={'clip'}>
                      {date}
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
                  source={require('../assets/cloud.png')}
                  container={TouchableOpacity}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pdfContents: {
    flexGrow: 1
  },
  pdfContents_item: {
    flexGrow: 0,
    flexShrink: 1
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
    borderColor: "#3F89BE",
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
    backgroundColor: "#3F89BE",
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
  }
});

