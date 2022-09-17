import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { Text, ScrollView, StyleSheet, DeviceEventEmitter } from 'react-native';
import Loading from '../loading/loading';
// import LocalPdfsAccess from '../local-pdfs-access/local-pdfs-access';
import GroupTile from '../group-tile/group-tile';
import pdfLocalAccess from '../local-pdfs-access/local-pdfs-access';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectEmail} from 'apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectPDFS, refillPDFs } from 'apps/client/src/app/slices/pdf.slice';
import { useSelector, useDispatch } from 'react-redux';

export function GroupDisplay({ navigation, selectMode }, ref) {
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
  // console.log(loading);
  // console.log(error);
  if (loading)
    return (
      <ScrollView style={styles.recentPdfTiles}>
        {localPDFs.map((item, key) => (
        <GroupTile
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
        {/*<Loading >*/}
      </ScrollView>
    );

  if (error)
    return (
      <ScrollView style={styles.recentPdfTiles}>
        <Text>An error occured...</Text>
        <Text>{error[0]}</Text>
      </ScrollView>
    );
  //If the pdf array is empty assign the result from the query
  //create deep copy of the returned data
  //Data is here in data if returned
  if (!isLoaded) {
    pdfLocalAccess.clearPdfs();
    for (let i = 0; i < data.getPDFs.length; i++) {
      pdfLocalAccess.addPdf({
        name: data.getPDFs[i].name,
        creationDate: data.getPDFs[i].creationDate,
        downloaded: data.getPDFs[i].downloaded,
        pdf: data.getPDFs[i].pdf,
        text: data.getPDFs[i].text,
        id: data.getPDFs[i].id,
      });
    }
    setIsLoaded(true);
    //Update local pdf storage
    //array of pdfs stored locally, selected from data to overwrite the slice
    if (data.getPDFs[0].name !== "error"){
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
        <GroupTile
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
export default forwardRef(GroupDisplay);

const styles = StyleSheet.create({
  recentPdfTiles: {
    height: '70%',
    paddingLeft: 15,
    paddingRight: 15,
    overflow: 'visible',
  },
});
