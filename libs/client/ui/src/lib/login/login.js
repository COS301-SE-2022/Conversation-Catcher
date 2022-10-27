import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  DeviceEventEmitter,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../shared-components/loading/loading';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  selectColour,
  selectUser,
} from '../../../../../../apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { setUser } from '../../../../../../apps/client/src/app/slices/user.slice';
import auth from '@react-native-firebase/auth';
import { gql, useLazyQuery } from '@apollo/client';

export const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const colourState = useSelector(selectColour);
  const userPresent = useSelector(selectUser);
  const [showMailHint, setShowMailHint] = useState(false);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('Invalid login details');
  const [loadingIcon, setLoad] = useState(false);

  DeviceEventEmitter.addListener('logout', () => {
    setEmail('');
    setPassword('');
  });
  useEffect(() => {
    if (userPresent.email !== '') {
      navigation.navigate('Home');
    }
  });

  //graphql query tree
  const GET_USER = gql`
    query getUser($email: String!) {
      getUser(email: $email) {
        email
        pdfs
        colour {
          accent
          mode
          bottom
          low
          high
          top
        }
      }
    }
  `;

  const [getUser] = useLazyQuery(GET_USER);

  function MailHint() {
    if (showMailHint) {
      return (
        <Text style={styles.hintText}>{'Please enter a valid email.'}</Text>
      );
    } else {
      return null;
    }
  }

  function PasswordHint() {
    if (showPasswordHint) {
      return <Text style={styles.hintText}>{'Enter a strong password.'}</Text>;
    } else {
      return null;
    }
  }

  function InvalidDetails() {
    if (!failedLogin) return null;
    return (
      <View style={styles.hintText_box}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.logInPage}>
      <View style={styles.big_title_box}>
        <Text style={styles.big_title}>{'Log in to your account'}</Text>
      </View>
      <Loading
        width={100}
        height={100}
        load={loadingIcon}
        text={'Logging you in'}
      />
      <View style={styles.inputsGroup}>
        <InvalidDetails />
        <View style={styles.inputsItem}>
          <View style={styles.inputLabel_box}>
            <Text style={styles.inputLabel}>{'Email'}</Text>
          </View>
          <View style={styles.inputField}>
            <View style={styles.inputText_box}>
              <View style={styles.inputIcon}>
                <Icon
                  style={{ color: '#3F89BE' }}
                  name="envelope"
                  size={15}
                />
              </View>
              <TextInput
                style={styles.inputText}
                placeholder="johnsmith@gmail.com"
                underlineColorAndroid="transparent"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
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
            <Text style={styles.inputLabel}>{'Password'}</Text>
          </View>
          <View style={styles.inputField}>
            <View style={styles.inputText_box}>
              <View style={styles.inputIcon}>
                <Icon
                  style={{ color: '#3F89BE' }}
                  name="lock"
                  size={21}
                />
              </View>
              <TextInput
                style={styles.inputText}
                placeholder="*******************"
                underlineColorAndroid="transparent"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                secureTextEntry={true}
              />
              <TouchableOpacity
                style={styles.helpIcon}
                onPress={() => setShowPasswordHint(!showPasswordHint)}
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
            <Text style={styles.hintText}>
              <PasswordHint />
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.logInButton,
          { backgroundColor: '#3F89BE' },
          { borderColor: '#3F89BE' },
        ]}
        onPress={() => {
          //Check that email and password is not empty
          if (email === '') {
            setFailedLogin(true);
            setErrorMessage('Email is required');
            return;
          }
          if (password === '') {
            setFailedLogin(true);
            setErrorMessage('Password is required');
            return;
          }
          setLoad(true);
          auth()
            .signInWithEmailAndPassword(
              email.trim().toLowerCase(),
              password.trim()
            )
            .then(async () => {
              setFailedLogin(false);
              var queryRes = (
                await getUser({
                  variables: { email: email.trim().toLowerCase() },
                })
              ).data.getUser;
              console.log(queryRes);
              dispatch(setUser(queryRes));
              setLoad(false);
              navigation.navigate('Home');
            })
            .catch((error) => {
              setFailedLogin(true);
              setErrorMessage('Invalid login details');
              console.log(error);
              setPassword('');
              setLoad(false);
            });
        }}
      >
        <View style={styles.logInButtonLabel_box}>
          <Text style={styles.logInButtonLabel}>{'Log in'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.smallGreyButton}
        onPress={() => {
          navigation.navigate('ForgotPassword');
        }}
      >
        <View style={styles.smallGreyText_box}>
          <Text style={styles.smallGreyText}>{'Forgot your password?'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.smallGreyButton}
        onPress={() => {
          navigation.navigate('Register');
        }}
      >
        <View style={styles.smallGreyText_box}>
          <Text style={styles.smallGreyText}>{'Don’t have an account?'}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;

Login.inStorybook = true;
Login.fitScreen = false;
//Login.scrollHeight = 844;

const styles = StyleSheet.create({
  logInPage: {
    backgroundColor: '#ffffffff',
    overflow: 'hidden',
    flex: 1,
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
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 20,
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
