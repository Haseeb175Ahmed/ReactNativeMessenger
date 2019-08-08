import React from 'react';
import { TextInput, Dimensions, StyleSheet, Text, Modal, View, Alert, TouchableOpacity, TouchableHighlight, Button, Image, FlatList, ScrollView } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={{backgroundColor: 'dodgerblue', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> Massenger Clone
        </Text>

        {/* <Button title="Sign Up" onPress={() => {this.props.navigation.navigate('Home')}}/> */}
            <Button title="Login" onPress={() => {this.props.navigation.navigate('Login1')}}/>
             <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("Register")
            }}><Text>Dont have an account? click here to register</Text></TouchableOpacity>
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







