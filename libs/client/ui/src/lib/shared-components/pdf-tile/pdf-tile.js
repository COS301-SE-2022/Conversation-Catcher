import React, {Component} from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Alert} from 'react-native';

function DownloadButtonState(props){
  const d = props.d
  if (d) {
    return <ImageBackground
              onPress={() => Alert.alert('click')}
              source={require('../assets/save.png')}
              container={TouchableOpacity} />;
  }
  return <ImageBackground
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
      <TouchableOpacity
        style={styles.pdfTile}
        onPress={() => Alert.alert('click')}>
        <View style={styles.thumbnail_containter}>
          <ImageBackground
            style={styles.pdfThumbnail}
            source={source}
          />
        </View>
        <View style={styles.pdfTile_contents_not_thumbnail}>
          <View style={styles.pdfTile_contents_not_thumbnail_inner}>
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
    );
  }
}

const styles = StyleSheet.create({
  pdfTile: {
    flexShrink: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: "#c4c4c4ff",
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#c4c4c4ff',
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 2,
      height: -2
    },
    flexDirection: 'row',
    margin: 5
  },
  thumbnail_containter: {
    flex: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: "#3F89BE",
    borderWidth: 1,
    aspectRatio: 1/1.4142,
  },
  pdfThumbnail: {
    resizeMode: 'contain',
    borderRadius: 5,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    //minWidth: 90,
    marginRight: 0
  },
  pdfTileInfo: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  pdfTileInfo_item: {
    flexGrow: 0,
    flexShrink: 1,
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
    resizeMode: 'contain',
    justifyContent: 'center',
    paddingTop: 15
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
    resizeMode: 'contain',
    justifyContent: 'center',
    paddingBottom: 15
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
    flex: 4,
    justifyContent: 'center'
  },
  pdfTile_contents_not_thumbnail_inner: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 5,
    flexGrow: 1, //flexgrow: 0
    marginRight: 0,
    flexDirection: 'column',
    flexShrink: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },
});

