 import React from 'react';
 import { View, StyleSheet, Text, Image, ImageBackground, Pressable, Alert, inputField } from 'react-native';
 import { Px } from './posize';
 
 export default function Login(props) {
   return (
     <View style={[styles.logInPage, styles.logInPage_layout]}>
       <Px.View x="0px 390fr 0px" y="194px minmax(0px, max-content) 194px" style={styles.logInBody}>
         <View style={styles.logInBody_item}>
           <Px.View x="60fr 69.23% 60fr" y="7px minmax(0px, max-content) 0px" style={styles.logInTitle_box}>
             <Text style={styles.logInTitle} ellipsizeMode={'clip'}>
               {'Log in to your account'}
             </Text>
           </Px.View>
         </View>
         <View style={styles.logInBody_item}>
           <Px.View x="0px 390fr 0px" y="3px minmax(0px, max-content) 0px" style={styles.inputsGroup}>
             <View style={[styles.textInputGroup, styles.textInputGroup_layout]}>
               <View style={styles.textInputGroup_item}>
                 <Px.View x="0px 320fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.inputBoxAndLabel}>
                   <View style={styles.inputBoxAndLabel_item}>
                     <Px.View x="0px 320fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.inputLabel_box}>
                       <Text style={styles.inputLabel} ellipsizeMode={'clip'}>
                         {'Password'}
                       </Text>
                     </Px.View>
                   </View>
                   <View style={styles.inputBoxAndLabel_item}>
                     <Px.View x="0px 320fr 0px" y="6px minmax(0px, max-content) 0px" style={styles.inputField}>
                       <View style={styles.inputField_item}>
                         <Px.View
                           x="14px 268fr 0px"
                           y="10px minmax(0px, max-content) 10px"
                           style={styles.inputFieldContents}>
                           <View style={styles.inputFieldContents_item}>
                             <ImageBackground
                               style={[styles.inputIcon, styles.inputIcon_layout]}
                               source={require('../assets/81dabd54e7a5ce9bbb9fc86ac1a29ae9.png')}
                             />
                           </View>
                           <View style={styles.inputFieldContents_space} />
                           <View style={styles.inputFieldContents_item1}>
                             <Px.View
                               x="0px 156fr 84px"
                               y="0px minmax(0px, max-content) 0px"
                               style={styles.inputText_box}>
                               <Text style={styles.inputText} ellipsizeMode={'clip'}>
                                 {'*******************'}
                               </Text>
                             </Px.View>
                           </View>
                         </Px.View>
                       </View>
                       <View style={styles.inputField_space} />
                       <View style={styles.inputField_item1}>
                         <ImageBackground
                           style={[styles.helpIcon, styles.helpIcon_layout]}
                           source={require('../assets/b9c2ad691b4709a9437438211db17b4a.png')}
                         />
                       </View>
                     </Px.View>
                   </View>
                 </Px.View>
               </View>
               <View style={styles.textInputGroup_item}>
                 <Px.View x="0px 320fr 0px" y="6px minmax(0px, max-content) 67px" style={styles.hintText_box}>
                   <Text style={styles.hintText} ellipsizeMode={'clip'}>
                     {'This is a hint text to help user.'}
                   </Text>
                 </Px.View>
               </View>
             </View>
 
             <Px.View x="35px 320fr 35px" y="20px minmax(0px, max-content) 148px" style={styles.textInputGroup1}>
               <View style={styles.textInputGroup_item}>
                 <Px.View x="0px 320fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.inputBoxAndLabel}>
                   <View style={styles.inputBoxAndLabel_item}>
                     <Px.View x="0px 320fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.inputLabel_box}>
                       <Text style={styles.inputLabel} ellipsizeMode={'clip'}>
                         {'Email'}
                       </Text>
                     </Px.View>
                   </View>
                   <View style={styles.inputBoxAndLabel_item}>
                     <Px.View x="0px 320fr 0px" y="6px minmax(0px, max-content) 0px" style={styles.inputField}>
                       <View style={styles.inputField_item}>
                         <Px.View
                           x="14px 268fr 0px"
                           y="10px minmax(0px, max-content) 10px"
                           style={styles.inputFieldContents}>
                           <View style={styles.inputFieldContents_item}>
                             <ImageBackground
                               style={[styles.inputIcon, styles.inputIcon_layout]}
                               source={require('../assets/8ef12a3e0f56d76fb9df3482d1b0791c.png')}
                             />
                           </View>
                           <View style={styles.inputFieldContents_space} />
                           <View style={styles.inputFieldContents_item2}>
                             <Px.View
                               x="0px 170fr 70px"
                               y="0px minmax(0px, max-content) 0px"
                               style={styles.inputText_box}>
                               <Text style={styles.inputText} ellipsizeMode={'clip'}>
                                 {'johnsmith@gmail.com'}
                               </Text>
                             </Px.View>
                           </View>
                         </Px.View>
                       </View>
                       <View style={styles.inputField_space} />
                       <View style={styles.inputField_item2}>
                         <ImageBackground
                           style={[styles.helpIcon, styles.helpIcon_layout]}
                           source={require('../assets/b9c2ad691b4709a9437438211db17b4a.png')}
                         />
                       </View>
                     </Px.View>
                   </View>
                 </Px.View>
               </View>
               <View style={styles.textInputGroup_item}>
                 <Px.View x="0px 320fr 0px" y="6px minmax(0px, max-content) 0px" style={styles.hintText_box}>
                   <Text style={styles.hintText} ellipsizeMode={'clip'}>
                     {'This is a hint text to help user.'}
                   </Text>
                 </Px.View>
               </View>
             </Px.View>
           </Px.View>
         </View>
         <View style={styles.logInBody_item}>
           <Px.View x="40px 310fr 40px" y="3px minmax(0px, max-content) 0px" style={styles.logInButtonFrame}>
             <Px.Pressable
               x="0px 310fr 0px"
               y="0px minmax(0px, max-content) 11px"
               style={styles.logInButton}
               onPress={() => Alert.alert('click')}>
               <Px.View
                 x="132px minmax(0px, max-content) 126fr"
                 y="10px minmax(0px, max-content) 10fr"
                 style={styles.logInButtonLabel_box}>
                 <Text style={styles.logInButtonLabel} ellipsizeMode={'clip'}>
                   {'Log in'}
                 </Text>
               </Px.View>
             </Px.Pressable>
           </Px.View>
         </View>
         <View style={styles.logInBody_item}>
           <Px.View x="101fr 48.21% 101fr" y="3px 41px 0px" style={styles.block10}>
             <Pressable
               style={[styles.forgotPasswordButton, styles.forgotPasswordButton_layout]}
               onPress={() => Alert.alert('click')}>
               <Px.View
                 x="18px minmax(0px, max-content) 15fr"
                 y="12px minmax(0px, max-content) 12fr"
                 style={styles.forgotPasswordText_box}>
                 <Text style={styles.forgotPasswordText} ellipsizeMode={'clip'}>
                   {'Forgot your password?'}
                 </Text>
               </Px.View>
             </Pressable>
           </Px.View>
         </View>
         <View style={styles.logInBody_item}>
           <Px.View x="25.64% 48.97% 25.38%" y="3px 41px 6px" style={styles.block12}>
             <Pressable
               style={[styles.noAccountButton, styles.noAccountButton_layout]}
               onPress={() => Alert.alert('click')}>
               <Px.View
                 x="18px minmax(0px, max-content) 15fr"
                 y="12px minmax(0px, max-content) 12fr"
                 style={styles.noAccountButtonText_box}>
                 <Text style={styles.noAccountButtonText} ellipsizeMode={'clip'}>
                   {'Don’t have an account?'}
                 </Text>
               </Px.View>
             </Pressable>
           </Px.View>
         </View>
       </Px.View>
     </View>
   );
 }
 
 Login.inStorybook = true;
 Login.fitScreen = false;
 Login.scrollHeight = 844;
 
 const styles = StyleSheet.create({
   logInPage: {
     backgroundColor: '#ffffffff',
     overflow: 'hidden'
   },
   logInPage_layout: {
     marginTop: 0,
     marginBottom: 0,
     minHeight: 844,
     flexShrink: 0,
     marginLeft: 0,
     flexGrow: 1,
     marginRight: 0
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
   textInputGroup: {},
   textInputGroup_layout: {
     position: 'absolute',
     height: 163,
     bottom: -40,
     width: 320,
     right: 35
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
     flexBasis: 282
   },
   inputFieldContents: {
     flexGrow: 1,
     flexDirection: 'row'
   },
   inputFieldContents_item: {
     flexGrow: 0,
     flexShrink: 1,
     flexBasis: 20
   },
   inputIcon: {
     resizeMode: 'contain'
   },
   inputIcon_layout: {
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
     resizeMode: 'contain'
   },
   helpIcon_layout: {
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
     borderRadius: 8
   },
   forgotPasswordButton_layout: {
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
     borderRadius: 8
   },
   noAccountButton_layout: {
     position: 'absolute',
     top: -2,
     height: 44,
     width: 191,
     right: 0
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
 