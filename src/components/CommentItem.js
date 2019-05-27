import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-elements';
import {getRandomColor} from '../utils/Common'
import Global from '../utils/Global'
import {getColorByString} from '../utils/Common'

export default class CommentItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{margin: 5}}>
        <View style={[styles.border, {backgroundColor: getColorByString(this.props.item.nickName)}]}>
          <View style={styles.nameWrapper}>
            <Text style={[styles.name]}>
              {this.props.item.nickName + '：'}
            </Text>
          </View>
          <View>
            <View style={{flex: 1, flexDirection: 'row', display: 'flex', overflow: 'visible'}}>
              <Text style={styles.commentText}>
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
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  nameWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  name: {
    fontSize: Global.fontSize,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 5,
    color: 'black',
  },
  commentText: {
    fontSize: Global.fontSizeRegular,
    marginHorizontal: 10,
    marginBottom: 5,
    
  }
})