import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectColour } from 'apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { toggleDown } from 'apps/client/src/app/slices/pdf.slice';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
//import FileViewer from "react-native-file-viewer";
import pdfLocalAccess from '../local-pdfs-access/local-pdfs-access';

function DownloadButtonState(props) {
  const colourState = useSelector(selectColour);
  const [downloadState, setDownloadState] = React.useState(props.d);
  const dispatch = useDispatch();
  //graphql syntax trees
  const CHANGE_DOWNLOADED = gql`
    mutation toggleDownload($id: String!) {
      downloadedPDF(id: $id) {
        id
      }
    }
  `;
  const [changeDownloaded] = useMutation(CHANGE_DOWNLOADED);
  if (downloadState) {
    return (
      <Icon
        onPress={
          async () => {
            setDownloadState(!downloadState);
            dispatch(toggleDown(props.a));
            pdfLocalAccess.toggleDownloaded(props.a.id);
            var res = await changeDownloaded({ variables: { id: props.a.id }});
            console.log(res);
          }
        }
        color={colourState}
        name="save"
        size={20}
        container={TouchableOpacity}
      />
    );
  }
  return (
    <Icon
      onPress={
        async () => {
          setDownloadState(!downloadState);
          dispatch(toggleDown(props.a));
          pdfLocalAccess.toggleDownloaded(props.a.id);
          var res = await changeDownloaded({ variables: { id: props.a.id }});
          console.log(res);
        }
      }
      color={colourState}
      name="cloud"
      size={20}
      container={TouchableOpacity}
    />
  );
}

function DetermineTileCorner(props) {
  const colourState = useSelector(selectColour);
  const [checkboxState, setCheckboxState] = React.useState(false);
  const c = props.c;
  if (c) {
    return (
      <BouncyCheckbox
        size={20}
        fillColor={colourState}
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: colourState }}
        isChecked={checkboxState}
        onPress={() => setCheckboxState(!checkboxState)}
      />
    );
  }
  return <DownloadButtonState d={props.d} a={props.a}/>;
}

const pdfthumbnailSource = {
  uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
  cache: true,
};

const PdfTile = ({
  id,
  name,
  date,
  thumbnailSource,
  downloaded,
  text,
  showCheck,
  pdfSource,
  nav,
}) => {
  const colourState = useSelector(selectColour);
  const buildPDF = () => {
    return { id: id, text: text , name: name , downloaded: downloaded, date: date }
  }
  return (
    <TouchableOpacity
      style={styles.pdfTile}
      onPress={() =>
        nav.navigate('PdfView', { id: { id }, text: { text }, name: { name } })
      }
    >
      <View style={[styles.thumbnail_containter, { borderColor: colourState }]}>
        <ImageBackground
          style={styles.pdfThumbnail}
          //thumbnailSource={thumbnailSource}
          >
            <Text style={styles.thumbnailContent}>{text}</Text>
        </ImageBackground>
      </View>
      <View style={styles.pdfTile_contents_not_thumbnail}>
        <View style={styles.pdfTile_contents_not_thumbnail_inner}>
          <View style={styles.pdfName_box}>
            <Text style={styles.pdfName} numberOfLines={2}>{name}</Text>
          </View>
          <View style={styles.pdfDate_box}>
            <Text style={styles.pdfDate}>{date}</Text>
          </View>
        </View>
        <View style={styles.download_button}>
          <DetermineTileCorner d={downloaded} c={showCheck} a={buildPDF()}/>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PdfTile;

const styles = StyleSheet.create({
  pdfTile: {
    flexGrow: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: '#c4c4c4ff',
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#c4c4c4ff',
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    flexDirection: 'row',
    margin: 5,
  },
  thumbnail_containter: {
    flex: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    aspectRatio: 1 / 1.4142,
  },
  thumbnailContent: {
    color: '#344053ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 5,
    fontSize: 6,
    fontWeight: '300',
    fontStyle: 'normal',
    fontFamily: 'System',
    paddingHorizontal: 0,
  },
  pdfThumbnail: {
    resizeMode: 'contain',
    borderRadius: 5,
  },
  pdfTileInfo: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  pdfTileInfo_item: {
    flexGrow: 0,
    flexShrink: 1,
  },
  pdfTileText: {
    flexGrow: 1,
  },
  pdfTileText_item: {
    flexGrow: 0,
    flexShrink: 1,
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
    paddingTop: 15,
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
    paddingVertical: 0,
  },
  pdfDate_box: {
    flexGrow: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  download_button: {
    padding: 10,
    flex: 1,
  },
  pdfTile_contents_not_thumbnail: {
    flex: 4,
    justifyContent: 'center',
    flexDirection: 'row',
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
    flex: 10,
  },
});
