import React, {Component} from 'react';
import {ActivityIndicator, TextInput,FlatList, StyleSheet, View, Image,Text,Dimensions} from 'react-native';
import { Button } from 'react-native-elements';
import Styles from '../utils/Styles'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Global from '../utils/Global'
export default class Comment extends Component {
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;
    return {

      title:  params ? params.title : '未命名的讲座',
      headerTitleStyle: Styles.title,
      headerStyle: Styles.headerStyle,
      headerBackTitle:(<View></View>),
      headerLeft: (
        <View style={styles.backBtn}>
          <Button
            style={{borderRadius:20}}
            type="clear"
            icon={<Icon name="arrow-left" size={20} color="white"/>}
            onPress={() => {
              navigation.navigate('Home')
            }}
          />
        </View>
      ),
      headerRight: (
        <View style={styles.backBtn}></View>
      )
    }
  };
  constructor(props) {
    super(props);

    this.state = {
      comment: [],
      nickname:'',
      myComment:'',
      loaded: false,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    let comment = [{id:123456,title:'关于环境治理问题'},{id:1256,title:'关于环境治理问题'}]
    this.setState({
      comment: comment,
    });
  }
  setNickname(name) {
    this.setState({
      nickname: name,
    })
  }
  setMyComment(myComment) {
    this.setState({
      myComment: myComment,
    })
  }
  render(){
    return (
      <View style={{flex:1,justifyContent:'flex-end'}}>
        <View style ={{flex:1}}>

          <View style={{flex:1,backgroundColor:'blue',justifyContent:'center',alignItems:'center'}}>
              <Image source={require('../img/camera.png')}/>
          </View>
        </View>
        <View style ={{minHeight:80,backgroundColor:'red'}}>
          <View style={{flexDirection:'row',backgroundColor:'#123456',flex:1,alignItems:'center',}}>
            <Text style={{color:'white',fontSize:18}}>昵称</Text>
            <TextInput onChangeText={()=>this.setNickname()} value={this.state.nickname} style={{
              textAlign: 'center',
              fontSize: 16,
              color: 'white',
              backgroundColor:'gray',
              borderRadius: 18,
              height: 30,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 10,
              paddingRight: 10,
              textAlignVertical: 'center',
              lineHeight: 24
            }} maxLength={6} placeholder={'输入评论昵称'}/>
          </View>
          <View style ={{flex:1,backgroundColor:'white'}}>
            <TextInput
              multiline={true}
              style={styles.inputTextStyle}
              placeholder='在此输入评论内容'
              // underlineColorAndroid={Global.blue}
              onChangeText={()=>this.setMyComment}
              value={this.state.myComment}
            />
          </View>
        </View>
      </View>
    )
  }
}
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  modal: {
    width: width * 0.99,
    height: width * 1.5,
    padding: 10,
    backgroundColor:'white'

  },
  list: {

    backgroundColor: "#F5FCFF"
  },
  inputTextStyle: {
    // padding: 0,
    // paddingBottom: 10,
    // paddingLeft: 5,
    // marginTop: 7,
    // fontSize: 17,
    // marginLeft: 8,
  },
})
