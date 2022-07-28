import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import PdfTile from '../shared-components/pdf-tile/pdf-tile.js';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import { useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectColour } from 'apps/client/src/app/slices/colour.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectEmail } from 'apps/client/src/app/slices/email.slice';
import Loading from '../shared-components/loading/loading.js';

export const ViewAll = ({ navigation }) =>  {
  const colourState = useSelector(selectColour).colour;
  const [moreVisible, setMoreVisible] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [bottomModalType, setBottomModalType] = useState('none');
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [currOrderValue, setCurrOrderValue] = useState('Date');
  // const [refreshPage, setRefreshPage] = useState('');

  const url = 'https://awesome.contents.com/';
  const title = 'Awesome Contents';
  const message = 'Please check this out.';

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

  const RELOAD = gql`
    mutation reload {
      reload
    }
  `;

  const [refresh, { d, l, e }] = useMutation(RELOAD);
  //variables for object sorting
  const [objArr, setObjArr] = useState([]);

  const options = {
    title,
    url,
    message,
  };

  const share = async (customOptions = options) => {
    try {
      await Share.open(customOptions);
    } catch (err) {
      console.log(err);
    }
  };

  function BottomModalButton(props) {
    if (props.type === 'share') {
      return (
        <TouchableOpacity
          style={styles.backButton}
          onPress={async () => {
            await share({
              title: 'Sharing pdf file from awesome share app',
              message: 'Please take a look at this file',
              url: '../assets/thereactnativebook-sample.pdf',
            });
            setSelectMode(false);
            setBottomModalVisible(false);
          }}
        >
          <Icon name="paper-plane-o" color="#ffffffff" size={22} />
        </TouchableOpacity>
      );
    }
    if (props.type === 'rename') {
      return (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setBottomModalVisible(false)}
        >
          <Icon name="pencil-square-o" color="#ffffffff" size={22} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          setSelectMode(false);
          setBottomModalVisible(false);
        }}
      >
        <Icon name="trash-o" color="#ffffffff" size={22} />
      </TouchableOpacity>
    );
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  function changeArray(index, itemValue) {
    if (currOrderValue !== itemValue) {
      setCurrOrderValue(itemValue);
      // Sort PDFs array according to currOrderValue
      switch (itemValue) {
        case 'Name':
          var temp2 = objArr;
          temp2.sort((a, b) => {
            if (a.name < b.name) return -1;
            return 1;
          });
          setObjArr(temp2);
          console.log(objArr);
          break;
        case 'Date':
          var temp = objArr;
          temp.sort((a, b) => {
            if (new Date(a.creationDate) > new Date(b.creationDate)) return -1;
            return 1;
          });
          setObjArr(temp);
          console.log(objArr);
          break;
      }
    }
    refresh();
    console.log(itemValue);
  }

  function Pdfs() {
    // use redux to het email
    const email = useSelector(selectEmail()).email;
    const { data, loading, error } = useQuery(GET_USER_PDFS, {
      variables: { email: email },
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
    if (objArr[0] === undefined) {
      console.log('objArr');
      // console.log(data.getPDFs);
      for (let i = 0; i < data.getPDFs.length; i++) {
        //create deep copy
        objArr.push({
          name: data.getPDFs[i].name,
          creationDate: data.getPDFs[i].creationDate,
          downloaded: data.getPDFs[i].downloaded,
          pdf: data.getPDFs[i].pdf,
          text: data.getPDFs[i].text,
          id: data.getPDFs[i].id,
        });
      }
    }
    return (
      <ScrollView style={styles.recentPdfTiles}>
        {objArr.map((item, key) => (
          <PdfTile
            key={key}
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

  return (
    <View style={styles.viewAllPage}>
      <View style={styles.viewAllTopBar}>
        <View style={styles.big_title_box}>
          <Text style={styles.big_title}>{'PDFs'}</Text>
        </View>

        <View style={styles.searchBarGroup}>
          <View style={styles.searchIconFrame}>
            <Icon color="#667084ff" name="search" size={24} />
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={() => Alert.alert('click')}
          />
        </View>
      </View>

      <Pdfs />

      <View style={styles.viewAllBottomBar}>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => setMoreVisible(true)}
        >
          <Icon name="ellipsis-h" color="#344053ff" size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="angle-left" color="#344053ff" size={30} />
        </TouchableOpacity>

        <View style={styles.orderByGroup}>
          <Text style={styles.orderByLabel}>{'Order by'}</Text>
          <ModalDropdown
            options={['Date', 'Name']}
            defaultIndex={0}
            defaultValue={'Date'}
            onSelect={(index, itemValue) => changeArray(index, itemValue)}
            style={styles.orderByDropdown}
            textStyle={styles.orderByDropdownText}
            dropdownStyle={styles.orderByDropdownStyle}
            dropdownTextStyle={styles.orderByDropdownTextStyle}
            dropdownTextSelectHighlightStyle={{ color: colourState }}
          />
        </View>
      </View>

      <Modal
        style={styles.modal}
        isVisible={moreVisible}
        avoidKeyboard={true}
        hasBackdrop={true}
        backdropColor="white"
        onBackdropPress={() => setMoreVisible(false)}
      >
        <View style={styles.moreModalInner}>
          <TouchableOpacity
            style={styles.moreModalButton}
            onPress={() => {
              setBottomModalType('share');
              setSelectMode(true);
              setBottomModalVisible(true);
              setMoreVisible(false);
            }}
          >
            <View style={styles.moreModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon 
                  style={{color : colourState}}
                  name="paper-plane-o"
                  size={18}
                />
              </View>
              <View style={styles.moreModalButtonText_box}>
                <Text style={styles.moreModalButtonText} ellipsizeMode={'clip'}>
                  {'Share'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.moreModalButtonDivider} />

          <TouchableOpacity
            style={styles.moreModalButton}
            onPress={() => {
              setBottomModalType('rename');
              setBottomModalVisible(true);
              setMoreVisible(false);
            }}
          >
            <View style={styles.moreModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon 
                  style={{color : colourState}}
                  name="pencil-square-o"
                  size={20}
                />
              </View>
              <View style={styles.moreModalButtonText_box}>
                <Text style={styles.moreModalButtonText}>{'Rename'}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.moreModalButtonDivider} />

          <TouchableOpacity
            style={styles.moreModalButton}
            onPress={() => {
              setBottomModalType('delete');
              setBottomModalVisible(true);
              setSelectMode(true);
              setMoreVisible(false);
            }}
          >
            <View style={styles.moreModalButtonContent}>
              <View style={styles.iconContainer}>
                <Icon 
                  style={{color : colourState}}
                  name="trash-o"
                  size={20}
                />
              </View>
              <View style={styles.moreModalButtonText_box}>
                <Text style={styles.moreModalButtonText}>{'Delete'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal 
        isVisible={bottomModalVisible}
        coverScreen={false}
        hasBackdrop={false}
        style={{
          width: '100%',
          height: '8%',
          margin: 0,
          justifyContent: 'flex-end',
        }}
      >
        <View style={[styles.modalBottomBar, {backgroundColor : colourState}]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => {
              setBottomModalVisible(false);
              setSelectMode(false);
            }}
          >
            <Icon name="angle-left" color="#ffffffff" size={30} />
          </TouchableOpacity>

          <BottomModalButton type={bottomModalType} />
        </View>
      </Modal>

      <Modal
        style={styles.renameModal}
        isVisible={renameModalVisible}
        avoidKeyboard={true}
      >
        <View style={styles.moreModalInner}>
          <TextInput editable />
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colourState }]}
            onPress={() => {
              setBottomModalVisible(false);
              setSelectMode(false);
            }}
          >
            <Text>{'Rename file'}</Text>
          </TouchableOpacity>

          <BottomModalButton type={bottomModalType} />
        </View>
      </Modal>
    </View>
  );
};
export default ViewAll;

const styles = StyleSheet.create({
  viewAllPage: {
    backgroundColor: '#ffffffff',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    flexGrow: 1,
    marginRight: 0,
  },
  viewAllTopBar: {
    width: '100%',
    flexShrink: 1,
    backgroundColor: '#c4c4c4ff',
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    alignItems: 'center',
    flexDirection: 'column',
    top: 0,
    zIndex: 999,
    minHeight: 88,
  },
  big_title: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 28,
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
  },
  big_title_box: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingTop: 5,
    height: '5%',
    width: '100%',
    minHeight: 28,
  },
  searchBarGroup: {
    width: '85%',
    flexShrink: 1,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 38,
  },
  searchInput: {
    backgroundColor: '#ffffffff',
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: '#d0d5ddff',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    color: '#667084ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    padding: 5,
    flexGrow: 1,
  },
  searchIconFrame: {
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  recentPdfTiles: {
    height: '70%',
    paddingLeft: 15,
    paddingRight: 15,
    overflow: 'visible',
  },
  viewAllBottomBar: {
    width: '100%',
    flexDirection: 'row',
    flexShrink: 1,
    backgroundColor: '#c4c4c4ff',
    //shadowColor: 'transparent' /* cannot find mapping from CSS: 0px -4px 4px 0px rgba(0,0,0,0.09803921568627451), https://ethercreative.github.io/react-native-shadow-generator/ */
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
      height: 1,
    },
    justifyContent: 'center',
  },
  backButton: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButton: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderByGroup: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginVertical: 5,
  },
  orderByLabel: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    padding: 3,
    flexShrink: 1,
    width: 50,
  },
  orderByDropdown: {
    flexShrink: 1,
    backgroundColor: '#ffffffff',
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: '#d0d5ddff',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    flexDirection: 'row',
    marginVertical: 5,
    width: 65,
  },
  orderByDropdownText: {
    color: '#667084ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 18,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    padding: 10,
  },
  orderByDropDownText_box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  orderByDropdownStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    borderRadius: 8,
  },
  orderByDropdownTextStyle: {
    color: '#667084ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 18,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    padding: 10,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreModalInner: {
    width: '45%',
    flexShrink: 1,
    backgroundColor: '#f5f5f5ff',
    borderRadius: 7,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#667084ff',
    opacity: 1,
  },
  moreModalButton: {
    flexGrow: 1,
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  moreModalButtonContent: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //padding: 5
  },
  iconContainer: {
    width: '40%',
    height: '100%',
    alignItems: 'center',
  },
  moreModalButtonText: {
    color: '#344053ff',
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
  },
  moreModalButtonText_box: {
    flexShrink: 1,
  },
  moreModalButtonDivider: {
    backgroundColor: '#d0d5ddff',
    height: 1,
    width: '87%',
    alignSelf: 'center',
  },
  modalBottomBar: {
    width: '100%',
    height: '13%',
    flexDirection: 'row',
    //flexShrink: 1,
    justifyContent: 'center',
    //alignSelf: 'flex-end'
  },
});
