import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { selectColour } from '../../../../../../apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { setUser } from '../../../../../../apps/client/src/app/slices/user.slice';
import auth from '@react-native-firebase/auth';
import { gql, useMutation } from '@apollo/client';
import Loading from '../shared-components/loading/loading';

export const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const colourState = useSelector(selectColour);
  const [showMailHint, setShowMailHint] = useState(false);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [failedSignUp, setFailedSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('Invalid login details');
  const [loadingIcon,setLoad] = useState(false);

  //graphql query tree
  const ADDUSER = gql`
    mutation addUser($email: String!) {
      addUser(email: $email) {
        email
        colour
        pdfs
      }
    }
  `;

  const [addUser] = useMutation(ADDUSER);

  function MailHint() {
    if (showMailHint) {
      return (
        <Text style={styles.hintText}>
          {'Please enter a valid email address'}
        </Text>
      );
    } else {
      return null;
    }
  }

  function PasswordHint() {
    if (showPasswordHint) {
      return (
        <Text style={styles.hintText}>
          {'Enter a strong password.'}
        </Text>
      );
    } else {
      return null;
    }
  }

  function InvalidDetails() {
    if (!failedSignUp) return null;
    return (
      <View style={styles.hintText_box}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.registerPage}>
      <View style={styles.big_title_box}>
        <Text style={styles.big_title}>{'Create new account'}</Text>
      </View>
      <Loading width={100} height={100} load={loadingIcon} text={"Creating your account"}/>
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
                <Icon style={{ color: colourState }} name="lock" size={21} />
              </View>
              <TextInput
                style={styles.inputText}
                placeholder="*******************"
                underlineColorAndroid="transparent"
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
          styles.registerButton,
          { backgroundColor: colourState },
          { borderColor: colourState },
        ]}
        onPress={() => {
          if (email === '') {
            setFailedSignUp(true);
            setErrorMessage('Email is required');
            return;
          }
          if (password === '') {
            setFailedSignUp(true);
            setErrorMessage('Password is required');
            return;
          }
          setLoad(true);
          auth()
            .createUserWithEmailAndPassword(
              email.trim().toLowerCase(),
              password.trim()
            )
            .then(async () => {
              //Succesful register: Add user to mongoDB and set the user object
              setFailedSignUp(false);
              var queryRes = (
                await addUser({
                  variables: { email: email.trim().toLowerCase() },
                })
              ).data.addUser;
              dispatch(setUser(queryRes));
              setLoad(false);
              navigation.navigate('Home');
            })
            .catch((error) => {
              //If there is an error registering output a helpfull error message
              console.log(error.code);
              setLoad(false);
              setFailedSignUp(true);
              if (error.code === 'auth/email-already-in-use')
                setErrorMessage('That email address is already in use!');
              else if (error.code === 'auth/invalid-email')
                setErrorMessage('That email address is invalid!');
              else if (error.code === 'auth/weak-password')
                setErrorMessage('Password should be at least 6 digits');
              else setErrorMessage('Failed to create an account');
            });
        }}
      >
        <View style={styles.registerButtonLabel_box}>
          <Text style={styles.registerButtonLabel}>{'Register'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.smallGreyButton}
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        <View style={styles.smallGreyText_box}>
          <Text style={styles.smallGreyText}>{'Already a user?'}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Register;

Register.inStorybook = true;
Register.fitScreen = false;
Register.scrollHeight = 844;

const styles = StyleSheet.create({
  registerPage: {
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
  registerButton: {
    width: '80%',
    height: '10%',
    margin: 20,
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
  registerButtonLabel: {
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
  registerButtonLabel_box: {
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
