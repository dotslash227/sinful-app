import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import createStore from 'App/Stores';
import { NetworkConsumer, NetworkProvider } from 'react-native-offline';

// Components
import RootScreen from './Containers/Root/RootScreen';
import OfflineScreen from './Components/Offline';

// Theme :
import { StyleProvider } from 'native-base';
import getTheme from './../native-base-theme/components';
import material from './../native-base-theme/variables/material';

const { store, persistor } = createStore();

// Disable Yellow Box:
console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return (
      /**
       * @see https://github.com/reduxjs/react-redux/blob/master/docs/api.md#provider-store
       */
      <StyleProvider style={getTheme(material)}>
        <NetworkProvider>
          <NetworkConsumer>
            {({ isConnected }) =>
              isConnected ? (
                <Provider store={store}>
                  {/**
                   * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
                   * and saved to redux.
                   * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
                   * for example `loading={<SplashScreen />}`.
                   * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
                   */}
                  <PersistGate loading={null} persistor={persistor}>
                    <RootScreen />
                  </PersistGate>
                </Provider>
              ) : (
                <OfflineScreen />
              )
            }
          </NetworkConsumer>
        </NetworkProvider>
      </StyleProvider>
    );
  }
}
