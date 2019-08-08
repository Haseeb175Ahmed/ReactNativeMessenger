import React from 'react';
import { TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity, TouchableHighlight, Button, Image, FlatList, ScrollView } from 'react-native';
import * as Permissions from 'expo-permissions';

import { Camera } from 'expo-camera';
import { Ionicons,AntDesign,FontAwesome,Entypo,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';


export default class kamera extends React.Component {
  state = {
    hasCameraPermission: null,
    list: [],
    type: Camera.Constants.Type.back,
    camDetectVisible: true,quizeStartBtn:false,
     
  };
   


  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async capture() {
    const photo = await this.camera.takePictureAsync();
    console.log('photo *********', photo);
    this.setState({photo: photo.uri})
//     detectFaces = async (photo) => {
//       const options = { mode: FaceDetector.Constants.Mode.fast };
//       const faceObj  =  await FaceDetector.detectFacesAsync(photo, options);
//       // console.log('faceObj *********', faceObj.faces.length);
//       if(faceObj.faces.length === 1){
//          this.setState({quizeStartBtn:true})
//       }

//     };
//     detectFaces(photo.uri);
  }
  render(){
    // console.log('photoRender *********', this.state.photo);
      return (
        <View style={{borderColor:'dodgerblue',alignItems:'center',borderRadius:20,
                height:640,display:'flex'}}>

           <Camera  ref={ref => { this.camera = ref; }} style={{ flex: 1,width:'100%', }}  type={this.state.type}>
             <View  style={{ borderColor:'yellow',height:'100%' }}>
                <TouchableOpacity  onPress={() => {this.props.navigation.navigate('Chat')}}
                                  style={{  borderColor:'dodgerblue' }}>
                 <Text style={{ fontSize: 18, color: 'white',marginTop:30,marginLeft:2 }}>
                      <Entypo name='arrow-bold-left' size={40} color='white'/>
                 </Text>
                </TouchableOpacity>

<View style={{borderColor:'white',display:'flex',flexDirection:'row',marginTop:470}}>
               <TouchableOpacity  style={{flex:1,borderColor:'red',alignItems:'center',justifyContent:'center',marginTop:10}}
                  onPress={() => { this.setState({
                     type:
                       this.state.type === Camera.Constants.Type.back
                         ? Camera.Constants.Type.front
                         : Camera.Constants.Type.back,
                    });
                  }}>
                 <Text style={{ fontSize: 14, marginBottom: 10, color: 'white' }}>
                    <Ionicons name='ios-reverse-camera' size={50} color='white'/>
                 </Text>
               </TouchableOpacity>


              <TouchableOpacity  style={{flex:2,borderColor:'dodgerblue',marginLeft:14,paddingLeft:40,paddingTop:25}}
              
                onPress={() => this.capture()}>
                  {/* <Image source={{uri: 'http://expertizo.pk/cowmandii/img/logo.png'}}  style={{width: 100, height: 100}} /> */}
                  <MaterialCommunityIcons name='circle-slice-8' size={50} color='white' style={{width: 100, height: 100}} />
              </TouchableOpacity>
</View>
            </View>

          </Camera>   

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
// import { Text, View, TouchableOpacity } from 'react-native';
// import * as Permissions from 'expo-permissions';
// import { Camera } from 'expo-camera';

// export default class CameraExample extends React.Component {
//   constructor(){
//     super();
 
//   this.state = {
//     hasCameraPermission: null,
//     type: Camera.Constants.Type.back,
//   };
//  }
//   async componentDidMount() {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({ hasCameraPermission: status === 'granted' });
//   }

//   render() {
//     const { hasCameraPermission } = this.state;
//     if (hasCameraPermission === null) {
//       return <View />;
//     } else if (hasCameraPermission === false) {
//       return <Text>No access to camera</Text>;
//     } else {
//       return (
//         <View style={{ flex: 1 }}>
//           <Camera style={{ flex: 1 }} type={this.state.type}>
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: 'transparent',
//                 flexDirection: 'row',
//               }}>
//               <TouchableOpacity
//                 style={{
//                   flex: 0.1,
//                   alignSelf: 'flex-end',
//                   alignItems: 'center',
//                 }}
//                 onPress={() => {
//                   this.setState({
//                     type:
//                       this.state.type === Camera.Constants.Type.back
//                         ? Camera.Constants.Type.front
//                         : Camera.Constants.Type.back,
//                   });
//                 }}>
//                 <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
//               </TouchableOpacity>
//             </View>
//           </Camera>
//         </View>
//       );
//     }
//   }
// }