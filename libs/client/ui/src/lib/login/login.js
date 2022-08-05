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
} from 'apps/client/src/app/slices/user.slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { setUser } from 'apps/client/src/app/slices/user.slice';
import auth from '@react-native-firebase/auth';
import { gql, useLazyQuery } from '@apollo/client';

export const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const colourState = useSelector(selectColour);
  // console.log('Colour:' + colourState);
  const [showMailHint, setShowMailHint] = useState(false);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // dispatch(setUser({ colour: '#ffff', pdfs: [], email: '' }));

  //graphql query tree
  const GET_USER = gql`
    query getUser($email: String!) {
      getUser(email: $email) {
        email
        pdfs
        colour
      }
    }
  `;

  const [getUser] = useLazyQuery(GET_USER);

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
  function PasswordHint() {
    if (showPasswordHint) {
      return (
        <Text style={styles.hintText}>
          {'This is a password hint text to help the user.'}
        </Text>
      );
    } else {
      return null;
    }
  }

  // console.log(useSelector(selectUser)); //test statement

  return (
    <View style={styles.logInPage}>
      <View style={styles.big_title_box}>
        <Text style={styles.big_title}>{'Log in to your account'}</Text>
      </View>
      <View style={styles.inputsGroup}>
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
          { backgroundColor: colourState },
          { borderColor: colourState },
        ]}
        onPress={() => {
          auth()
            .signInWithEmailAndPassword(email, password)
            .then(async () => {
              navigation.navigate('Home');
              var queryRes = (await getUser({ variables: { email: email } }))
                .data.getUser;
              console.log(queryRes);
              dispatch(setUser(queryRes));
            })
            .catch((error) => {
              if (error.code === 'auth/invalid-password') {
                console.log('The provided password is invalid!');
              }
            });
          // console.log(email);
          // console.log(password);
          // var queryRes = (await getUser({ variables: { email: email } })).data
          //   .getUser;
          // console.log(queryRes);
          // dispatch(setUser(queryRes));
          // navigation.navigate('Home');
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
    </View>
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
});
