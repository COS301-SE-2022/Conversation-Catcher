import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import Loading from '../loading/loading';
// import LocalPdfsAccess from '../local-pdfs-access/local-pdfs-access';
import PdfTile from '../pdf-tile/pdf-tile';
import pdfLocalAccess from '../local-pdfs-access/local-pdfs-access';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectEmail } from 'apps/client/src/app/slices/user.slice';
import { useSelector } from 'react-redux';

export function PdfDisplay({ navigation, selectMode }, ref) {
  // const [selectMode, setSelectMode] = useState(false);
  const [didReload, setDidReload] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const emailState = useSelector(selectEmail);

  //Expose refresh function to parent(View-all page)
  useImperativeHandle(ref, () => ({
    refreshPfds: () => {
      // console.log('refreshing');
      setDidReload(!didReload);
    },
  }));

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
        <Loading />
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
  // if (pdfLocalAccess.getLength() === 0) {
  // console.log('loading data');
  //create deep copy of the returned data
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
