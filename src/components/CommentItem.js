import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-elements';
import {getRandomColor} from '../utils/Common'
import Global from '../utils/Global'
import {getColorByString} from '../utils/Common'
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class CommentItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLike: false,
      likeCount: 0
    };
  }

  handleLike = () => {
    this.setState((prevState) => ({
      isLike: !prevState.isLike,
      likeCount: prevState.isLike ? prevState.likeCount-1 : prevState.likeCount+1
    }));
    // 调用接口
  }

  render() {
    return (
      <View style={{margin: 5}}>
        <View style={[styles.border, {backgroundColor: getColorByString(this.props.item.nickName)}]}>
          <View style={styles.nameWrapper}>
            <Text style={[styles.name]}>
              {this.props.item.nickName}
            </Text>
            <Button
              type="clear"
              style={styles.like}
              icon={<Icon name="thumbs-up" size={20} color={this.state.isLike ? Global.blue : '#cccccc'} />}
              onPress={this.handleLike}
            />
            <Text style={styles.likeCount}>123</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', display: 'flex', overflow: 'visible', borderRadius: 5}}>
            <Text style={styles.commentText}>
              {this.props.item.text}
            </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flex: 10,
    fontSize: Global.fontSizeRegular,
    borderRadius: 5,
    marginHorizontal: 10,
    // marginTop: 10,
    color: '#348498',
  },
  commentText: {
    fontSize: Global.fontSizeSmall,
    marginHorizontal: 10,
    marginBottom: 10,
    lineHeight: 25
  },
  like: {
    flex: 1,
  },
  likeCount: {
    flex: 1,
    fontSize: Global.fontSizeSmall,
    color: Global.blue,
    marginRight: 10,
  }
})