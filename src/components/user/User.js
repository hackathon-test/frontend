import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';

export default class User extends Component {

  render() {
    return (
      <View>
        <Button
          title="Toggle top padding"
        />
        <Text>
          This is top text in User.
        </Text>
      </View>
    );
  }
}
