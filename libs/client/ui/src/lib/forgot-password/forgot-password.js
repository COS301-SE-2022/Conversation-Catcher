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
import { useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectColour } from 'apps/client/src/app/slices/user.slice';
import auth from '@react-native-firebase/auth';

export const ForgotPassword = ({ navigation }) => {
  const colourState = useSelector(selectColour);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [failedText, setFailedText] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [displayText, setDisplayText] = useState('sent');

  function SuccessMessage() {
    if (showSuccessMessage) {
      return (
        <View>
          <View style={styles.hintText_box}>
            <Text style={styles.hintText}>
              {'The email has been ' + displayText + '.'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.smallGreyButton}
            onPress={() => {
              if (email === '') {
                setFailedText(true);
                setErrorMessage('Email is required');
                return;
              }
              auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                  setFailedText(false);
                  setDisplayText('re-sent');
                })
                .catch((e) => {
                  setFailedText(true);
                  if (e.code === 'auth/invalid-email')
                    setErrorMessage('The email address is badly formatted');
                  else {
                    setErrorMessage('An error has occurred');
                    console.log(e);
                  }
                });
            }}
          >
            <View style={styles.smallGreyText_box}>
              <Text style={styles.smallGreyText}>{'Resend email?'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={[
            styles.changeMailButton,
            { backgroundColor: colourState },
            { borderColor: colourState },
          ]}
          onPress={() => {
            if (email === '') {
              setFailedText(true);
              setErrorMessage('Email is required');
              return;
            }
            auth()
              .sendPasswordResetEmail(email)
              .then(() => {
                setFailedText(false);
                setShowSuccessMessage(true);
              })
              .catch((e) => {
                setFailedText(true);
                if (e.code === 'auth/invalid-email')
                  setErrorMessage('The email address is badly formatted');
                else {
                  setErrorMessage('An error has occurred');
                  console.log(e);
                }
              });
          }}
        >
          <View style={styles.changeMailButtonLabel_box}>
            <Text style={styles.changeMailButtonLabel}>
              {'Send reset email'}
            </Text>
          </View>
        </TouchableOpacity>
      );
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
        <Text style={styles.big_title}>{'Reset password'}</Text>
      </View>
      <View style={styles.inputsGroup}>
        <View style={styles.inputsItem}>
          <ErrorMessage />
          <View style={styles.inputLabel_box}>
            <Text style={styles.inputLabel}>{'Email'}</Text>
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
                onChangeText={(text) => setEmail(text.toLowerCase().trim())}
              />
            </View>
          </View>
          <SuccessMessage />
        </View>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="angle-left" color={colourState} size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

ForgotPassword.inStorybook = true;
ForgotPassword.fitScreen = false;
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
    //padding: 5
  },
  inputsGroup: {
    width: '85%',
  },
  inputsItem: {
    padding: 5,
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
  },
  inputLabel_box: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: 10,
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
    paddingVertical: 0,
    flex: 1,
  },
  inputText_box: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
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
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingTop: 15,
  },
  changeMailButton: {
    width: '100%',
    height: '25%',
    marginVertical: 25,
    backgroundColor: '#3f89beff',
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: '#3f89beff',
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
  changeMailButtonLabel: {
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
  changeMailButtonLabel_box: {
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
    alignItems: 'center',
    justifyContent: 'center',
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
