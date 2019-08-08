
import React from 'react';
import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity,
   TouchableHighlight, Button, Image, FlatList, ScrollView,KeyboardAvoidingView, } from 'react-native';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';
import * as firebase from 'firebase';
import 'firebase/firestore';
const db = firebase.firestore();


export default class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      email:'',password:''
    }
  }

  Login(){
     const {email,password} = this.state; 
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((success) => {
       const userID = firebase.auth().currentUser.uid;

        console.log('USER ID :',userID);

        this.props.navigation.navigate('Home')


    })
    .catch(function (error) {
        var Message = error.message;
        console.log(Message);
    })

  }


render(){
  return(
    <KeyboardAvoidingView  behavior='padding'>
      <ScrollView>
      <View style={{borderColor:'dodgerblue',alignItems:'center',paddingTop:100,borderRadius:20,
        height:640,display:'flex'}}>
            <View>
              <MaterialCommunityIcons name='facebook-messenger' size={140} color='dodgerblue' />
            </View>

            <View style={{color:'dodgerblue',fontSize:25,fontWeight:'bold',position:'absolute',left:17,top:40}}>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('SignUp')}} >
                <Ionicons name='ios-arrow-back' size={30} color='dodgerblue' />
              </TouchableOpacity>
            </View>
           
           

            <View style={{marginBottom:20,marginTop:100}}>
              <TextInput  placeholder='email....' value={this.state.email} onChangeText={(email) => { this.setState({email}) }}
              style={{borderRadius:30,backgroundColor:'#ececec',width:270,fontSize:15,height:38,paddingLeft:10,textAlign:'center'}} />
            </View>
            <View>
              <TextInput type='password' placeholder='password' value={this.state.password} onChangeText={(password) => { this.setState({password}) }}
              style={{borderRadius:30,backgroundColor:'#ececec',width:270,fontSize:15,height:38,paddingLeft:10,textAlign:'center'}} />
            </View>

         

            
      <TouchableOpacity style={{marginTop:30,width:'75%',}}
        onPress={()=>{  this.Login() }}
      >
                <Text style={{backgroundColor:'dodgerblue',borderRadius:6,color:'white',textAlign:'center',fontSize:17,paddingVertical:10}}>
                  Login 
                </Text>
      </TouchableOpacity>
            
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
    )
 }
}









