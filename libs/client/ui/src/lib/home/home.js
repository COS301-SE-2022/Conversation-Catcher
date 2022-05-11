import React from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
export function Home(props) {
  return (
    <View>
      <Text>Welcome to home!</Text>
    </View>
  );
}
export default Home;

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
  viewAllButtonFrame: {
    width: '100%',
    flexGrow: 1,
    borderRadius: 8
  },
  viewAllButton: {
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
  viewAllButtonLabel: {
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
  viewAllButtonLabel_box: {
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
  settingsButton: {
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
});