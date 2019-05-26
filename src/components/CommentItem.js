import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-elements';

export default class CommentItem extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{margin: 5}}>
        <View style={styles.border}>
          <View>
            <Text>
              {this.props.item.name}
            </Text>
          </View>

          <Divider style={{backgroundColor: 'white', height: 5}}/>

          <View style={{height: 80}}>
            <ScrollView>
              <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', display: 'flex'}}>
                <Text>
                  {this.props.item.comment}
                </Text>
              </View>
            </ScrollView>
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