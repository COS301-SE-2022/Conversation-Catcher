 import React from 'react';
 import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, Alert, TextInput, Icon } from 'react-native';
 import colour from '../colour/colour';
 
 export const Login = ({ navigation }) =>  {
   return (
    <View style={styles.logInPage}>
      <View style={styles.big_title_box}>
        <Text style={styles.big_title}>
          {'Log in to your account'}
        </Text>
      </View>
      <View style={styles.inputsGroup}>
        
        <View style={styles.inputLabel_box}>
          <Text style={styles.inputLabel}>
            {'Email'}
          </Text>
        </View>  
        <View style={styles.inputField}>
          <View style={styles.inputText_box}>
            <Icon 
              style={[styles.settingsButtonIcon, {color : colour.state}]}
              name="envelope"
              size={18}
            />
            <Text style={styles.inputText}>
              {'johnsmith@gmail.com'}
            </Text>
          </View>
        </View>
        <View style={styles.hintText_box}>
          <Text style={styles.hintText}>
            {'This is a hint text to help user.'}
          </Text>
        </View>
        <View style={styles.inputLabel_box}>
          <Text style={styles.inputLabel}>
            {'Password'}
          </Text>
        </View> 
        <View style={styles.inputField}>
          <ImageBackground
            style={styles.inputIcon}
          />
          <View style={styles.inputText_box}>
            <Text style={styles.inputText}>
              {'*******************'}
            </Text>
          </View>
        </View> 
        <View style={styles.hintText_box}>
          <Text style={styles.hintText}>
            {'This is a hint text to help user.'}
          </Text>
        </View>   
      </View>
      <TouchableOpacity
        style={styles.logInButton}
        onPress={() => Alert.alert('click')}>
        <View style={styles.logInButtonLabel_box}>
          <Text style={styles.logInButtonLabel}>
            {'Log in'}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={() => Alert.alert('click')}>
        <View style={styles.forgotPasswordText_box}>
          <Text style={styles.forgotPasswordText}>
            {'Forgot your password?'}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.noAccountButton}
        onPress={() => Alert.alert('click')}>
        <View style={styles.noAccountButtonText_box}>
          <Text style={styles.noAccountButtonText}>
            {'Don’t have an account?'}
          </Text>
        </View>
      </TouchableOpacity>
     </View>
   );
 }

 export default Login;
 
 Login.inStorybook = true;
 Login.fitScreen = false;
 Login.scrollHeight = 844;
 
 const styles = StyleSheet.create({
  logInPage: {
    backgroundColor: '#ffffffff',
    overflow: 'hidden',
    flexGrow: 1,
    flexDirection: 'column'
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
    paddingVertical: 0
  },
  big_title_box: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
    height: '5%',
    //width: '100%',
    minHeight: 28
  },
  inputsGroup: {
    width: '100%',
    flexGrow: 1,
    borderRadius: 5,
  },
   inputLabel: {
     color: '#344053ff',
     textAlign: 'left',
     letterSpacing: 0,
     lineHeight: 20,
     fontSize: 14,
     fontWeight: '500',
     fontStyle: 'normal',
     fontFamily: 'System' /* Inter */,
     paddingHorizontal: 0,
     paddingVertical: 0
   },
   inputLabel_box: {
     flexGrow: 1,
     flexDirection: 'row',
     alignItems: 'flex-start',
     justifyContent: 'flex-start'
   },
   inputField: {
     flexGrow: 1,
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
       height: 1
     },
     flexDirection: 'row'
   },
   inputIcon: {
     resizeMode: 'contain',
     marginTop: 2,
     height: 20,
     marginBottom: 2,
     marginLeft: 0,
     width: 20,
     minWidth: 20,
     marginRight: 0
   },
   inputText: {
     color: '#344053ff',
     textAlign: 'left',
     letterSpacing: 0,
     lineHeight: 24,
     fontSize: 16,
     fontWeight: '400',
     fontStyle: 'normal',
     fontFamily: 'System' /* Inter */,
     paddingHorizontal: 0,
     paddingVertical: 0
   },
   inputText_box: {
     flexGrow: 1,
     flexDirection: 'row',
     alignItems: 'flex-start',
     justifyContent: 'flex-start'
   },
   helpIcon: {
     resizeMode: 'contain',
     marginTop: 14,
     height: 16,
     marginBottom: 14,
     marginLeft: 0,
     width: 16,
     minWidth: 16,
     marginRight: 14
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
     paddingHorizontal: 0,
     paddingVertical: 0
   },
   hintText_box: {
     flexGrow: 1,
     flexDirection: 'row',
     alignItems: 'flex-start',
     justifyContent: 'flex-start'
   },
   logInButton: {
     width: '100%',
     flexGrow: 1,
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
       height: 1
     }
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
     paddingVertical: 0
   },
   logInButtonLabel_box: {
     flexGrow: 1,
     flexDirection: 'row',
     alignItems: 'flex-start',
     justifyContent: 'flex-start'
   },
   forgotPasswordButton: {
     backgroundColor: '#ffffffff',
     borderRadius: 8,
   },
   forgotPasswordText: {
     color: '#667084ff',
     textAlign: 'left',
     textDecorationLine: 'underline',
     letterSpacing: 0,
     lineHeight: 20,
     fontSize: 14,
     fontWeight: '400',
     fontStyle: 'normal',
     fontFamily: 'System' /* Inter */,
     paddingHorizontal: 0,
     paddingVertical: 0
   },
   forgotPasswordText_box: {
     flexGrow: 1,
     flexDirection: 'row',
     alignItems: 'flex-start',
     justifyContent: 'flex-start'
   },
   noAccountButton: {
     backgroundColor: '#ffffffff',
     borderRadius: 8,
     flexGrow: 1,
     flexDirection: 'row',
     alignItems: 'flex-start',
     justifyContent: 'flex-start'
   },
   noAccountButtonText: {
     color: '#667084ff',
     textAlign: 'left',
     textDecorationLine: 'underline',
     letterSpacing: 0,
     lineHeight: 20,
     fontSize: 14,
     fontWeight: '400',
     fontStyle: 'normal',
     fontFamily: 'System' /* Inter */,
     paddingHorizontal: 0,
     paddingVertical: 0
   },
 });
 