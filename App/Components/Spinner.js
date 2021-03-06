import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Container, Content, Spinner } from 'native-base';

export default class SpinnerView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text } = this.props;
    return (
      <Container styles={styles.screen}>
        <Content style={styles.marginCheck}>
          <Spinner />
          <Text style={styles.text}>{text}</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  marginCheck: {
    marginTop: '50%',
  },
  screen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
  },
});
