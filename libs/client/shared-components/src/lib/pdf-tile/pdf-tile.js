import React from 'react';
import { View, Text } from 'react-native';

export function PdfTile(props) {
  return (
    <View style={styles.recentPdfTiles_item}>
      <button type="button" id="btn"
        x="0px 356fr 0px"
        y="0px minmax(0px, max-content) 0px"
        style={styles.pdfTile}
        onPress={() => alert('click')}>
        <View style={styles.pdfTile_item}>
          <img
            style={[styles.pdfThumbnail, styles.pdfThumbnail_layout]}
            source={require('../assets/23a067db3896c1ac956e0e22fe9c7588.png')}
          />
        </View>
        <View style={styles.pdfTile_space} />
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
              <button 
                x="0px 33fr 0px"
                y="0px minmax(0px, max-content) 89px"
                style={styles.downloadState}
                onPress={() => alert('click')}>
                <img
                  style={[styles.downloadIcon, styles.downloadIcon_layout]}
                  source={require('../assets/6784b72f243ed3938b4effbf0ffc0c7a.png')}
                />
              </button>
            </View>
          </View>
        </View>
      </button>
    </View>
  );
}
export default PdfTile;

const styles = StyleSheet.create({
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
});
