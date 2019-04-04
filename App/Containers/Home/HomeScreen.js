import React from 'react'
import { Platform, Text, View, Button } from 'react-native'
import { Container, Content } from 'native-base'

// Components:
import HeaderComponent from 'App/Components/Header'
import FooterComponent from 'App/Components/Footer'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Container>
        <HeaderComponent title="Home" />
        <Content />
        <FooterComponent />
      </Container>
    )
  }
}
