import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Root } from "native-base";
import AppNavigator from './src/routing';
import store from './src/store';

export default class App extends Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </Root>
    );
  }
}
