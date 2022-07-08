import React, {useState} from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, Alert, TextInput } from 'react-native';
import colour from '../colour/colour';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ForgotPassword = ({ navigation }) =>  {
 const [showSuccessMessage, setShowSuccessMessage] = useState(false);
 function SuccessMessage(){
   if (showSuccessMessage)
   {
     return (<View>
              <View style={styles.hintText_box}>
                <Text style={styles.hintText}>
                {'This is an email hint text to help the user.'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.smallGreyButton}
                onPress={() => Alert.alert('click')}>
                <View style={styles.smallGreyText_box}>
                  <Text style={styles.smallGreyText}>
                    {'Forgot your password?'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>)
   }
   else
   {
     return (<TouchableOpacity
              style={styles.changeMailButton}
              onPress={() => setShowSuccessMessage(true)}>
              <View style={styles.changeMailButtonLabel_box}>
                <Text style={styles.changeMailButtonLabel}>
                  {'Send reset email'}
                </Text>
              </View>
            </TouchableOpacity>)
   }
 }

 return (
   <View style={styles.logInPage}>
     <View style={styles.big_title_box}>
       <Text style={styles.big_title}>
         {'Reset password'}
       </Text>
     </View>
     <View style={styles.inputsGroup}>
      <View style={styles.inputsItem}>
        <View style={styles.inputLabel_box}>
          <Text style={styles.inputLabel}>
            {'Email'}
          </Text>
        </View>  
        <View style={styles.inputField}>
          <View style={styles.inputText_box}>
            <View style={styles.inputIcon}>
              <Icon 
                style={{color: colour.state}}
                name="envelope"
                size={15}
              />
            </View>
            <TextInput style={styles.inputText}
              placeholder='johnsmith@gmail.com'
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity 
              style={styles.helpIcon}
              >
              <Icon 
                style={{color: '#d0d5ddff'}}
                name="question-circle-o"
                size={17}
              />
            </TouchableOpacity>
          </View>
        </View>
        <SuccessMessage/>
      </View> 
     </View>
    </View>
  );
}

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
   alignItems: 'center'
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
   alignItems: 'center',
   justifyContent: 'center',
   //paddingLeft: 15,
   height: '12%',
   minHeight: 28,
   width: '100%',
   padding: 5
 },
 inputsGroup: {
   width: '85%',
 },
 inputsItem: {
   padding: 7
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
   paddingBottom: 5
 },
 inputLabel_box: {
   flexGrow: 1,
   flexDirection: 'row',
   alignItems: 'flex-start',
   justifyContent: 'flex-start',
   paddingBottom: 5
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
     height: 1
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
   paddingHorizontal: 10
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
   margin: 5
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
   margin: 5
 },
 changeMailButton: {
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
     height: 1
   }
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
   paddingVertical: 0
 },
 changeMailButtonLabel_box: {
   flexGrow: 1,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center'
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
   margin: 5
 },
});
