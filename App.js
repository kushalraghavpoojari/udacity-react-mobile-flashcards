import React from 'react';
import Index from './components/index'
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Index />
      </View>
    );
  }
}

