import React from 'react';
import {StyleSheet,StatusBar} from 'react-native';
import Global from "../utils/Global"

export default StyleSheet.create(
  {
    title: {
      alignSelf:'center',
      textAlign: 'center',
      flex: 1,
      fontSize: Global.fontSize,
      color: Global.blue
    },
    headerStyle: {
      paddingTop:StatusBar.currentHeight,
      backgroundColor: '#F9F9F9',
      height: Global.titleHeight +StatusBar.currentHeight ,
      elevation: 0,
    }
  });
