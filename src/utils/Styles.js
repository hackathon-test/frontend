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
      color: '#FEFEFE'
    },
    headerStyle: {
      paddingTop:StatusBar.currentHeight,
      backgroundColor: Global.blue,
      height: Global.titleHeight +StatusBar.currentHeight ,
      shadowColor: Global.blue,
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
      elevation: 0,
    }
  });
