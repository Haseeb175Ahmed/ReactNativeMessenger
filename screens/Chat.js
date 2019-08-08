
import React from 'react';
import { TextInput, StyleSheet, Text, Modal, View,KeyboardAvoidingView, Alert, TouchableOpacity, TouchableHighlight, Button, Image, FlatList, ScrollView } from 'react-native';

import smile from '../assets/smile.png';
import * as firebase from 'firebase';
import {getRoomInformation,sendMessageToDb,getMessages} from '../config/firebase'
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';


export default class Chat extends React.Component {
  state = {
      back:'<--',loading:false,text:'',
      
  }


   componentDidMount(){
       console.log('Props******',this.props.friendId) //friendId is RoomId
       const myId = firebase.auth().currentUser.uid;
        this.setState({myId}) 
       this.getRoomInfo();
       this.getMessagesInChat();
   }
  
   async getMessagesInChat(){
    this.setState({loading:true})
    try{
         const messages = await getMessages(this.props.friendId); //friendId is RoomId
         console.log('ChatRoom******',messages);
         this.setState({messages})
    }
    catch(e){
      console.log('getInfo Error :',e);
    }
    finally{
      this.setState({loading:false})
    }
   }

  
   async getRoomInfo(){
       this.setState({loading:true})
      try{
           const room = await getRoomInformation(this.props.friendId); //friendId is RoomId
        //    console.log('ChatRoom******',room)
           this.setState({room})
      }
      catch(e){
        console.log('getInfo Error :',e);
      }
      finally{
        this.setState({loading:false})
      }
   } 

   sendMessage(){
       const {text} = this.state;
       const roomId = this.props.friendId;
       sendMessageToDb(text,roomId);
       this.setState({text : ''});
       this.getMessagesInChat();
   }

   backToFriends(){
       this.props.navigateToFriends()
   }

// 0324 2006341   kamran123

    render(){
        console.log('MessageRec',this.state.messages)
        return(
            <KeyboardAvoidingView  behavior='padding'>
            <ScrollView> 
            <View>
{/* ==============================================  [ CHAT HEADER ]  =============================================================== */}
                    <View style={{borderBottomWidth:2,borderBottomColor:'lightgray',display:'flex',flexDirection:'row', paddingBottom:10,paddingTop:19,alignItems:'center',justifyContent:'center',}}>                  
                        <View style={{flex:0.7,alignItems:'center'}}>
                         <TouchableOpacity onPress={() => {this.backToFriends()}}> 
                            <Text style={{color:'dodgerblue',fontSize:30}}>
                            <AntDesign name="arrowleft" size={32} color="dodgerblue" />
                            </Text>
                         </TouchableOpacity>
                        </View>
                        <View style={{flex:0.7,height:40,alignItems:'center'}}>
                            {/* <Image style={{flex:1,width:40,borderRadius:390}}
                            source={pxpic}/> */}
                            <FontAwesome    name='user-circle-o'    size={48}  />
                        </View>
                        <View style={{flex:1,height:60,justifyContent:'center'}}>
                            <Text style={{fontSize:15,fontWeight:'bold'}}>Arsalan</Text>
                        </View>
                        <View style={{flex:0.6,height:70,justifyContent:'center',alignItems:'center'}}>
                         <TouchableOpacity onPress={() => {this.props.navigation.navigate('Call')}}> 
                            <Text style={{color:'dodgerblue'}}>
                                <Ionicons name="ios-call" size={30} color="dodgerblue" />
                            </Text>
                         </TouchableOpacity>
                        </View>

                        <View style={{flex:0.6,height:70,justifyContent:'center',alignItems:'center'}}>
                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Facer')}}> 
                            <Text style={{color:'dodgerblue'}}>
                                <FontAwesome name='video-camera' size={27} color="dodgerblue" />
                            </Text>
                          </TouchableOpacity>    
                        </View>
                        <View style={{flex:0.6,height:70,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'dodgerblue'}}>
                                <Entypo name='creative-commons-attribution' size={26} color="dodgerblue"/>
                            </Text>
                        </View>
                    </View>
{/* ============================================  [ CHAT MESSAGES BODY ]  ============================================================= */}
                    <View style={{borderColor:'golden',height:80}}>



         {    /* ======================= [CHAT USER] ======================*/}
                  <View style={{display:'flex',flexDirection:'row',marginTop:10,marginBottom:15}}>
                            <View style={{height:40,alignItems:'center',marginLeft:5}}>
                               {/* <Image style={{width:40,height:40,borderRadius:390}}
                               source={pxpic}/> */}

                               <FontAwesome    name='user-circle-o'    size={40}  />
                            </View>
                            <View style={{justifyContent:'center',maxWidth:220}}>
                                <Text style={{backgroundColor:'#f3f0f0',borderRadius:15,padding:5,marginLeft:5,textAlign:'center',lineHeight:23}}>
                             Greetings
                                </Text>
                            </View>
                            <View style={{justifyContent:'center'}}>
                              <Text></Text>
                            </View>
                        </View>

      {this.state.messages && this.state.messages.map( e => {
          return(   
                e.userId === this.state.myId ?  
                  <View style={{display:'flex',flexDirection:'row',marginTop:15,justifyContent:'center',marginBottom:15}}>
                            
                    <View style={{justifyContent:'center',maxWidth:290,marginLeft:130,width:200,paddingBottom:10}}>
                      <Text style={{backgroundColor:'dodgerblue',color:'white',borderRadius:15,marginLeft:5,textAlign:'center',paddingBottom:4,paddingTop:4
                      ,marginBottom:0,lineHeight:26}}>
                          {e.text}      </Text>
                    </View>
                    <View style={{justifyContent:'center',maxWidth:220,width:20,marginRight:10,textAlign:'center'}}>
                       <View style={{textAlign:'center',marginLeft:5}}>
                           {/* <Image style={{width:15,height:15,borderRadius:390,borderWidth:1,paddingBottom:0}} source={pxpic}/> */}
                           <FontAwesome    name='user-circle-o'    size={10}  />

                       </View>
                       
                    </View>
                  </View>  :   <View style={{display:'flex',flexDirection:'row',marginTop:10,marginBottom:15}}>
                            <View style={{height:40,alignItems:'center',marginLeft:5}}>
                               {/* <Image style={{width:40,height:40,borderRadius:390}}
                               source={pxpic}/> */}
                               <FontAwesome    name='user-circle-o'    size={40}  />
                            </View>
                            <View style={{justifyContent:'center',maxWidth:220}}>
                                <Text style={{backgroundColor:'#f3f0f0',borderRadius:15,padding:5,marginLeft:5,textAlign:'center',lineHeight:23}}>
                                {e.text}  
                                </Text>
                            </View>
                            <View style={{justifyContent:'center'}}>
                              <Text></Text>
                            </View>
                        </View>
               )         
           })             
     }
                       
                        {/* ======================= [ CUURENT USER ] ======================*/}
                        {/* <View style={{display:'flex',flexDirection:'row',marginTop:15,justifyContent:'center',marginBottom:15}}>
                            
                            <View style={{justifyContent:'center',maxWidth:290,marginLeft:130,width:200,paddingBottom:10}}>
                              <Text style={{backgroundColor:'dodgerblue',color:'white',borderRadius:15,marginLeft:5,textAlign:'center',paddingBottom:4,paddingTop:4
                              ,marginBottom:0,lineHeight:26}}>
                                  Walaikum assalam brother      </Text>
                            </View>
                            <View style={{justifyContent:'center',maxWidth:220,width:20,marginRight:10,textAlign:'center'}}>
                               <View style={{textAlign:'center',marginLeft:5}}>
                                   {/* <Image style={{width:15,height:15,borderRadius:390,borderWidth:1,paddingBottom:0}} source={pxpic}/> 
                                   <FontAwesome    name='user-circle-o'    size={10}  />
                               </View>
                               
                            </View>
                            </View> */}


                    </View>  
                    

{/* ========================================================  [ CHAT FOOTER ]  =============================================================== */}

             <View style={{borderWidth:1,height:90,marginTop:369,borderColor:'dodgerblue',backgroundColor:'white'}}>
                 <View style={{height:'50%',display:'flex',flexDirection:'row'}}>
                       <View style={{flex:1,borderWidth:1,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
                           <Text>
                               <MaterialCommunityIcons name='dice-4' size={30} color='dodgerblue' />
                           </Text>
                       </View>
                       <View style={{flex:1,borderWidth:1,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
                         <TouchableOpacity onPress={() => {this.props.navigation.navigate('Facer')}}> 
                           <Text>
                               <Ionicons name='md-camera' size={30} color='dodgerblue'/>
                           </Text>
                         </TouchableOpacity>  
                       </View>
                       <View style={{flex:1,borderWidth:1,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
                           <Text>
                               <MaterialIcons name='keyboard-voice' size={32} color='dodgerblue' />
                           </Text>
                       </View>
                       <View style={{flex:1,borderWidth:1,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
                           <Text>
                               <AntDesign name='picture' size={30} color='dodgerblue'/>
                           </Text>
                       </View>
                       <View style={{flex:1,borderWidth:1,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
                           <Text>
                           <MaterialCommunityIcons name='map-marker-plus' size={30} color='dodgerblue' />
                           </Text>
                       </View>
                       <View style={{flex:1,borderWidth:1,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
                           <Text>
                           <AntDesign name='like1' size={28} color='dodgerblue'/>
                           </Text>
                       </View>
                 </View>
                 {/* ---------------   --------------- ---------------- --------------- */}

                 <View style={{height:'50%',display:'flex',flexDirection:'row'}}>
                       <View style={{flex:.5,alignItems:'center',justifyContent:'center'}}>
                           <Text>
                               <Ionicons name='ios-heart' size={30} color='#d1030d' />
                           </Text>
                       </View>
                       <View style={{flex:.5,alignItems:'center',justifyContent:'center'}}>
                               <Image style={{width:26,height:26}}  source={smile}/>
                       </View>
                       <View style={{flex:3,alignItems:'center',justifyContent:'center'}}>
                           <TextInput placeholder='Aa' value={this.state.text} onChangeText={(text) => { this.setState({text})}}
                            style={{borderRadius:30,backgroundColor:'#ececec',width:'100%',fontSize:17,height:36,paddingLeft:7}} />
                       </View>
                       <View style={{flex:0.6,alignItems:'center',justifyContent:'center'}}>
                         <TouchableOpacity 
                         onPress={()=>{  this.sendMessage() }}
                         >
                           <Text>
                               <Ionicons name='md-send' size={36} color='blue' />
                           </Text>
                         </TouchableOpacity>  
                       </View>
                  </View>
             </View>




          </View>
           </ScrollView>
          </KeyboardAvoidingView>
        )
    }
}



















































// import React from 'react';
// import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity, TouchableHighlight, Button, Image, FlatList, ScrollView } from 'react-native';
// import pxpic from '../assets/pxpic.jpg'
// import smile from '../assets/smile.png'
// import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';


// export default class Chat extends React.Component {
//   state = {
//       back:'<--'
//   }
//     render(){
//         return(
//             <View>

// {/* ==============================================  [ CHAT HEADER ]  =============================================================== */}
//                     <View style={{borderBottomWidth:2,borderBottomColor:'lightgray',display:'flex',flexDirection:'row', paddingBottom:10,paddingTop:19,alignItems:'center',justifyContent:'center',}}>                  
//                         <View style={{flex:0.7,alignItems:'center'}}>
//                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('UserList')}}> 
//                             <Text style={{color:'dodgerblue',fontSize:30}}>
//                             <AntDesign name="arrowleft" size={32} color="dodgerblue" />
//                             </Text>
//                          </TouchableOpacity>
//                         </View>
//                         <View style={{flex:0.7,height:40,alignItems:'center'}}>
//                             <Image style={{flex:1,width:40,borderRadius:390}}
//                             source={pxpic}/>
//                         </View>
//                         <View style={{flex:1,height:60,justifyContent:'center'}}>
//                             <Text style={{fontSize:15,fontWeight:'bold'}}>Arsalan</Text>
//                         </View>
//                         <View style={{flex:0.6,height:70,justifyContent:'center',alignItems:'center'}}>
//                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Call')}}> 
//                             <Text style={{color:'dodgerblue'}}>
//                                 <Ionicons name="ios-call" size={30} color="dodgerblue" />
//                             </Text>
//                          </TouchableOpacity>
//                         </View>

//                         <View style={{flex:0.6,height:70,justifyContent:'center',alignItems:'center'}}>
//                           <TouchableOpacity onPress={() => {this.props.navigation.navigate('Facer')}}> 
//                             <Text style={{color:'dodgerblue'}}>
//                                 <FontAwesome name='video-camera' size={27} color="dodgerblue" />
//                             </Text>
//                           </TouchableOpacity>    
//                         </View>
//                         <View style={{flex:0.6,height:70,justifyContent:'center',alignItems:'center'}}>
//                             <Text style={{color:'dodgerblue'}}>
//                                 <Entypo name='creative-commons-attribution' size={26} color="dodgerblue"/>
//                             </Text>
//                         </View>
//                     </View>
// {/* ============================================  [ CHAT MESSAGES BODY ]  ============================================================= */}
//                     <View style={{borderColor:'golden',height:80}}>

//                         {/* ======================= [CHAT USER] ======================*/}
//                         <View style={{display:'flex',flexDirection:'row',marginTop:10,marginBottom:15}}>
//                             <View style={{height:40,alignItems:'center',marginLeft:5}}>
//                                <Image style={{width:40,height:40,borderRadius:390}}
//                                source={pxpic}/>
//                             </View>
//                             <View style={{justifyContent:'center',maxWidth:220}}>
//                                 <Text style={{backgroundColor:'#f3f0f0',borderRadius:15,padding:5,marginLeft:5,textAlign:'center',lineHeight:23}}>
//                                   Assalam u alaikum 
//                                 </Text>
//                             </View>
//                             <View style={{justifyContent:'center'}}>
//                               <Text></Text>
//                             </View>
//                         </View>
//                         <View style={{display:'flex',flexDirection:'row',marginTop:10,marginBottom:15}}>
//                             <View style={{height:40,alignItems:'center',marginLeft:5}}>
//                                <Image style={{width:40,height:40,borderRadius:390}}
//                                source={pxpic}/>
//                             </View>
//                             <View style={{justifyContent:'center',maxWidth:220}}>
//                                 <Text style={{backgroundColor:'#f3f0f0',borderRadius:15,padding:5,marginLeft:5,textAlign:'center',lineHeight:23}}>
//                                   How are you? 
//                                 </Text>
//                             </View>
//                             <View style={{justifyContent:'center'}}>
//                               <Text></Text>
//                             </View>
//                         </View>

//                         {/* ======================= [ CUURENT USER ] ======================*/}
//                         <View style={{display:'flex',flexDirection:'row',marginTop:15,justifyContent:'center',marginBottom:15}}>
                            
//                             <View style={{justifyContent:'center',maxWidth:290,marginLeft:130,width:200,paddingBottom:10}}>
//                               <Text style={{backgroundColor:'dodgerblue',color:'white',borderRadius:15,marginLeft:5,textAlign:'center',paddingBottom:4,paddingTop:4
//                               ,marginBottom:0,lineHeight:26}}>
//                                   Walaikum assalam     </Text>
//                             </View>
//                             <View style={{justifyContent:'center',maxWidth:220,width:20,marginRight:10,textAlign:'center'}}>
//                                <View style={{textAlign:'center',marginLeft:5}}>
//                                    <Image style={{width:15,height:15,borderRadius:390,borderWidth:1,paddingBottom:0}} source={pxpic}/>
//                                </View>
                               
//                             </View>
//                         </View>
//                         <View style={{display:'flex',flexDirection:'row',marginTop:25,justifyContent:'center',marginBottom:15}}>
                            
//                             <View style={{justifyContent:'center',maxWidth:290,marginLeft:130,width:200,paddingBottom:10}}>
//                               <Text style={{backgroundColor:'dodgerblue',color:'white',borderRadius:15,marginLeft:5,textAlign:'center',paddingBottom:4,paddingTop:4
//                                ,marginBottom:0,lineHeight:26}}>
//                                   I am fine.

//                                </Text>
//                             </View>
//                             <View style={{justifyContent:'center',maxWidth:220,width:20,marginRight:10,textAlign:'center',alignItems:'flex-end'}}>
//                                <View style={{textAlign:'center',marginLeft:5}}>
//                                    <Image style={{width:15,height:15,borderRadius:390,borderWidth:1,paddingBottom:0}} source={pxpic}/>
//                                </View>
                               
//                             </View>
//                         </View>
//                         <View style={{display:'flex',flexDirection:'row',marginTop:15,justifyContent:'center',marginBottom:15}}>
                            
//                             <View style={{justifyContent:'center',maxWidth:290,marginLeft:130,width:200,paddingBottom:10}}>
//                               <Text style={{backgroundColor:'dodgerblue',color:'white',borderRadius:15,marginLeft:5,textAlign:'center',paddingBottom:4,paddingTop:4
//                                ,marginBottom:0,lineHeight:26}}>
//                                  what about you ?

//                                </Text>
//                             </View>
//                             <View style={{justifyContent:'center',maxWidth:220,width:20,marginRight:10,textAlign:'center',alignItems:'flex-end'}}>
//                                <View style={{textAlign:'center',marginLeft:5}}>
//                                    <Image style={{width:15,height:15,borderRadius:390,borderWidth:1,paddingBottom:0}} source={pxpic}/>
//                                </View>
                               
//                             </View>
//                         </View>


//                     </View>  
                    

// {/* ========================================================  [ CHAT FOOTER ]  =============================================================== */}

//              <View style={{borderWidth:1,height:90,marginTop:369,borderColor:'dodgerblue',backgroundColor:'white'}}>
//                  <View style={{height:'50%',display:'flex',flexDirection:'row'}}>
//                        <View style={{flex:1,borderWidth:1,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
//                            <Text>
//                                <MaterialCommunityIcons name='dice-4' size={30} color='dodgerblue' />
//                            </Text>
//                        </View>
//                        <View style={{flex:1,borderWidth:1,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
//                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Facer')}}> 
//                            <Text>
//                                <Ionicons name='md-camera' size={30} color='dodgerblue'/>
//                            </Text>
//                          </TouchableOpacity>  
//                        </View>
//                        <View style={{flex:1,borderWidth:1,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
//                            <Text>
//                                <MaterialIcons name='keyboard-voice' size={32} color='dodgerblue' />
//                            </Text>
//                        </View>
//                        <View style={{flex:1,borderWidth:1,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
//                            <Text>
//                                <AntDesign name='picture' size={30} color='dodgerblue'/>
//                            </Text>
//                        </View>
//                        <View style={{flex:1,borderWidth:1,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
//                            <Text>
//                            <MaterialCommunityIcons name='map-marker-plus' size={30} color='dodgerblue' />
//                            </Text>
//                        </View>
//                        <View style={{flex:1,borderWidth:1,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
//                            <Text>
//                            <AntDesign name='like1' size={28} color='dodgerblue'/>
//                            </Text>
//                        </View>
//                  </View>
//                  {/* ---------------   --------------- ---------------- --------------- */}

//                  <View style={{height:'50%',display:'flex',flexDirection:'row'}}>
//                        <View style={{flex:.5,alignItems:'center',justifyContent:'center'}}>
//                            <Text>
//                                <Ionicons name='ios-heart' size={30} color='#d1030d' />
//                            </Text>
//                        </View>
//                        <View style={{flex:.5,alignItems:'center',justifyContent:'center'}}>
//                                <Image style={{width:26,height:26}}  source={smile}/>
//                        </View>
//                        <View style={{flex:3,alignItems:'center',justifyContent:'center'}}>
//                            <TextInput placeholder='Aa'
//                             style={{borderRadius:30,backgroundColor:'#ececec',width:'100%',fontSize:17,height:36,paddingLeft:7}} />
//                        </View>
//                        <View style={{flex:0.6,alignItems:'center',justifyContent:'center'}}>
//                            <Text>
//                                <Ionicons name='md-send' size={36} color='blue' />
//                            </Text>
//                        </View>
//                   </View>
//              </View>




//           </View>
//         )
//     }
// }








