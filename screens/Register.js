

import React from 'react';
import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity,
   TouchableHighlight, Button, Image, FlatList, ScrollView,KeyboardAvoidingView, } from 'react-native';

import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';
import {createUsers} from '../config/firebase'
import * as Facebook from 'expo-facebook';
const id = '373380275509';
import * as firebase from 'firebase';
import 'firebase/firestore';
const db = firebase.firestore();


export default class SignUp extends React.Component {
  constructor(){
    super();
    this.state = {
      name:'',email:'',password:''
    }
  }

  async createUser(){
    var name = this.state.name
    var email = this.state.email;
    var password = this.state.password
    console.log('one===>',name,email,password)
     await createUsers(name,email,password);
     this.props.navigation.navigate('Login1')
  }

    
  login_facebook = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync(id, {
        permissions: ['public_profile','email','user_friends'],
      });

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`);
        // alert('Logged in!', `Hi ${(await response.json()).name}!`);
        const userObj = await response.json();
        console.log('json Obj ====>',userObj)

        var name = userObj.name;
        var password = userObj.id;
        var email  = userObj.email;
        var imgUrl = userObj.picture.data.url;

        var facebook_User = {
          name,
          password,
          email,
          imgUrl
        }
        console.log('crObj===>',facebook_User)

        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        // Sign in with credential from the Facebook user.
         firebase.auth().signInWithCredential(credential);
            db.collection('USERS').add(facebook_User).then(() =>{
                  alert('Account creation is successful');
                
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("Error",errorMessage,errorCode);
            });

        this.props.navigation.navigate('UserList')

      } else {
        // type === 'cancel'
        console.log('cancel Error ====>');
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }

   }


  login(){
    this.props.navigation.navigate('Login')
  }
 

        render(){
            return(
            <KeyboardAvoidingView  behavior='padding'>
              <ScrollView>
              <View style={{borderColor:'dodgerblue',alignItems:'center',paddingTop:20,borderRadius:20,
                height:640,display:'flex'}}>
                    <View>
                      <MaterialCommunityIcons name='facebook-messenger' size={140} color='dodgerblue' />
                    </View>
                   
                    <View style={{marginTop:50,marginBottom:20}}>
                      <TextInput placeholder='Enter Name' value={this.state.name} onChangeText={(name) => { this.setState({name}) }}
                       style={{borderRadius:30,backgroundColor:'#ececec',width:270,fontSize:15,height:38,paddingLeft:10}} />
                    </View>
                    <View style={{marginBottom:20}}>
                      <TextInput  placeholder='Enter Email' value={this.state.email} onChangeText={(email) => { this.setState({email}) }}
                      style={{borderRadius:30,backgroundColor:'#ececec',width:270,fontSize:15,height:38,paddingLeft:10}} />
                    </View>
                    <View>
                      <TextInput  type='password' placeholder='Enter Password' value={this.state.password} onChangeText={(password) => { this.setState({password}) }}
                      style={{borderRadius:30,backgroundColor:'#ececec',width:270,fontSize:15,height:38,paddingLeft:10}} />
                    </View>

                    <View style={{marginTop:20,borderRadius:10}}>
                        <Button title='Registere Here' onPress={this.createUser.bind(this)} style={{width:270,fontSize:30}}/>
                    </View>

                    
              <TouchableOpacity style={{marginTop:30,width:'75%',}}
                 onPress={() => {this.props.navigation.navigate('Login')}  }
              >
                        <Text style={{backgroundColor:'dodgerblue',borderRadius:6,color:'white',textAlign:'center',fontSize:17,paddingVertical:10}}>
                          Login 
                        </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginTop:15,width:'75%',}}
                onPress={()=>{  this.login_facebook() }}
              >
                        <Text style={{backgroundColor:'#0c5091fa',borderRadius:6,color:'white',textAlign:'center',fontSize:17,paddingVertical:10}}>
                          Login with Facebook
                        </Text>
              </TouchableOpacity>
                    
              </View>
              </ScrollView>
            </KeyboardAvoidingView>
            )
        }
}







































// import React from "react"
// import { register } from "../config/firebase"
// import { View, TextInput, Button, Text, TouchableOpacity } from "react-native"

// class Login extends React.Component {
//     constructor() {
//         super();
//         this.state = {

//         }
//     }

//     async register() {
//         const { email, password, username } = this.state;
//         console.log(email, password, username)
//         try {
//             const reg = await register(email, password, username)
//             console.log(reg)
//             this.props.navigation.navigate("Login");
//         }
//         catch (e) {
//             alert(e.message)
//         }
//     }

//     render() {
//         return (
//             <View>

//                 <View>
//                 <Text>Email:</Text><TextInput onChangeText={text => this.setState({ email: text })} />
//                 <Text>Username:</Text><TextInput onChangeText={(e) => this.setState({ username: e })} />
//                 <Text>Password:</Text><TextInput onChangeText={(e) => this.setState({ password: e })} />
//                 <Button title="Register" onPress={() => this.register()} />
//                 <TouchableOpacity onPress={() => {
//                     this.props.navigation.navigate("Login")
//                 }}><Text>Already have an account? click here to login</Text></TouchableOpacity>
//             </View>
//             </View>
//         )
//     }
// }

// export default Login