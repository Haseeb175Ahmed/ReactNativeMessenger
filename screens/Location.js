



import React from 'react';
import {  Dimensions, StyleSheet, Text, Modal, View, Alert,  TouchableHighlight } from 'react-native';
import * as Permissions from 'expo-permissions';

import MapView, {
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import * as Location from 'expo-location';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 24.7874134;
const LONGITUDE = 67.1298671;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class App extends React.Component {
  state = {
    marker_lat: LATITUDE,
    marker_long: LONGITUDE,
   
    list: [],

    modalVisible: false,
    coordinate: new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
    }),
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({ hasCameraPermission: status === 'granted' });

    let location = await Location.getCurrentPositionAsync({});
    console.log('location****', location)
    this.setState({ location });

    Location.watchPositionAsync({timeInterval: 1000, distanceInterval: 0.1}, loc => {
      console.log('watching***', loc);
      this.setState({ marker_long: loc.coords.longitude, marker_lat: loc.coords.latitude})
    })
  }

  renderModal() {
    return <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      transparent={true}
      visible={this.state.modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={{ margin: 50, borderWidth: 2, backgroundColor: 'white' }}>
        <View>
          <Text>Hello World!</Text>

          <TouchableHighlight
            onPress={() => {
              this.setState({ modalVisible: false })
            }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  }




  render() {
    return (
      <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={{
              latitude: this.state.marker_lat,
              longitude: this.state.marker_long
            }}
          />

        </MapView>
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