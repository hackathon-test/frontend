import React, {Component} from 'react';
import {ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modalbox';
import {Button} from 'react-native-elements';
import BriefItem from './BriefItem'
import {withNavigation} from "react-navigation";
import {delete_lecture_history, get_all_lecture_histories} from "../realm/lecture_history";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Global from '../utils/Global'

const {width, height} = Dimensions.get('window');
class Brief extends Component {
  constructor(props) {
    super(props);

    this.state = {
      histories: [],
      loaded: true,
      open:false
    };
  }

  deleteLectureByItem(deletedId) {
    let nowHistories = []
    for (let i = 0; i < this.state.histories.length; i++) {
      const curHistory = this.state.histories[i]
      if (curHistory.id !== deletedId) {
        nowHistories.push(curHistory)
      }

      this.setState({
        histories: nowHistories
      })
    }

    // 删除本地缓存
    delete_lecture_history(deletedId)
  }

  componentWillMount(){
    this._openHandlers = {
      onStartShouldSetResponder: () => true,
      onMoveShouldSetResponder: ()=> true,
      onResponderRelease: ()=>{
        this.refs.modal.open()
        this.setState({
          open:true,
          loaded: true,
        });

        // 重新获取我的讲座
        let cur_all_lectures = get_all_lecture_histories()
        this.setState({
          histories: cur_all_lectures,
          loaded: false,
        })
      },
    }
    this._closeHandlers = {
      onStartShouldSetResponder: () => true,
      onMoveShouldSetResponder: ()=> true,
      onResponderGrant: () => {
        console.log("22222")},
      onResponderRelease: ()=>{this.refs.modal.close()
        this,this.setState({
          open:false
        })
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
            onPress={()=>this.props.navigation.navigate('ScanQR')}
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


          <View {...this._openHandlers} style={{flex: 1, backgroundColor: '#E4E5E6'}}>
            {this.state.open ?
              <View/>
              :
              <View style={styles.bottomBtn}>
                <View style={{height: 5, backgroundColor: '#BEBEBE', width: 50}}/>
                <Text style={{fontSize: 18, marginTop: 5, color: Global.blue}}>我的讲座</Text>
              </View>
            }
          </View>

        <Modal
          style={styles.modal}  position={"bottom"} ref={"modal"}
          swipeToClose={false}
        >
          <View style={{flex:1,backgroundColor:'#FEFEFE',alignItems:'center'}}>
            <View {...this._closeHandlers}  style={{width:'100%',marginTop:-20,paddingTop:30,paddingBottom:10,height:80,alignItems:'center'}}>
              <View style={{height:5,backgroundColor:'#BEBEBE',width:50}}/>
              <Text style={{height:50,textAlignVertical:'center',textAlign:'center', width:width,fontSize:18,marginTop:-10,paddingTop:0,color:Global.blue}}>我的讲座</Text>
            </View>

            <View>
              {this.state.loaded ?
                <ActivityIndicator size="large" color="#0000ff"/>
                :
                <FlatList
                  // ItemSeparatorComponent={() => this.renderSeparator()}
                  data={this.state.histories}
                  renderItem={(item, index) => <BriefItem history={item.item} delete={(id) => this.deleteLectureByItem(id)}/>}
                  style={styles.list}
                  ItemSeparatorComponent={() => this.renderInvariant()}
                  keyExtractor={item => item.id + ""}
                />
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
    width: width,
    height:height*0.75,
    paddingBottom:70,
    justifyContent:'center',
    paddingRight:10,
    paddingLeft:10,
    backgroundColor:'white',
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