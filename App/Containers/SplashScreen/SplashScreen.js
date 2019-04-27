import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './SplashScreenStyle';
import NavigationService from 'App/Services/NavigationService';

class SplashScreen extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          {/* You will probably want to insert your logo here */}
          <Text>Momos Now</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(SplashScreen);
