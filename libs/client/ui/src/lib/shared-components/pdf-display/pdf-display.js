import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { Text, ScrollView, StyleSheet, DeviceEventEmitter } from 'react-native';
import Loading from '../loading/loading';
// import LocalPdfsAccess from '../local-pdfs-access/local-pdfs-access';
import PdfTile from '../pdf-tile/pdf-tile';
import pdfLocalAccess from '../local-pdfs-access/local-pdfs-access';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectEmail} from 'apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectPDFS, refillPDFs } from 'apps/client/src/app/slices/pdf.slice';
import { useSelector, useDispatch } from 'react-redux';

export function PdfDisplay({ navigation, selectMode }, ref) {
  // const [selectMode, setSelectMode] = useState(false);
  const [didReload, setDidReload] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const emailState = useSelector(selectEmail);
  const localPDFs = useSelector(selectPDFS);
  const dispatch = useDispatch();
  //Expose refresh function to parent(View-all page)
  useImperativeHandle(ref, () => ({
    refreshPfds: () => {
      // console.log('refreshing');
      setDidReload(!didReload);
    },
  }));

  //Listen to when to update page
  DeviceEventEmitter.addListener('updatePage', () => setDidReload(!didReload));
  //graphql syntax trees
  const GET_USER_PDFS = gql`
    query getForUser($email: String!) {
      getPDFs(id: $email) {
        id
        name
        creationDate
        downloaded
        #pdf
        text
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_USER_PDFS, {
    variables: { email: emailState },
  });
  // console.log('GetPdfs');
  // console.log(data);
  console.log(loading);
  // console.log(error);
  //console.log(localPDFs);
  if (loading)
    if (localPDFs.length !== 0)
    return (
      <ScrollView style={styles.recentPdfTiles}>
        <loading width={250} height={250}/>
        {localPDFs.map((item, key) => (
        <PdfTile
          key={key}
          id={item.id}
          name={item.name}
          date={item.creationDate}
          source={''}
          text={item.text}
          downloaded={item.downloaded}
          showCheck={selectMode}
          pdfSource={'pdfRefresh'}
          nav={navigation}
          refresh={setDidReload}
        />
      ))}
      </ScrollView>
    );
    else return(
      <ScrollView style={styles.recentPdfTiles}>
        <loading width={250} height={250}/>
        <Text>No Documents Stored Locally</Text>
      </ScrollView>
    );
  if (error){
    if (localPDFs.length !== 0)
    return (
      <ScrollView style={styles.recentPdfTiles}>
        <Text>No connection</Text>
        <Text>{error[0]}</Text>
        {localPDFs.map((item, key) => (
        <PdfTile
          key={key}
          id={item.id}
          name={item.name}
          date={item.creationDate}
          source={''}
          text={item.text}
          downloaded={item.downloaded}
          showCheck={selectMode}
          pdfSource={'pdfRefresh'}
          nav={navigation}
          refresh={setDidReload}
        />
      ))}
      </ScrollView>
    );
    else return(
      <ScrollView style={styles.recentPdfTiles}>
        <Text>No Documents Locally</Text>
      </ScrollView>
    );
  }
  //If the pdf array is empty assign the result from the query
  //create deep copy of the returned data
  //Data is here in data if returned
  if (!isLoaded) {
    pdfLocalAccess.clearPdfs();
    //let tempArray = [];
    for (let i = 0; i < data.getPDFs.length; i++) {
      pdfLocalAccess.addPdf({
        name: data.getPDFs[i].name,
        creationDate: data.getPDFs[i].creationDate,
        downloaded: data.getPDFs[i].downloaded,
        pdf: data.getPDFs[i].pdf,
        text: data.getPDFs[i].text,
        id: data.getPDFs[i].id,
      });
      // if (data.getPDFs[i].downloaded === true){
      //   tempArray.push(data.getPDFs[i]);
      // }
    }
    // dispatch(refillPDFs(tempArray));
    setIsLoaded(true);
    //Update local pdf storage
    //array of pdfs stored locally, selected from data to overwrite the slice
    if ( data.getPDFs[0] !== undefined && data.getPDFs[0].name !== "error"){
      let tempArray = [];
      var p;
      for (p in pdfLocalAccess.getPdfs()){
        if (data.getPDFs[p].downloaded === true){
          tempArray.push(data.getPDFs[p]);
        }
      }
      dispatch(refillPDFs(tempArray));
    } 
  } 
  return (
    <ScrollView style={styles.recentPdfTiles}>
      {pdfLocalAccess.getPdfs().map((item, key) => (
        <PdfTile
          key={key}
          id={item.id}
          name={item.name}
          date={item.creationDate}
          source={''}
          text={item.text}
          downloaded={item.downloaded}
          showCheck={selectMode}
          pdfSource={'pdfRefresh'}
          nav={navigation}
          refresh={setDidReload}
        />
      ))}
    </ScrollView>
  );
}
export default forwardRef(PdfDisplay);

const styles = StyleSheet.create({
  recentPdfTiles: {
    height: '70%',
    paddingLeft: 15,
    paddingRight: 15,
    overflow: 'visible',
  },
});
