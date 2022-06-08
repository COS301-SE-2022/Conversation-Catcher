 import React from 'react';
 import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, Alert, inputField } from 'react-native';
 
 export const Login = ({ navigation }) =>  {
   return (
     <View style={styles.logInPage}>
       <View style={styles.logInBody}>
         <View style={styles.logInBody_item}>
           <View style={styles.logInTitle_box}>
             <Text style={styles.logInTitle}>
               {'Log in to your account'}
             </Text>
           </View>
         </View>
         <View style={styles.logInBody_item}>
           <View style={styles.inputsGroup}>
             <View style={styles.textInputGroup}>
               <View style={styles.textInputGroup_item}>
                 <View style={styles.inputBoxAndLabel}>
                   <View style={styles.inputBoxAndLabel_item}>
                     <View style={styles.inputLabel_box}>
                       <Text style={styles.inputLabel}>
                         {'Password'}
                       </Text>
                     </View>
                   </View>
                   <View style={styles.inputBoxAndLabel_item}>
                     <View style={styles.inputField}>
                       <View style={styles.inputField_item}>
                         <View
                           style={styles.inputFieldContents}>
                           <View style={styles.inputFieldContents_item}>
                             <ImageBackground
                               style={styles.inputIcon}
                               source={require('../assets/lock.png')}
                             />
                           </View>
                           <View style={styles.inputFieldContents_space} />
                           <View style={styles.inputFieldContents_item1}>
                             <View
                               style={styles.inputText_box}>
                               <Text style={styles.inputText}>
                                 {'*******************'}
                               </Text>
                             </View>
                           </View>
                         </View>
                       </View>
                     </View>
                   </View>
                 </View>
               </View>
               <View style={styles.textInputGroup_item}>
                 <View style={styles.hintText_box}>
                   <Text style={styles.hintText}>
                     {'This is a hint text to help user.'}
                   </Text>
                 </View>
               </View>
             </View>
 
             <View style={styles.textInputGroup1}>
               <View style={styles.textInputGroup_item}>
                 <View style={styles.inputBoxAndLabel}>
                   <View style={styles.inputBoxAndLabel_item}>
                     <View style={styles.inputLabel_box}>
                       <Text style={styles.inputLabel}>
                         {'Email'}
                       </Text>
                     </View>
                   </View>
                   <View style={styles.inputBoxAndLabel_item}>
                     <View style={styles.inputField}>
                       <View style={styles.inputField_item}>
                         <View
                           style={styles.inputFieldContents}>
                           <View style={styles.inputFieldContents_item}>
                             <ImageBackground
                               style={[styles.inputIcon, styles.inputIcon_layout]}
                               source={require('../assets/mail.png')}
                             />
                           </View>
                           <View style={styles.inputFieldContents_space} />
                           <View style={styles.inputFieldContents_item2}>
                             <View
                               style={styles.inputText_box}>
                               <Text style={styles.inputText}>
                                 {'johnsmith@gmail.com'}
                               </Text>
                             </View>
                           </View>
                         </View>
                       </View>
                     </View>
                   </View>
                 </View>
               </View>
               <View style={styles.textInputGroup_item}>
                 <View style={styles.hintText_box}>
                   <Text style={styles.hintText}>
                     {'This is a hint text to help user.'}
                   </Text>
                 </View>
               </View>
             </View>
           </View>
         </View>
         <View style={styles.logInBody_item}>
           <View style={styles.logInButtonFrame}>
             <TouchableOpacity
               style={styles.logInButton}
               onPress={() => Alert.alert('click')}>
               <View
                 style={styles.logInButtonLabel_box}>
                 <Text style={styles.logInButtonLabel}>
                   {'Log in'}
                 </Text>
               </View>
             </TouchableOpacity>
           </View>
         </View>
         <View style={styles.logInBody_item}>
           <View style={styles.block10}>
             <TouchableOpacity
               style={[styles.forgotPasswordButton, styles.forgotPasswordButton_layout]}
               onPress={() => Alert.alert('click')}>
               <View
                 style={styles.forgotPasswordText_box}>
                 <Text style={styles.forgotPasswordText}>
                   {'Forgot your password?'}
                 </Text>
               </View>
             </TouchableOpacity>
           </View>
         </View>
         <View style={styles.logInBody_item}>
           <View style={styles.block12}>
             <TouchableOpacity
               style={[styles.noAccountButton, styles.noAccountButton_layout]}
               onPress={() => Alert.alert('click')}>
               <View
                 style={styles.noAccountButtonText_box}>
                 <Text style={styles.noAccountButtonText}>
                   {'Don’t have an account?'}
                 </Text>
               </View>
             </TouchableOpacity>
           </View>
         </View>
       </View>
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
     flexShrink: 0,
     flexGrow: 1,
   },
   logInBody: {
     flexGrow: 1
   },
   logInBody_item: {
     flexGrow: 0,
     flexShrink: 1
   },
   logInTitle: {
     color: '#344053ff',
     textAlign: 'right',
     letterSpacing: 0,
     lineHeight: 30,
     fontSize: 30,
     fontWeight: '700',
     fontStyle: 'normal',
     fontFamily: 'System' /* Jaldi */,
     paddingHorizontal: 0,
     paddingVertical: 0
   },
   logInTitle_box: {
     flexGrow: 1,
     flexDirection: 'row',
     alignItems: 'flex-start',
     justifyContent: 'flex-end'
   },
   inputsGroup: {
     width: '100%',
     flexGrow: 1,
     borderRadius: 5
   },
   textInputGroup: {
    position: 'absolute',
   },
   textInputGroup_item: {
     flexGrow: 0,
     flexShrink: 1
   },
   inputBoxAndLabel: {
     flexGrow: 1
   },
   inputBoxAndLabel_item: {
     flexGrow: 0,
     flexShrink: 1
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
   inputField_item: {
     flexGrow: 0,
     flexShrink: 1,
   },
   inputFieldContents: {
     flexGrow: 1,
     flexDirection: 'row'
   },
   inputFieldContents_item: {
     flexGrow: 0,
     flexShrink: 1,
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
   inputFieldContents_space: {
     flexGrow: 0,
     flexShrink: 1,
     flexBasis: 8
   },
   inputFieldContents_item1: {
     flexGrow: 0,
     flexShrink: 0,
     minWidth: 0
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
   inputField_space: {
     flexGrow: 0,
     flexShrink: 1,
     flexBasis: 8
   },
   inputField_item1: {
     flexGrow: 0,
     flexShrink: 1,
     flexBasis: 30
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
   textInputGroup1: {
     flexGrow: 1
   },
   inputFieldContents_item2: {
     flexGrow: 0,
     flexShrink: 0,
     minWidth: 0
   },
   inputField_item2: {
     flexGrow: 0,
     flexShrink: 1,
     flexBasis: 30
   },
   logInButtonFrame: {
     width: '100%',
     flexGrow: 1,
     borderRadius: 8
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
   block10: {
     width: '100%',
     flexGrow: 1,
     borderRadius: 8
   },
   forgotPasswordButton: {
     backgroundColor: '#ffffffff',
     borderRadius: 8,
     position: 'absolute',
     top: -2,
     height: 44,
     width: 188,
     right: 0
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
   block12: {
     width: '100%',
     flexGrow: 1,
     borderRadius: 8
   },
   noAccountButton: {
     backgroundColor: '#ffffffff',
     borderRadius: 8,
     position: 'absolute',
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
   noAccountButtonText_box: {
     flexGrow: 1,
     flexDirection: 'row',
     alignItems: 'flex-start',
     justifyContent: 'flex-start'
   }
 });
 