import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client';
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
} from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  DeviceEventEmitter,
  RefreshControl,
  NativeAppEventEmitter,
} from 'react-native';
import Loading from '../loading/loading';
// import LocalPdfsAccess from '../local-pdfs-access/local-pdfs-access';
import PdfTile from '../pdf-tile/pdf-tile';
import pdfLocalAccess from '../local-pdfs-access/local-pdfs-access';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectEmail } from '../../../../../../../apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  selectPDFS,
  refillPDFs,
} from '../../../../../../../apps/client/src/app/slices/pdf.slice';
import { useSelector, useDispatch } from 'react-redux';

export function PdfDisplay({ navigation, selectMode }, ref) {
  // const [selectMode, setSelectMode] = useState(false);
  const [didReload, setDidReload] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const emailState = useSelector(selectEmail);
  const localPDFs = useSelector(selectPDFS);
  const dispatch = useDispatch();

  useEffect(() => {
    var counter = 0;

    var oneSecInterval = setInterval(() => {
      console.log('fetching')
      fetchDocs({
        variables: {
          email: emailState,
        },
        fetchPolicy: 'no-cache',
      })
        .then((d) => {
          console.log('received')
          pdfLocalAccess.clearPdfs();
          setData(d.data);
          // setRefreshing(false);
          setDidReload(!didReload);
        })
        .catch((e) => {
          console.log(e);
          // pdfLocalAccess.clearPdfs();
          // setDidReload(!didReload);
          // setRefreshing(false);
        });
      counter++;

      if (counter === 5) {
        clearInterval(oneSecInterval);
      }
    }, 120000);
  }, []);

  //Listen to when to update page
  DeviceEventEmitter.addListener('updatePage', () => setDidReload(!didReload));
  //graphql syntax trees
  const SET_USER = gql`
    mutation setUser(
      $oldEmail: String!
      $email: String!
      $colour: String!
      $pdfs: [String!]!
    ) {
      setUser(oldEmail: $oldEmail, email: $email, colour: $colour, pdfs: $pdfs)
    }
  `;

  const GET_USER_PDFS = gql`
    query getForUser($email: String!) {
      getPDFs(id: $email) {
        id
        name
        creationDate
        downloaded
        text
        summarised
        embeddings
      }
    }
  `;

  const SET_EMBEDDINGS = gql`
    mutation setEmbeddings($id: String!, $name: String!, $text: String!) {
      embed(id: $id, name: $name, text: $text)
    }
  `;

  const [setUser] = useMutation(SET_USER);
  const [setEmbedding] = useMutation(SET_EMBEDDINGS);
  const { data, loading, error } = useQuery(GET_USER_PDFS, {
    variables: { email: emailState },
  });
  const [fetchDocs] = useLazyQuery(GET_USER_PDFS);

  const ScrollDisplay = (props) => {
    if (props.arr.length !== 0)
      return (
        <ScrollView
          style={styles.recentPdfTiles}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={ReloadData} />
          }
        >
          <Loading
            width={100}
            height={100}
            load={props.load}
            text={'Fetching your pdfs'}
          />
          {props.arr.map((item, key) => (
            <PdfTile
              key={key}
              id={item.id}
              name={item.name}
              date={item.creationDate}
              source={''}
              text={item.text}
              downloaded={item.downloaded}
              showCheck={selectMode}
              summarised={item.summarised}
              nav={navigation}
              //refresh={setDidReload}
            />
          ))}
        </ScrollView>
      );
    else
      return (
        <ScrollView
          style={styles.recentPdfTiles}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={ReloadData} />
          }
        >
          <Loading
            width={100}
            height={100}
            load={props.load}
            text={'Fetching your pdfs'}
          />
          <Text style={{ textAlign: 'center' }}>{props.text}</Text>
        </ScrollView>
      );
  };

  const getEmbedding = async (document) => {
    if (document.embedding === null) {
      return await setEmbedding({
        variables: {
          id: document.id,
          name: document.id.name,
          text: document.text,
        },
      }).catch((e) => {
        console.log(e);
        return null;
      });
    }
  };

  const setData = async (d) => {
    // console.log(d)
    for (let i = 0; i < d.getPDFs.length; i++) {
      pdfLocalAccess.addPdf({
        name: d.getPDFs[i].name,
        creationDate: d.getPDFs[i].creationDate,
        downloaded: d.getPDFs[i].downloaded,
        text: d.getPDFs[i].text,
        id: d.getPDFs[i].id,
        summarised: d.getPDFs[i].summarised,
        embeddings: d.getPDFs[i].embeddings,
      });
      if (d.getPDFs[i].embeddings === null) {
        setEmbedding({
          variables: {
            id: d.getPDFs[i].id,
            name: d.getPDFs[i].name,
            text: d.getPDFs[i].text,
          },
        })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      }
    }
    pdfLocalAccess.sortPdfs('Name');
  };

  const ReloadData = () => {
    NativeAppEventEmitter.emit('clearSearch');
    setRefreshing(true);
    fetchDocs({
      variables: {
        email: emailState,
      },
      fetchPolicy: 'no-cache',
    })
      .then((d) => {
        pdfLocalAccess.clearPdfs();
        setData(d.data);
        setRefreshing(false);
        // setDidReload(!didReload);
      })
      .catch((e) => {
        console.log(e);
        pdfLocalAccess.clearPdfs();
        //setDidReload(!didReload);
        setRefreshing(false);
      });
  };
  if (loading)
    return (
      <ScrollDisplay
        arr={localPDFs}
        text={'No Documents Stored Locally'}
        load={true}
      />
    );
  if (error) {
    return (
      <ScrollDisplay
        arr={localPDFs}
        text={'No Documents Stored Locally'}
        load={false}
      />
    );
  }
  //If the pdf array is empty assign the result from the query
  //create deep copy of the returned data
  //Data is here in data if returned
  if (!pdfLocalAccess.isLoaded()) {
    // console.log('Loading from query');
    pdfLocalAccess.clearPdfs();
    // console.log(data);
    setData(data);
    //Update the user pdfs array to ensure that deleted pdfs are removed
    if (pdfLocalAccess.isLoaded()) {
      // console.log('setting pdf');
      setUser({
        variables: {
          oldEmail: emailState,
          email: emailState,
          colour: '',
          pdfs: pdfLocalAccess.getPdfIds(),
        },
      }).catch((e) => {
        // console.log('error in delete of pdf in pdf array');
        console.log(e);
      });
    }

    //Update local pdf storage
    //array of pdfs stored locally, selected from data to overwrite the slice
    if (data.getPDFs[0] !== undefined && data.getPDFs[0].name !== 'error') {
      //remove as under a check already
      let tempArray = [];
      var p;
      for (p in pdfLocalAccess.getPdfs()) {
        if (data.getPDFs[p].downloaded === true) {
          tempArray.push(data.getPDFs[p]);
        }
      }
      dispatch(refillPDFs(tempArray));
    }
  }
  return (
    <ScrollDisplay
      arr={pdfLocalAccess.getPdfs()}
      text={'You have no documents yet!'}
      load={false}
    />
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
