import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Container, Content, Spinner, Icon } from 'native-base';
import { material } from 'react-native-typography';

export default class OfflineScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          textAlign: 'center',
        }}
      >
        <Icon name="wifi-off" style={{ color: '#999', fontSize: 40 }} type="Feather" />
        <Text style={material.display1}>No Internet</Text>
        <Text style={[material.subheading, { textAlign: 'center' }]}>
          You seem to be offline. Please check your connection.
        </Text>
      </View>
    );
  }
}
