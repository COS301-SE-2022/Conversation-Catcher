import React, {Component} from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Alert} from 'react-native';

function DownloadButtonState(props){
  const d = props.d
  if (d) {
    return <ImageBackground
              x="0px 31px 5px"
              y="0px 34px 93px"
              style={styles.image2}
              onPress={() => Alert.alert('click')}
              source={require('../assets/save.png')}
              container={TouchableOpacity} />;
  }
  return <ImageBackground
          x="0px 31px 5px"
          y="0px 34px 93px"
          style={styles.image2}
          onPress={() => Alert.alert('click')}
          source={require('../assets/cloud.png')}
          container={TouchableOpacity} />;
}

export default class PdfTile extends Component {

  render() {
    const {
      name,
      date,
      source,
      downloaded
    } = this.props

    return (
      <View style={styles.recentPdfTiles_item}>
        <TouchableOpacity
          x="0px 356fr 0px"
          y="18px minmax(0px, max-content) 0px"
          style={styles.pdfTile}
          onPress={() => Alert.alert('click')}>
          <View style={styles.thumbnail_containter}>
            <ImageBackground
              style={styles.pdfThumbnail}
              source={source}
            />
          </View>
          <View style={styles.pdfTile_space} />
          <View style={styles.pdfTile_contents_not_thumbnail}>
            <View x="0px 253fr 0px" y="0px minmax(0px, max-content) 1px" style={styles.block9}>
              <View style={styles.pdfName_box}>
                <Text style={styles.pdfName} ellipsizeMode={'clip'}>
                  {name}
                </Text>
              </View>
              <View style={styles.pdfDate_box}>
                <Text style={styles.pdfDate} ellipsizeMode={'clip'}>
                  {date}
                </Text>
              </View>
              <View style={styles.download_button}>
                <DownloadButtonState 
                  d={downloaded}/>
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
    borderColor: "#667084ff",
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
  },
  thumbnail_containter: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 90,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: "#3F89BE",
    borderWidth: 1,
  },
  pdfThumbnail: {
    resizeMode: 'contain',
    borderRadius: 5,
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
  downloadState: {
    width: '100%',
    flexGrow: 1
  },
  downloadIcon: {
    resizeMode: 'contain',
    marginTop: 10,
    height: 18,
    marginBottom: 10,
    marginLeft: 4,
    width: 18,
    minWidth: 18,
    marginRight: 11
  },
  pdfTile_contents_not_thumbnail: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 253
  },
  block9: {
    marginTop: 0,
    height: 127,
    marginBottom: 0,
    marginLeft: 5,
    flexGrow: 1, //flexgrow: 0
    marginRight: 0,
    flexDirection: 'row',
    flexShrink: 1,
    flexBasis: 36
  },
  pdfName_box1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 39,
    width: 223,
    right: -8
  },
  pdfDate_box: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 78,
    height: 20,
    left: -2,
    width: 127
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
});

