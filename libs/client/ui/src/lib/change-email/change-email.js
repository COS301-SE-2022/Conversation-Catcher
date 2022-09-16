import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  selectColour,
  selectUser,
  setEmail,
} from 'apps/client/src/app/slices/user.slice';
import auth from '@react-native-firebase/auth';
import { gql, useMutation } from '@apollo/client';

export const ChangeEmail = ({ navigation }) => {
  const colourState = useSelector(selectColour);
  const user = useSelector(selectUser);
  const [showMailHint, setShowMailHint] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [failedText, setFailedText] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setNewEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

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

  const [setUser] = useMutation(SET_USER);

  function changeEmail() {
    if (email === '') {
      setFailedText(true);
      setErrorMessage('Email is required');
      return;
    }
    var tempEmail = email.trim().toLowerCase();
    var tempCheckEmail = checkEmail.trim().toLowerCase();
    if (tempEmail !== tempCheckEmail) {
      setFailedText(true);
      setErrorMessage('Emails do not match');
      return;
    }
    if (password === '') {
      setFailedText(true);
      setErrorMessage('Password is required to reauthenticate');
      return;
    }
    auth()
      .signInWithEmailAndPassword(user.email, password.trim())
      .then(async () => {
        const currUser = auth().currentUser;
        currUser
          .updateEmail(tempEmail)
          .then(async () => {
            setFailedText(false);
            setShowSuccessMessage(true);
            dispatch(setEmail(tempEmail));
            setUser({
              variables: {
                oldEmail: user.email,
                email: tempEmail,
                colour: user.colour,
                pdfs: user.pdfs,
              },
            });
          })
          .catch((error) => {
            //Check for other errors
            setFailedText(true);
            if (error.code === 'auth/invalid-email')
              setErrorMessage('The email address is badly formatted');
            else {
              setErrorMessage('An error has occurred');
              console.log(error);
            }
          });
      })
      .catch((error) => {
        setFailedText(true);
        setErrorMessage(
          'Cannot re-authenticate: incorrect username or password'
        );
        return;
      });
  }

  function MailHint() {
    if (showMailHint) {
      return (
        <Text style={styles.hintText}>
          {'This is an email hint text to help the user.'}
        </Text>
      );
    } else {
      return null;
    }
  }

  function SuccessMessage() {
    if (showSuccessMessage) {
      return (
        <Text style={styles.hintText}>
          {'Email has been changed successfully.'}
        </Text>
      );
    } else {
      return null;
    }
  }

  function ErrorMessage() {
    if (!failedText) return null;
    return (
      <View style={styles.hintText_box}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.logInPage}>
      <View style={styles.big_title_box}>
        <Text style={styles.big_title}>{'Change your email'}</Text>
      </View>
      <View style={styles.inputsGroup}>
        <ErrorMessage />
        <View style={styles.inputsItem}>
          <View style={styles.inputLabel_box}>
            <Text style={styles.inputLabel}>{'New email'}</Text>
          </View>
          <View style={styles.inputField}>
            <View style={styles.inputText_box}>
              <View style={styles.inputIcon}>
                <Icon
                  style={{ color: colourState }}
                  name="envelope"
                  size={15}
                />
              </View>
              <TextInput
                style={styles.inputText}
                placeholder="johnsmith@gmail.com"
                underlineColorAndroid="transparent"
                onChangeText={(text) => {
                  setNewEmail(text);
                }}
              />
              <TouchableOpacity
                style={styles.helpIcon}
                onPress={() => setShowMailHint(!showMailHint)}
              >
                <Icon
                  style={{ color: '#d0d5ddff' }}
                  name="question-circle-o"
                  size={17}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.hintText_box}>
            <MailHint />
          </View>
        </View>
        <View style={styles.inputsItem}>
          <View style={styles.inputLabel_box}>
            <Text style={styles.inputLabel}>{'Re-enter new email'}</Text>
          </View>
          <View style={styles.inputField}>
            <View style={styles.inputText_box}>
              <View style={styles.inputIcon}>
                <Icon
                  style={{ color: colourState }}
                  name="envelope"
                  size={15}
                />
              </View>
              <TextInput
                style={styles.inputText}
                placeholder="johnsmith@gmail.com"
                underlineColorAndroid="transparent"
                onChangeText={(text) => {
                  setCheckEmail(text);
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.inputsItem}>
          <View style={styles.inputLabel_box}>
            <Text style={styles.inputLabel}>{'Password'}</Text>
          </View>
          <View style={styles.inputField}>
            <View style={styles.inputText_box}>
              <View style={styles.inputIcon}>
                <Icon
                  style={{ color: colourState }}
                  name="envelope"
                  size={15}
                />
              </View>
              <TextInput
                style={styles.inputText}
                placeholder="*********"
                underlineColorAndroid="transparent"
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.logInButton,
          { backgroundColor: colourState },
          { borderColor: colourState },
        ]}
        onPress={() => changeEmail()}
      >
        <View style={styles.logInButtonLabel_box}>
          <Text style={styles.logInButtonLabel}>{'Change email'}</Text>
        </View>
      </TouchableOpacity>
      <SuccessMessage />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="angle-left" color={colourState} size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default ChangeEmail;

ChangeEmail.inStorybook = true;
ChangeEmail.fitScreen = false;
//Login.scrollHeight = 844;

const styles = StyleSheet.create({
  logInPage: {
    backgroundColor: '#ffffffff',
    overflow: 'hidden',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  big_title_box: {
    alignItems: 'center',
    justifyContent: 'center',
    //paddingLeft: 15,
    height: '12%',
    minHeight: 28,
    width: '100%',
    padding: 5,
  },
  inputsGroup: {
    width: '85%',
  },
  inputsItem: {
    padding: 7,
  },
  inputLabel: {
    color: '#344053ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    paddingBottom: 5,
  },
  inputLabel_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: 5,
  },
  inputField: {
    //flexGrow: 1,
    backgroundColor: '#ffffffff',
    borderRadius: 8,
    overflow: 'hidden',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputIcon: {
    //width: '15%',
    //flexShrink: 1,
    //aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputText: {
    color: '#344053ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
    paddingHorizontal: 0,
    paddingVertical: 5,
    flex: 1,
  },
  inputText_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  helpIcon: {
    resizeMode: 'contain',
    marginTop: 10,
    height: 16,
    marginBottom: 10,
    marginLeft: 0,
    width: 16,
    minWidth: 16,
    marginRight: 5,
  },
  hintText: {
    color: '#667084ff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
  },
  hintText_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 5,
  },
  logInButton: {
    width: '80%',
    height: '10%',
    margin: 20,
    //backgroundColor: '#3f89beff',
    borderRadius: 8,
    borderStyle: 'solid',
    //borderColor: '#3f89beff',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000000',
    shadowRadius: 2.621621621621622,
    shadowOpacity: 0.2173913043478261,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  logInButtonLabel: {
    color: '#ffffffff',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 24,
    fontSize: 20,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Jaldi */,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  logInButtonLabel_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallGreyButton: {
    backgroundColor: '#ffffffff',
  },
  smallGreyText: {
    color: '#667084ff',
    textAlign: 'left',
    textDecorationLine: 'underline',
    letterSpacing: 0,
    lineHeight: 16,
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
  },
  smallGreyText_box: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 5,
  },
  backButton: {
    width: '15%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  errorText: {
    color: '#e11e22',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'System' /* Inter */,
  },
});
