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
              {this.props.item.name}
            </Text>
          </View>
          <View>
            <View style={{flex: 1, flexDirection: 'row', display: 'flex', overflow: 'visible'}}>
              <Text numberOfLines={200} >
                {this.props.item.comment}
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
    borderColor: "grey",
    marginBottom: 10,
  },
  nameWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  name: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: 'rgba(124,184,221,0.4)',
    fontSize: Global.fontSizeRegular,
  }
})