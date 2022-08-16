import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Loading from '../loading/loading';
import LocalPdfsAccess from '../local-pdfs-access/local-pdfs-access';
import PdfTile from '../pdf-tile/pdf-tile';

export function PdfDisplay({ navigation, selectMode }) {
  // const [selectMode, setSelectMode] = useState(false);

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
  // use redux to het email
  // const email = useSelector(selectEmail()).email;
  const { data, loading, error } = useQuery(GET_USER_PDFS, {
    variables: { email: 'John@test' },
  });
  console.log('GetPdfs');
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
  if (LocalPdfsAccess.hasPdfs()) {
    console.log('objArr');
    // console.log(data.getPDFs);
    for (let i = 0; i < data.getPDFs.length; i++) {
      //create deep copy
      LocalPdfsAccess.add({
        name: data.getPDFs[i].name,
        creationDate: data.getPDFs[i].creationDate,
        downloaded: data.getPDFs[i].downloaded,
        pdf: data.getPDFs[i].pdf,
        text: data.getPDFs[i].text,
        id: data.getPDFs[i].id,
      });
    }
    // for (let i = 0; i < initialArr.length; i++) objArr[i] = initialArr[i];
  }
  return (
    <ScrollView style={styles.recentPdfTiles}>
      {LocalPdfsAccess.getPDFs().map((item, key) => (
        <PdfTile
          key={key}
          id={item.id}
          name={item.name}
          date={item.creationDate}
          source={''}
          text={item.text}
          downloaded={item.downloaded}
          showCheck={selectMode}
          pdfSource=""
          nav={navigation}
        />
      ))}
    </ScrollView>
  );
}
export default PdfDisplay;

const styles = StyleSheet.create({
  recentPdfTiles: {
    height: '70%',
    paddingLeft: 15,
    paddingRight: 15,
    overflow: 'visible',
  },
});
