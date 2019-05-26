/**
 * 首页药品简介中的单个简介项
 */
import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, Platform, TouchableNativeFeedback, View, Dimensions} from 'react-native';
import {withNavigation} from 'react-navigation';
import Global from "../utils/Global"
import Swipeout from "react-native-swipeout";

const {width} = Dimensions.get('window');
class BriefItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rightBtns = [{text: '删除',backgroundColor: "#D06651"}];
    return (
      <Swipeout right={rightBtns}>
        <View onPress={() => this.props.navigation.navigate('Detail')}>
          <View style={styles.container}>
            <Text>{this.props.history.id}</Text>
            <Text>{this.props.history.title}</Text>
          </View>
        </View>
      </Swipeout>
    )
  };
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F5FCFF",
    paddingLeft:width*0.06,
    paddingRight:width*0.045,
    paddingBottom:8,
    paddingTop:8,
  },
  imageContainer:{
    flex: 2,
  },
  middleContainer: {

    flex: 6,
  },
  timeContainer:{
    flexDirection:'row',
    justifyContent:'flex-end',
    flex:2, alignSelf:'center',
    textAlign: 'center',
  },
  title: {
    fontSize: Global.fontSize-2,
    color:'#304167'
  },
  tag:{

  },
  badgeStyle:{
    height: 24,
    borderRadius:12,
    marginRight:5,
    paddingLeft:3,
    paddingRight:3,
    marginBottom:3
  },
  textStyle:{
    fontSize:Global.fontSize-5,
    textAlignVertical:'center',
  },
  dosage: {
    fontSize:Global.fontSize-4,
    color:'#8B909A',
    fontWeight:'100',
    marginBottom: 4,
    marginTop: 4,
  },
  picture: {
    borderRadius:width*0.08,
    width: width*0.16,
    height: width*0.16,
  }
});


export default withNavigation(BriefItem);