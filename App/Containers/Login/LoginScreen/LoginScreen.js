import React from 'react'
import { Text, View } from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import { Button } from '@shoutem/ui'

export default class SplashScreen extends React.Component {
  goToOTPScreen() {
    NavigationService.navigate('LoginOTPScreen')
  }

  render() {
    return (
      <View>
        <Text>Login Screen</Text>
        <Button styleName="secondary" onPress={() => this.goToOTPScreen()}>
          <Text>CHECK IN HERE</Text>
        </Button>
      </View>
    )
  }
}
