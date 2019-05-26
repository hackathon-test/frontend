import React, {Component} from 'react';
import {ActivityIndicator, TouchableNativeFeedback,FlatList, StyleSheet, View, Image,Text,Dimensions} from 'react-native';
import Modal from 'react-native-modalbox';
import { Button } from 'react-native-elements';
import BriefItem from './BriefItem'
import {withNavigation} from "react-navigation";
import {get_all_lecture_histories} from "../realm/lecture_history";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Global from '../utils/Global'
const {width, height} = Dimensions.get('window');
class Brief extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      loaded: true,
      open:false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({
      history: get_all_lecture_histories(),
      loaded: true
    });
  }
  componentWillMount(){
    this._openHandlers = {
      onStartShouldSetResponder: () => true,
      onMoveShouldSetResponder: ()=> true,
      onResponderRelease: ()=>{this.refs.modal.open()},
    }
    this._closeHandlers = {
      onStartShouldSetResponder: () => true,
      onMoveShouldSetResponder: ()=> true,
      onResponderRelease: ()=>{this.refs.modal.close()
      console.log("21345678")},
    }
  }
  renderInvariant(){
    return(
      <View style={{height:10}}/>
    )
  }
  render(){
    return (
      <View style={{flex:1}}>
        <View style={{height:2,backgroundColor:'#ECECEC',width:width}}/>
        <View style={{flex:10,justifyContent:'center',backgroundColor:'#F9F9F9',alignItems:'center'}}>
            <Button
              type="clear"
              onPress={()=>this.props.navigation.navigate('Comment',{title: '马拉松比赛讲座'})}
              icon={
                <Icon
                  name="qrcode-scan"
                  size={120}
                  color={Global.blue}
                />
              }
            />
        </View>
        <Image source={require('../img/shadow.png')} style={{width:width}} />

        <View {...this._openHandlers} style={{flex:1,backgroundColor:'#E4E5E6'}}>
          <View style={styles.bottomBtn}>
            <View style={{height:5,backgroundColor:'#BEBEBE',width:50}}/>
            <Text style={{fontSize:18,marginTop:5,color:Global.blue}}>我的讲座</Text>
          </View>
        </View>

        <Modal
          style={styles.modal}  position={"bottom"} ref={"modal"}
          swipeToClose={false}
        >
          <View style={{flex:1,backgroundColor:'#FEFEFE',alignItems:'center'}}>
            <View {...this._closeHandlers}  style={{width:'100%',paddingBottom:10,height:50,alignItems:'center',backgroundColor:'#FEFEFE'}}>
              <View style={{height:5,backgroundColor:'#BEBEBE',width:50}}/>
              <Text style={{fontSize:18,marginTop:5,color:Global.blue}}>我的讲座</Text>
            </View>

            <View>
              {this.state.loaded ?
                <FlatList
                  // ItemSeparatorComponent={() => this.renderSeparator()}
                  data={this.state.history}
                  renderItem={(item, index) => <BriefItem history={item.item}/>}
                  style={styles.list}
                  ItemSeparatorComponent={()=>this.renderInvariant()}
                  keyExtractor={item => item.id + ""}
                /> : <ActivityIndicator size="large" color="#0000ff"/>
              }
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  modal: {
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    width: width * 0.99,
    height: height ,
    marginTop:-40,
    justifyContent:'center',
    padding: 10,
    backgroundColor:'white',
    elevation: 5,
  },
  list: {
    backgroundColor: "white",
  },
  bottomBtn:{
    // height:40,
    backgroundColor:'#FEFEFE',
    flex:1,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    alignItems:'center',
    paddingTop:5,
    paddingBottom:10
  }

})
export default withNavigation(Brief);