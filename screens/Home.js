import React from 'react';
import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity, TouchableHighlight, Button, Image, FlatList, ScrollView } from 'react-native';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,Feather
    ,Octicons, MaterialIcons} from '@expo/vector-icons';



import * as firebase from 'firebase';
import {checkAndCreateRoom} from '../config/firebase'
import Chat from './Chat';
// function importing
import {getAllUsers} from '../config/firebase'

import pxpic from '../assets/pxpic.jpg'
import red from '../assets/red.jpg'
import smile from '../assets/smile.png'
import Ali from '../assets/ali.jpg'





export default class UserList  extends React.Component {
   state = {
       loading : false,
       chatPg :false,friendId:''
   } 

  async componentDidMount(){
    await  this.getUsers()
  }

  async getUsers(){
      this.setState({loading : true})
      try{
        const users = await getAllUsers();  
        console.log('usersList <======>',users)
        this.setState({users})
      }
      catch(e){
        console.log('Error : ',e)
      }
      finally{
            this.setState({loading : false})
      }
  }

  async chat(id){
    console.log('usersList <======>',id);
      const currentUser = firebase.auth().currentUser.uid;
      const room = await checkAndCreateRoom(id,currentUser);
      console.log('Room=*****',room.id);

      this.setState({friendId:room.id})
      this.setState({chatPg:true})
    
  }
  navigateToFriends(){
    this.setState({chatPg:false})
  }








    render(){
        const {users} = this.state;
        return(
        <View>
            { !this.state.chatPg ?
              <View>
{/* ==========================================  [ HEADER ]  =========================================================== */}
                   <View style={{borderBottomWidth:2,borderBottomColor:'lightgray',display:'flex',flexDirection:'row', paddingBottom:10,paddingTop:25,alignItems:'center',justifyContent:'center',}}>
                        <View style={{flex:0.6,height:40,alignItems:'center'}}>
                            {/* <Image style={{flex:1,width:40,borderRadius:390}}
                            source={redd}/> */}
                        </View>
                        <View style={{flex:1,height:60,justifyContent:'center'}}>
                            <Text style={{fontSize:25,fontWeight:'bold'}}>Chats</Text>
                        </View>
                        <View style={{flex:0.3,height:70,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{backgroundColor:'#ececec',padding:10,borderRadius:390}}>
                                <FontAwesome name='camera' size={20}  />
                            </Text>
                        </View>
                        
                        <View style={{flex:0.5,height:70,justifyContent:'center',alignItems:'center',paddingRight:5}}>
                            <Text style={{backgroundColor:'#ececec',padding:10,borderRadius:390}}>
                            <Octicons name='pencil' size={20}  />
                            </Text>
                        </View>
                        
                    
                   </View>   

{/* ========================================  [ BODY OF USER LIST ]  ====================================================== */}
                {/* <View style={{borderWidth:1}}> */}
                       {/* ================= [ SEARCH INPUT FOR USERS ]  ================= */}   
                    <View>
                        <TextInput placeholder='Search'  type='password'
                         style={{width:'90%',marginLeft:'5%',borderRadius:30,paddingLeft:19,
                        height:45,marginTop:5,marginBottom:4,backgroundColor:'#ececec',color:'red'}} />
                    </View>
                {this.state.loading && <Text style={{textAlign:'center',marginTop:20,color:'gray'}}>Loading.......</Text>}

               {/* ======================= [ ONLINE USERS HORIZONTAL BLOCK ] ========== ================= */}  
               <TouchableOpacity onPress={() => {this.props.navigation.navigate('Chat')}}> 
                    <View  style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
                        <View style={{flex:1.4,height:60,alignItems:'center'}}>
                             <Image style={{flex:1,width:60,borderRadius:390}}
                            source={smile}/>
                        </View>
                        <View style={{flex:3.5,height:70,justifyContent:'center'}}>
                            <Text style={{fontSize:16}}>Your Story</Text>
                            <Text style={{color:'gray'}}>add to your story</Text>
                        </View>
                        <View style={{flex:1,height:70,justifyContent:'center'}}>
                            <Text></Text>
                        </View>
                   </View>
                </TouchableOpacity> 
                
                   <TouchableOpacity onPress={() => {this.props.navigation.navigate('Chat')}}>
                   <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
                        <View style={{flex:1.4,height:60,alignItems:'center'}}>
                            <Image style={{flex:1,width:60,borderRadius:390}}
                            source={pxpic}/>
                        </View>
                        <View style={{flex:3.5,height:70,justifyContent:'center'}}>
                            <Text style={{fontSize:15,fontWeight:'bold'}}>Arsalan</Text>
                            <Text style={{color:'gray'}}>called you a few minutes ago</Text>
                        </View>
                        <View style={{flex:1,height:70,justifyContent:'center'}}>
                            <Text><Ionicons name="ios-call" size={20}  /></Text>
                        </View>
                   </View>
                   </TouchableOpacity> 
                   <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
                        <View style={{flex:1.4,height:60,alignItems:'center'}}>
                            <Image style={{flex:1,width:60,borderRadius:390}}
                            source={Ali}/>
                        </View>
                        <View style={{flex:3.5,height:70,justifyContent:'center'}}>
                            <Text style={{fontSize:15,fontWeight:'bold'}}> Ali Naseem</Text>
                            <Text style={{color:'gray'}}>missed your call</Text>
                        </View>
                        <View style={{flex:1,height:70,justifyContent:'center'}}>
                            <Text><Ionicons name="ios-call" size={20}  /></Text>
                        </View>
                   </View>
                {/* </View> */}

                       {/* ================= [ USERS LIST CODE ]  ================= */}  
                       
                        {users && users.map( (e,index)=>{
                          console.log('myMap===>',index)
                            return(
                                <TouchableOpacity onPress={this.chat.bind(this,e.myUid)} Key={index}>
                                <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
                                     <View style={{flex:1.4,height:60,alignItems:'center',justifyContent:'center'}}>
                
                        { !e.imgUrl ? <FontAwesome    name='user-circle-o'    size={58}  /> : <Image style={{flex:1,width:60,borderRadius:390}}
                         source={{uri: e.imgUrl}}/>
                            }      
                                     </View>
                                     <View style={{flex:3.5,height:70,justifyContent:'center'}}>
                                         <Text style={{fontSize:15,fontWeight:'bold'}} >{e.name}</Text>
                                         <Text style={{color:'gray'}}>called you a few minutes ago</Text>
                                     </View>
                                     <View style={{flex:1,height:70,justifyContent:'center'}}>
                                         <Text><Ionicons name="ios-call" size={20}  /></Text>
                                     </View>
                                </View>
                                </TouchableOpacity>
                            )
                        })}



                {/* <TouchableOpacity onPress={() => {this.props.navigation.navigate('Chat')}}> 
                   <View  style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
                        <View style={{flex:1.4,height:60,alignItems:'center'}}>
                            <Image style={{flex:1,width:60,borderRadius:390}}
                            source={smile}/>
                        </View>
                        <View style={{flex:3.5,height:70,justifyContent:'center'}}>
                            <Text style={{fontSize:16}}>Your Story</Text>
                            <Text style={{color:'gray'}}>add to your story</Text>
                        </View>
                        <View style={{flex:1,height:70,justifyContent:'center'}}>
                            <Text></Text>
                        </View>
                   </View>
                </TouchableOpacity>  */}
             
                {/* </View> */}

 {/* ==========================================  [ FOOTER OF USER LIST ]  ====================================================== */}

            

            </View>
            

           : <Chat friendId={this.state.friendId} navigateToFriends={this.navigateToFriends.bind(this)}/>
            }
        </View>
        )
    }
}









// import React from 'react';
// import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity, TouchableHighlight, Button, Image, FlatList, ScrollView } from 'react-native';
// import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,Feather
//     ,Octicons, MaterialIcons} from '@expo/vector-icons';
// import img from '../assets/icon1.jpg'
// import lake from '../assets/lake.png'
// import pxpic from '../assets/pxpic.jpg'
// import red from '../assets/red.jpg'
// import smile from '../assets/smile.png'
// import Ali from '../assets/ali.jpg'

// export default class UserList  extends React.Component {

//     render(){
//         return(
//             <View>
// {/* ==========================================  [ HEADER ]  =========================================================== */}
//                    <View style={{borderBottomWidth:2,borderBottomColor:'lightgray',display:'flex',flexDirection:'row', paddingBottom:10,paddingTop:25,alignItems:'center',justifyContent:'center',}}>
//                         <View style={{flex:0.6,height:40,alignItems:'center'}}>
//                             <Image style={{flex:1,width:40,borderRadius:390}}
//                             source={img}/>
//                         </View>
//                         <View style={{flex:1,height:60,justifyContent:'center'}}>
//                             <Text style={{fontSize:25,fontWeight:'bold'}}>Chats</Text>
//                         </View>
//                         <View style={{flex:0.3,height:70,justifyContent:'center',alignItems:'center'}}>
//                             <Text style={{backgroundColor:'#ececec',padding:10,borderRadius:390}}>
//                                 <FontAwesome name='camera' size={20}  />
//                             </Text>
//                         </View>
                        
//                         <View style={{flex:0.5,height:70,justifyContent:'center',alignItems:'center',paddingRight:5}}>
//                             <Text style={{backgroundColor:'#ececec',padding:10,borderRadius:390}}>
//                             <Octicons name='pencil' size={20}  />
//                             </Text>
//                         </View>
                        
                    
//                    </View>   

// {/* ========================================  [ BODY OF USER LIST ]  ====================================================== */}
//                 {/* <View style={{borderWidth:1}}> */}
//                        {/* ================= [ SEARCH INPUT FOR USERS ]  ================= */}   
//                     <View>
//                         <TextInput placeholder='Search' style={{width:'90%',marginLeft:'5%',borderRadius:30,paddingLeft:19,
//                         height:45,marginTop:5,marginBottom:4,backgroundColor:'#ececec',color:'red'}} />
//                     </View>

//                        {/* ================= [ USERS LIST CODE ]  ================= */}  
//                 <TouchableOpacity onPress={() => {this.props.navigation.navigate('Chat')}}> 
//                    <View  style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
//                         <View style={{flex:1.4,height:60,alignItems:'center'}}>
//                             <Image style={{flex:1,width:60,borderRadius:390}}
//                             source={smile}/>
//                         </View>
//                         <View style={{flex:3.5,height:70,justifyContent:'center'}}>
//                             <Text style={{fontSize:16}}>Your Story</Text>
//                             <Text style={{color:'gray'}}>add to your story</Text>
//                         </View>
//                         <View style={{flex:1,height:70,justifyContent:'center'}}>
//                             <Text></Text>
//                         </View>
//                    </View>
//                 </TouchableOpacity> 
//                    <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
//                         <View style={{flex:1.4,height:60,alignItems:'center'}}>
//                             <Image style={{flex:1,width:60,borderRadius:390}}
//                             source={red}/>
//                         </View>
//                         <View style={{flex:3.5,height:70,justifyContent:'center'}}>
//                             <Text style={{fontSize:15,fontWeight:'bold'}}>Haseeb</Text>
//                             <Text style={{color:'gray'}}>video call ended</Text>
//                         </View>
//                         <View style={{flex:1,height:70,justifyContent:'center'}}>
//                             <Text> <Ionicons name="ios-call" size={20}  /></Text>
//                         </View>
//                    </View>
//                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('Chat')}}>
//                    <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
//                         <View style={{flex:1.4,height:60,alignItems:'center'}}>
//                             <Image style={{flex:1,width:60,borderRadius:390}}
//                             source={pxpic}/>
//                         </View>
//                         <View style={{flex:3.5,height:70,justifyContent:'center'}}>
//                             <Text style={{fontSize:15,fontWeight:'bold'}}>Arsalan</Text>
//                             <Text style={{color:'gray'}}>called you a few minutes ago</Text>
//                         </View>
//                         <View style={{flex:1,height:70,justifyContent:'center'}}>
//                             <Text><Ionicons name="ios-call" size={20}  /></Text>
//                         </View>
//                    </View>
//                    </TouchableOpacity> 
//                    <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
//                         <View style={{flex:1.4,height:60,alignItems:'center'}}>
//                             <Image style={{flex:1,width:60,borderRadius:390}}
//                             source={Ali}/>
//                         </View>
//                         <View style={{flex:3.5,height:70,justifyContent:'center'}}>
//                             <Text style={{fontSize:15,fontWeight:'bold'}}> Ali Naseem</Text>
//                             <Text style={{color:'gray'}}>missed your call</Text>
//                         </View>
//                         <View style={{flex:1,height:70,justifyContent:'center'}}>
//                             <Text><Ionicons name="ios-call" size={20}  /></Text>
//                         </View>
//                    </View>
//                 {/* </View> */}

//  {/* ==========================================  [ FOOTER OF USER LIST ]  ====================================================== */}

//                    {/* <View style={{borderWidth:1,display:'flex',marginTop:100,position:'absolute',top:480,
//                     width:'100%',flexDirection:'row',height:60 }}>
//                           <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
//                              <Text>
//                                  <Entypo name='message' size={42} color='blue' />
//                              </Text>
//                           </View>
//                           <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
//                               <Entypo name='users' size={30} color='blue' />
//                           </View>
//                           <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
//                               <FontAwesome name='bandcamp' size={34} color='blue' />
//                           </View>
//                    </View> */}



//             </View>
//         )
//     }
// }








