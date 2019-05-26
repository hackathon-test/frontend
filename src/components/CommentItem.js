import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-elements';
import {getRandomColor} from '../utils/Common'
import Global from '../utils/Global'

export default class CommentItem extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{margin: 5}}>
        <View style={styles.border}>
          <View style={styles.nameWrapper}>
            <Text style={styles.name}>
              {this.props.item.nickName}
            </Text>
          </View>
          <View>
            <View style={{flex: 1, flexDirection: 'row', display: 'flex', overflow: 'visible'}}>
              <Text numberOfLines={200} >
                {this.props.item.text}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}


let styles = StyleSheet.create({
  border: {
    borderStyle: 'dotted',
    borderWidth: 2,
    borderColor: "white",
  }

})