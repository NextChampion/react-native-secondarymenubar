/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PixelRatio,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modalbox';
import SecondaryMenuBar from './app/SecondaryMenuBar'
var {height, width, scale, fontScale} = Dimensions.get('window');
var data1 = {
    leftData: [
      {name: '出发口岸', selected: true,selectedPoint: false},
      {name: '游轮名称', selected: false,selectedPoint: false},
      {name: '途经国家', selected: false,selectedPoint: false},
      {name: '行程天数', selected: false,selectedPoint: false},
    ],
    rightData: [
      [
        {name:"不限",selected:true},
        {name:"天津",selected:false},
        {name:"青岛",selected:false},
        {name:"大连",selected:false},
        {name:"上海",selected:false},
        {name:"厦门",selected:false},
        {name:"广州",selected:false},
      ],
      [
        {name:"不限",selected:true},
        {name:"歌诗达大西洋号邮轮",selected:false},
        {name:"海洋量子号",selected:false},
        {name:"海洋赞礼号",selected:false},
        {name:"海洋神话号",selected:false},
        {name:"黄金公主号",selected:false},
        {name:"海洋水手号",selected:false},
        {name:"红宝石公主号",selected:false},
        {name:"海洋航行者号",selected:false},
        {name:"MSC 抒情号",selected:false},
        {name:"星梦邮轮 云顶梦号",selected:false},
        {name:"歌诗达幸运号",selected:false},
        {name:"盛世公主号",selected:false},
      ],
      [
        {name:"不限",selected:true},
        {name:"韩国",selected:false},
        {name:"日本+韩国",selected:false},
        {name:"日本",selected:false},
        {name:"越南",selected:false},
        {name:"迪拜+阿曼",selected:false},
        {name:"新加坡",selected:false},
        {name:"美国",selected:false},
        {name:"美国+加拿大",selected:false},
     ],
     [
       {name:"不限",selected:true},
       {name:"1-3天",selected:false},
       {name:"4-6天",selected:false},
       {name:"7-9天",selected:false},
       {name:"10-11天",selected:false},
       {name:"12-16天",selected:false},
       {name:"17-33天",selected:false},
       {name:"33天以上",selected:false},
     ]
    ]
};
export default class SecondaryMenuBarDemo extends Component {

  click(a) {
    // alert(a)
    console.log(a);
  }
  clear(a) {
    console.log("清空");
    this.refs.SMB.clear()
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <TouchableOpacity onPress={()=>this.refs.modal.open()}>
            <View style={styles.btn}>
              <Text>
                点击弹出modal
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        </View>

        <Modal style={styles.modal2}  ref={'modal'} position={'bottom'} >
          <View style={styles.modelHeader} >
              <TouchableOpacity style={styles.modelHeaderBtn} onPress={() => this.refs.modal.close()}>
                <View style={styles.modelHeaderBtn}>
                  <Text style={[styles.text,{fontSize: 14}]}>取消</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modelHeaderBtn} onPress={this.clear.bind(this)}>
                <View style={[styles.modelHeaderBtn,{borderWidth: 1, borderColor: 'gray', borderRadius: 10, padding: 2}]}>
                  <Text style={[styles.text,{fontSize: 12}]}>清空筛选</Text>
                </View>
              </TouchableOpacity>


              <TouchableOpacity style={styles.modelHeaderBtn} onPress={() => this.refs.modal.close()}>
                <View style={styles.modelHeaderBtn}>
                  <Text style={[styles.text,{fontSize: 14}]}>确定</Text>
                </View>
              </TouchableOpacity>

            </View>
            <SecondaryMenuBar data={data1} click={this.click.bind(this)} ref={'SMB'}/>

        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  btn: {
    width: 200,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey'
  },
  modal3: {
    height: height/2.5,
  },
  modal1: {
    height: 300
  },
  modal2: {
    height: height/3,
  },
  modelHeader: {
    height: 30,
    width: width,
    backgroundColor: '#A191FE',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  modelHeaderBtn: {
    paddingLeft: 15 / PixelRatio.get(),
    paddingRight: 15 / PixelRatio.get(),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelContent: {
    flex: 1,
    paddingLeft: 15 / PixelRatio.get(),
    paddingRight: 15 / PixelRatio.get(),
  },
});

AppRegistry.registerComponent('SecondaryMenuBar', () => SecondaryMenuBarDemo);
