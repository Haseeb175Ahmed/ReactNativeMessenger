import React from 'react';
import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity, TouchableHighlight, Button, Image, FlatList, ScrollView } from 'react-native';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';


export default class Call extends React.Component {

    render(){
        return(
            <View style={{backgroundColor:'#1b3650fa',paddingTop:50}}>
                <View style={{paddingLeft:20}}>
                  <TouchableOpacity  onPress={() => {this.props.navigation.navigate('Chat')}}>
                    <AntDesign name='arrowleft' size={32} color='dodgerblue' />
                  </TouchableOpacity>
                </View>

                <View style={{borderColor:'dodgerblue',alignItems:'center',paddingTop:30, height:600,display:'flex'}}>
                    <View>
                      <AntDesign name='phone' size={120} color='dodgerblue' />
                    </View>

                    <View style={{paddingTop:30,paddingBottom:120}}>
                      <Text style={{color:'white',fontSize:28}}>Arsalan</Text>
                    </View>

                    <View>
                      <Text style={{color:'dodgerblue',fontSize:20,fontWeight:'bold',paddingLeft:20}} >Calling.......... </Text>
                    </View>

                    <View style={{display:'flex',position:'absolute',top:490,
                    width:'100%',flexDirection:'row'}}>
                          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                             <Text>
                                <FontAwesome name='video-camera' size={27} color="white" />
                             </Text>
                          </View>
                          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                              <TouchableOpacity  onPress={() => {this.props.navigation.navigate('Chat')}}>
                                <FontAwesome name='bandcamp' size={34} color='red' />
                              </TouchableOpacity>
                          </View>
                   </View>
                </View>
           </View>    
        )
    }
}