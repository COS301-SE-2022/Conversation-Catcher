import React from 'react';
 import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
 
 export const Register = ({ navigation }) =>  {
   return (
     <View style={[styles.registerPage, styles.registerPage_layout]}>
       <View x="0px 390fr 0px" y="194px minmax(0px, max-content) 194px" style={styles.block1}>
         <View style={styles.block1_item}>
           <View x="62fr 68.21% 62fr" y="29px minmax(0px, max-content) 0px" style={styles.registerTitle_box}>
             <Text style={styles.registerTitle} ellipsizeMode={'clip'}>
               {'Create a new account'}
             </Text>
           </View>
         </View>
         <View style={styles.block1_item}>
           <View x="0px 390fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.inputsGroup}>
             <View style={[styles.textInputGroup, styles.textInputGroup_layout]}>
               <View style={styles.textInputGroup_item}>
                 <View x="0px 320fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.inputBoxAndLabel}>
                   <View style={styles.inputBoxAndLabel_item}>
                     <View x="0px 320fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.inputLabel_box}>
                       <Text style={styles.inputLabel} ellipsizeMode={'clip'}>
                         {'Password'}
                       </Text>
                     </View>
                   </View>
                   <View style={styles.inputBoxAndLabel_item}>
                     <View x="0px 320fr 0px" y="6px minmax(0px, max-content) 0px" style={styles.inputField}>
                       <View style={styles.inputField_item}>
                         <View
                           x="14px 268fr 0px"
                           y="10px minmax(0px, max-content) 10px"
                           style={styles.inputFieldContents}>
                           <View style={styles.inputFieldContents_item}>
                             <ImageBackground
                               style={[styles.inputIcon, styles.inputIcon_layout]}
                        
                             />
                           </View>
                           <View style={styles.inputFieldContents_space} />
                           <View style={styles.inputFieldContents_item1}>
                             <View
                               x="0px 156fr 84px"
                               y="0px minmax(0px, max-content) 0px"
                               style={styles.inputText_box}>
                               <Text style={styles.inputText} ellipsizeMode={'clip'}>
                                 {'*******************'}
                               </Text>
                             </View>
                           </View>
                         </View>
                       </View>
                       <View style={styles.inputField_space} />
                       <View style={styles.inputField_item1}>
                         <ImageBackground
                           style={[styles.helpIcon, styles.helpIcon_layout]}
                          
                         />
                       </View>
                     </View>
                   </View>
                 </View>
               </View>
               <View style={styles.textInputGroup_item}>
                 <View x="0px 320fr 0px" y="6px minmax(0px, max-content) 67px" style={styles.hintText_box}>
                   <Text style={styles.hintText} ellipsizeMode={'clip'}>
                     {'This is a hint text to help user.'}
                   </Text>
                 </View>
               </View>
             </View>
 
             <View x="35px 320fr 35px" y="20px minmax(0px, max-content) 148px" style={styles.textInputGroup1}>
               <View style={styles.textInputGroup_item}>
                 <View x="0px 320fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.inputBoxAndLabel}>
                   <View style={styles.inputBoxAndLabel_item}>
                     <View x="0px 320fr 0px" y="0px minmax(0px, max-content) 0px" style={styles.inputLabel_box}>
                       <Text style={styles.inputLabel} ellipsizeMode={'clip'}>
                         {'Email'}
                       </Text>
                     </View>
                   </View>
                   <View style={styles.inputBoxAndLabel_item}>
                     <View x="0px 320fr 0px" y="6px minmax(0px, max-content) 0px" style={styles.inputField}>
                       <View style={styles.inputField_item}>
                         <View
                           x="14px 268fr 0px"
                           y="10px minmax(0px, max-content) 10px"
                           style={styles.inputFieldContents}>
                           <View style={styles.inputFieldContents_item}>
                             <ImageBackground
                               style={[styles.inputIcon, styles.inputIcon_layout]}
                              
                             />
                           </View>
                           <View style={styles.inputFieldContents_space} />
                           <View style={styles.inputFieldContents_item2}>
                             <View
                               x="0px 170fr 70px"
                               y="0px minmax(0px, max-content) 0px"
                               style={styles.inputText_box}>
                               <Text style={styles.inputText} ellipsizeMode={'clip'}>
                                 {'johnsmith@gmail.com'}
                               </Text>
                             </View>
                           </View>
                         </View>
                       </View>
                       <View style={styles.inputField_space} />
                       <View style={styles.inputField_item2}>
                         <ImageBackground
                           style={[styles.helpIcon, styles.helpIcon_layout]}
                         
                         />
                       </View>
                     </View>
                   </View>
                 </View>
               </View>
               <View style={styles.textInputGroup_item}>
                 <View x="0px 320fr 0px" y="6px minmax(0px, max-content) 0px" style={styles.hintText_box}>
                   <Text style={styles.hintText} ellipsizeMode={'clip'}>
                     {'This is a hint text to help user.'}
                   </Text>
                 </View>
               </View>
             </View>
           </View>
         </View>
         <View style={styles.block1_item}>
           <View x="40px 310fr 40px" y="3px minmax(0px, max-content) 0px" style={styles.registerButtonFrame}>
             <TouchableOpacity
               x="0px 310fr 0px"
               y="0px minmax(0px, max-content) 11px"
               style={styles.registerButton}
               onPress={() => Alert.alert('click')}>
               <View
                 x="124px minmax(0px, max-content) 118fr"
                 y="10px minmax(0px, max-content) 10fr"
                 style={styles.registerButtonLabel_box}>
                 <Text style={styles.registerButtonLabel} ellipsizeMode={'clip'}>
                   {'Register'}
                 </Text>
               </View>
             </TouchableOpacity>
           </View>
         </View>
         <View style={styles.block1_item}>
           <View x="126fr 35.38% 126fr" y="3px 41px 28px" style={styles.block4}>
             <TouchableOpacity
               style={[styles.alreadyUserButton, styles.alreadyUserButton_layout]}
               onPress={() => {navigation.navigate('Login')}}>
               <View
                 x="18px minmax(0px, max-content) 14fr"
                 y="12px minmax(0px, max-content) 12fr"
                 style={styles.alreadyUserButtonText_box}>
                 <Text style={styles.alreadyUserButtonText} ellipsizeMode={'clip'}>
                   {'Already a user?'}
                 </Text>
               </View>
             </TouchableOpacity>
           </View>
         </View>
       </View>
     </View>
   );
 }

 export default Register;
 
 Register.inStorybook = true;
 Register.fitScreen = false;
 Register.scrollHeight = 844;
 
 const styles = StyleSheet.create({
   registerPage: {
     backgroundColor: '#ffffffff',
     overflow: 'hidden'
   },
   registerPage_layout: {
     marginTop: 0,
     marginBottom: 0,
     minHeight: 844,
     marginLeft: 0,
     flexGrow: 1,
     marginRight: 0
   },
   block1: {
     flexGrow: 1
   },
   block1_item: {
     flexGrow: 0,
     flexShrink: 1
   },
   registerTitle: {
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
   registerTitle_box: {
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
   registerButtonFrame: {
     width: '100%',
     flexGrow: 1,
     borderRadius: 8
   },
   registerButton: {
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
     paddingVertical: 0
   },
   registerButtonLabel_box: {
     flexGrow: 1,
     flexDirection: 'row',
     alignItems: 'flex-start',
     justifyContent: 'flex-start'
   },
   block4: {
     width: '100%',
     flexGrow: 1,
     borderRadius: 8
   },
   alreadyUserButton: {
     backgroundColor: '#ffffffff',
     borderRadius: 8
   },
   alreadyUserButton_layout: {
     position: 'absolute',
     top: -2,
     height: 44,
     width: 138,
     right: 0
   },
   alreadyUserButtonText: {
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
   alreadyUserButtonText_box: {
     flexGrow: 1,
     flexDirection: 'row',
     alignItems: 'flex-start',
     justifyContent: 'flex-start'
   }
 });
 