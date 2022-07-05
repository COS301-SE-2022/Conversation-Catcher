import React, {Component} from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import colour from '../colour/colour';

function DownloadButtonState(props){
  const [downloadState, setDownloadState] = React.useState(props.d);
  if (downloadState) {
    return <Icon
              onPress={() => setDownloadState(!downloadState)}
              color={colour.state}
              name="save"
              size={20}
              container={TouchableOpacity} />;
  }
  return <Icon
          onPress={() => setDownloadState(!downloadState)}
          color={colour.state}
          name="cloud"
          size={20}
          container={TouchableOpacity} />;
}

function DetermineTileCorner(props){
  const [checkboxState, setCheckboxState] = React.useState(false);
  const c = props.c;
  if (c){
    return <BouncyCheckbox
            size={20}
            fillColor={colour.state}
            unfillColor="#FFFFFF"
            iconStyle={{ borderColor: colour.state }}
            isChecked={checkboxState}
            onPress={() => setCheckboxState(!checkboxState)}
          />;
  }
  return <DownloadButtonState downloadState={props.downloaded}/>;
}

const pdfSource = {
  uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
  cache: true,
};

export default class PdfTile extends Component {

  render() {
    const {
      id,
      name,
      date,
      source,
      downloaded,
      showCheck,
      navigation
    } = this.props

    return (
      <TouchableOpacity
        style={styles.pdfTile}
        //onPress={() => FileViewer.open(source)}>
        onPress={() => Alert.alert('pdf')}>
        <View style={[styles.thumbnail_containter, {borderColor : colour.state}]}>
          <ImageBackground
            style={styles.pdfThumbnail}
            //source={source}
          />
        </View>
        <View style={styles.pdfTile_contents_not_thumbnail}>
          <View style={styles.pdfTile_contents_not_thumbnail_inner}>
            <View style={styles.pdfName_box}>
              <Text style={styles.pdfName}>
                {name}
              </Text>
            </View>
            <View style={styles.pdfDate_box}>
              <Text style={styles.pdfDate}>
                {date}
              </Text>
            </View>
          </View>
          <View style={styles.download_button}>
            <DetermineTileCorner 
              d={downloaded}
              c={showCheck}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  pdfTile: {
    flexGrow: 1,
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
      height: 2
    },
    flexDirection: 'row',
    margin: 5
  },
  thumbnail_containter: {
    flex: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    aspectRatio: 1/1.4142,

  },
  pdfThumbnail: {
    resizeMode: 'contain',
    borderRadius: 5,
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
  download_button: {
    padding: 10,
    flex: 1,
  },
  pdfTile_contents_not_thumbnail: {
    flex: 4,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  pdfTile_contents_not_thumbnail_inner: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 5,
    //flexGrow: 1, //flexgrow: 0
    marginRight: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10,
    flex: 10
  },
});

