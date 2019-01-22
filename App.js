/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './src/components/common';
import LoginForm from './src/components/LoginForm';

class App extends Component {

  state = { loggedIn: null };
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAN-oMJjbSBFAB5rVf4H65f7ErLa5_RD8E',
      authDomain: 'authentication-454f4.firebaseapp.com',
      databaseURL: 'https://authentication-454f4.firebaseio.com',
      projectId: 'authentication-454f4',
      storageBucket: 'authentication-454f4.appspot.com',
      messagingSenderId: '753150946397'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      }else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>
                Log Out
              </Button>
            </CardSection>
          </Card>
        );
      case false:
      return <LoginForm />;
      default:
        return <Spinner size="large" />;
    } 
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}
export default App;
