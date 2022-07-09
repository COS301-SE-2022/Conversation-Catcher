import React, {useState} from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, Alert, TextInput } from 'react-native';
import colour from '../colour/colour';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ChangePassword = ({ navigation }) =>  {
 const [showMailHint, setShowMailHint] = useState(false);
 const [showSuccessMessage, setShowSuccessMessage] = useState(false);
 function MailHint(){
   if (showMailHint)
   {
     return (<Text style={styles.hintText}>
               {'This is an password hint text to help the user.'}
             </Text>)
   }
   else
   {
     return null;
   }
 }
 function SuccessMessage(){
  if (showSuccessMessage)
  {
    return (<Text style={styles.hintText}>
              {'Password has been changed successfully.'}
            </Text>)
  }
  else
  {
    return null;
  }
}
 return (
   <View style={styles.logInPage}>
     <View style={styles.big_title_box}>
       <Text style={styles.big_title}>
         {'Change your password'}
       </Text>
     </View>
     <View style={styles.inputsGroup}>
       <View style={styles.inputsItem}>
         <View style={styles.inputLabel_box}>
           <Text style={styles.inputLabel}>
             {'New password'}
           </Text>
         </View>  
         <View style={styles.inputField}>
           <View style={styles.inputText_box}>
             <View style={styles.inputIcon}>
              <Icon 
                  style={{color : colour.state}}
                  name="lock"
                  size={21}
                />
             </View>
             <TextInput style={styles.inputText}
               placeholder='*****************'
               underlineColorAndroid="transparent"
             />
             <TouchableOpacity 
               style={styles.helpIcon}
               onPress={() => setShowMailHint(!showMailHint)}>
               <Icon 
                 style={{color: '#d0d5ddff'}}
                 name="question-circle-o"
                 size={17}
               />
             </TouchableOpacity>
           </View>
         </View>
         <View style={styles.hintText_box}>
           <MailHint/>
         </View>
       </View>
       <View style={styles.inputsItem}>
         <View style={styles.inputLabel_box}>
           <Text style={styles.inputLabel}>
             {'Re-enter new password'}
           </Text>
         </View>  
         <View style={styles.inputField}>
           <View style={styles.inputText_box}>
             <View style={styles.inputIcon}>
                <Icon 
                  style={{color : colour.state}}
                  name="lock"
                  size={21}
                />
             </View>
             <TextInput style={styles.inputText}
               placeholder='*****************'
               underlineColorAndroid="transparent"
             />
           </View>
         </View>
       </View>   
     </View>
     <TouchableOpacity
       style={styles.logInButton}
       onPress={() => setShowSuccessMessage(true)}>
       <View style={styles.logInButtonLabel_box}>
         <Text style={styles.logInButtonLabel}>
           {'Change password'}
         </Text>
       </View>
     </TouchableOpacity>
     <SuccessMessage/>
     <TouchableOpacity  
        style={styles.backButton} 
        onPress={() => navigation.goBack()}>
          <Icon 
            name="angle-left"
            color={colour.state}
            size={28}
          />
      </TouchableOpacity>
    </View>
  );
}

export default ChangePassword;

ChangePassword.inStorybook = true;
ChangePassword.fitScreen = false;
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
   paddingVertical: 5,
   flex: 1,
 },
 inputText_box: {
   flexGrow: 1,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   margin: 5
 },
 helpIcon: {
   resizeMode: 'contain',
   marginTop: 10,
   height: 16,
   marginBottom: 10,
   marginLeft: 0,
   width: 16,
   minWidth: 16,
   marginRight: 5
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
 backButton: {
  width: '15%',
  height: '15%',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  bottom: 0
}
});
