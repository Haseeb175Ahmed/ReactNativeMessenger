import React from 'react';
import { TextInput, Dimensions, StyleSheet, Text, Modal, View, Alert, TouchableOpacity, TouchableHighlight, Button, Image, FlatList, ScrollView } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={{backgroundColor: 'whitesmoke', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        
        <Button title="Logout" onPress={() => {this.props.navigation.navigate('Login')}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});




// import React from 'react';
// import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity, TouchableHighlight, Button, Image, FlatList, ScrollView } from 'react-native';
// import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';
// // import Voice from 'react-native-voice';
// import {Speech} from 'expo'



// export default class Call extends React.Component{
// constructor(props){
//  super(props)
//  this.state = {
//      say : 'Zeeshan is very good And Naeem is Good'
//  }
// }

// onSpeake =  () => {
//     console.log('**wer');
//    Speech.speak(this.state.say,{
//        language:'en',
//        pitch:1,
//        rate:1
//    })
// }





//     render(){
//         return(
//             <View>
//                 <Text>Noor ul huda</Text>
//                 <Text>Noor ul huda</Text>
//                 <Text>Noor ul huda</Text>
//                 <View style={{borderWidth:1,borderColor:'dodgerblue',alignItems:'center',paddingTop:80, height:600,display:'flex'}}>
//                       <View style={{flex:1,borderWidth:1,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
//                         <TouchableOpacity onPress={()=>{ this.onSpeake() } }>
//                            <Text>
//                                <MaterialIcons name='keyboard-voice' size={32} color='dodgerblue' />
//                            </Text>
//                         </TouchableOpacity> 
//                        </View>
//                 </View>
//             </View>
//             )
//     }
// }
