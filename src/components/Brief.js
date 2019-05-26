import React, {Component} from 'react';
import {ActivityIndicator, TouchableNativeFeedback,FlatList, StyleSheet, View, Image,Text,Dimensions} from 'react-native';
import Modal from 'react-native-modalbox';
import BriefItem from './BriefItem'
import {withNavigation} from "react-navigation";
import {get_all_lecture_histories} from "../realm/lecture_history";

class Brief extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({
      history: get_all_lecture_histories(),
    });
  }
  componentWillMount(){
    this._gestureHandlers = {
      onStartShouldSetResponder: () => true,
      onMoveShouldSetResponder: ()=> true,
      onResponderMove: ()=>{console.log(123)},
      onResponderRelease: ()=>{this.refs.modal.open()},
    }
  }
  render(){
    return (
      <View style={{flex:1}}>
        <View style={{flex:8,backgroundColor:'blue',justifyContent:'center',alignItems:'center'}}>
          <TouchableNativeFeedback onPress={()=>this.props.navigation.navigate('Comment',{title: '马拉松比赛讲座'})}>
            <Image source={require('../img/camera.png')}/>
          </TouchableNativeFeedback>
        </View>
        <View  {...this._gestureHandlers}
          style={{flex:1}}>
          <View style={{height:210,backgroundColor:'red',borderRadius:100}}>
            <Text style={{textAlign:'center'}}>我的讲座</Text>
          </View>
        </View>
        <Modal
          style={[styles.modal]} position={"bottom"} ref={"modal"}
          swipeToClose={true}
        >
          <View style={{flex:1}}>
            <View><Text>我的讲座</Text></View>
            <View style={{flex:1}}>
              <FlatList
                // ItemSeparatorComponent={() => this.renderSeparator()}
                data={this.state.history}
                renderItem={(item, index) => <BriefItem history={item.item}/>}
                style={styles.list}
                keyExtractor={item => item.id + ""}
              />
            </View>
          </View>
        </Modal>
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
})
export default withNavigation(Brief);