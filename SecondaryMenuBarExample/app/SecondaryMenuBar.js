import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ListView,
  Dimensions,
  Image,
  View
} from 'react-native';
var {height, width, scale, fontScale} = Dimensions.get('window');
//设定内置的属性
//选中项，例如：_type_0_2 表示第一个Tab选中，并且第二个Tab中的第三项选中
var prefixType = '_type_';

//选中项样式，例如：_style_0_2 表示第一个Tab选中，并且第二个Tab中的第三项选中时的样式
var prefixStyle = '_style_';

//默认左侧选中的背景颜色
var defaultBackgroundColor = {backgroundColor:'#fff'};

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var data1 = {
    leftData: [
      {name: '出发口岸', selected: true},
      {name: '游轮名称', selected: false},
      {name: '途经国家', selected: false},
      {name: '行程天数', selected: false},
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

var rightData = null
export default class SecondaryMenuBar extends Component {
  constructor(props) {
    super(props);
    // defaultData = this.props.data
    // var newObject = JSON.parse(JSON.stringify(oldObject));
    this.defaultData = JSON.parse(JSON.stringify(this.props.data));
    this.leftIndex = 0;
    this.rightData = this.defaultData.rightData[0];
    this.click = this.props.click?this.props.click:null;
    this.state = {
      leftData : this.defaultData.leftData,
      rightData: this.defaultData.rightData[0],
    }
  }

  clear() {
    // this.defaultData = defaultData;
    this.setState({
      leftData : this.props.data.leftData,
      rightData: this.props.data.rightData[0],
    })
  }
  selectedLeft(rowId) {
    this.defaultData.leftData.forEach((item,index, arr)=>{
      if (rowId == index) {
        item.selected = true
      }else {
        item.selected = false
      }
    })
    this.leftIndex = rowId;
    this.rightData = this.defaultData.rightData[rowId];
    this.setState({
      leftData: this.defaultData.leftData,
      rightData:this.rightData
    })
  }

  selectedRight(rowId) {
    var j = 0;
    console.log(this.leftIndex);
    this.rightData.forEach((item,index,arr)=>{
      if (rowId == 0) {
        if (index ==0) {
          this.defaultData.leftData[this.leftIndex].selectedPoint = false
          item.selected = true
        }else {
          // this.defaultData.leftData[this.leftIndex].selectedPoint = true
          item.selected = false
        }
      }else {
        if (rowId==index&&rowId!=0) {
          this.defaultData.leftData[this.leftIndex].selectedPoint = true
          item.selected = !item.selected
        }else {
          if (index == 0) {
            item.selected = false
          }
        }
      }
      if (!item.selected) {
        j++
      }
      if (j==this.rightData.length) {
        this.defaultData.leftData[this.leftIndex].selectedPoint = false
        this.rightData[0].selected = true
      }
    })
    this.setState({
      leftData: this.defaultData.leftData,
      rightData:this.rightData
    })
    {this.click(this.rightData[rowId].name)}
  }
  renderLeftRow(rowData,sectionId,rowId) {
    return(
      <TouchableOpacity onPress={this.selectedLeft.bind(this,rowId)}>
        <View style={[styles.left_row,{backgroundColor: rowData.selected? 'white': '#E4E0FE'}]}>
          <Text>{rowData.name}
          </Text>
          <View style={{marginLeft: 10, width:6, height: 6, borderRadius: 3, backgroundColor: rowData.selectedPoint?'black':null}}>
          </View>
        </View>
      </TouchableOpacity>

    )
  }
  renderRightRow(rowData,sectionId,rowId) {
    return(
      <View style={[styles.right_row,{}]}>
        <TouchableOpacity style={{flex: 1, justifyContent: 'center', }} onPress={this.selectedRight.bind(this,rowId)}>
          <View style={{marginLeft: 15 ,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 15,}}>
            <Text>{rowData.name}
            </Text>
            {rowData.selected?<Image source={require('./images/icon_select.png')} style={{width: 15, height: 15}}/>:null}
          </View>
        </TouchableOpacity>
      </View>

    )
  }

  render() {
    return(
      <View style={styles.container}>

        <View style={styles.leftView}>
          <ListView
             dataSource={ds.cloneWithRows(this.state.leftData)}
             renderRow={this.renderLeftRow.bind(this)}
             contentContainerStyle={[styles.listView, {flexDirection: 'column'}]}
             enableEmptySections={true}
             initialListSize={50}
             removeClippedSubviews={false}
             style={{flex:1}}
           />

        </View>
        <View style={styles.rightView}>
          <ListView
             dataSource={ds.cloneWithRows(this.state.rightData)}
             renderRow={this.renderRightRow.bind(this)}
             contentContainerStyle={[styles.listView, {flexDirection: 'column'}]}
             enableEmptySections={true}
             initialListSize={50}
             removeClippedSubviews={false}
             style={{flex:1}}
           />
        </View>
      </View>
    )
  }
}


var styles = StyleSheet.create({
  container:{
    height:240,
    flex:1,
    flexDirection: 'row',
    borderTopWidth:1,
    // borderBottomWidth:1,
    borderColor:'#ddd'
  },
  leftView: {
    flex: 1,
    backgroundColor: '#E4E0FE'
  },
  left_row: {
    height: parseInt((height/3-30)/4),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightView: {
    flex: 3,
    // backgroundColor: 'green'
  },
  right_row: {
    height: 30,
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 1,
    borderColor:'lightgrey',
    justifyContent: 'center'
  },
  flex_1:{
    flex:1
  },
  header:{
    height:35,
    borderBottomWidth:1,
    borderColor:'#DFDFDF',
    backgroundColor:'#F5F5F5'
  },
  header_text:{
    color:'#7B7B7B',
    fontSize:15
  },
  center:{
    justifyContent:'center',
    alignItems:'center'
  },
  left_pannel:{
    backgroundColor:'#E4E0FE',
  },

  right_pannel:{
    marginLeft:10
  },
  active_blue:{
    color: '#00B7EB'
  },
  active_fff:{
    backgroundColor:'#fff'
  }
});
