import React,{ Component } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native"
const {width,height} = Dimensions.get("window")

export default class OnlinePlayScreen extends Component {

  constructor(props){
    super(props)

    var numbers = [0,1,2,3,4,5,6,7,8,9];
    var a = numbers.length;
    
    //シャッフルアルゴリズム
    while (a) {
        var j = Math.floor( Math.random() * a );
        var t = numbers[--a];
        numbers[a] = numbers[j];
        numbers[j] = t;
    }
    let digitNum = 3
    this.state = {
      digitNum,
      numberList:numbers.slice(0,digitNum), //cpuの設定ナンバー
      callNumberList:new Array(digitNum).fill(-1), //ユーザーがコールするナンバー
      history:[], //historyObjの配列 historyObj => {callNumberList:Array,eatBite:Array}
    }
  }

  renderCards(){
    return(
      this.state.callNumberList.map((n,i) => 
        <View style={styles.containerCard} key={String(i)}>
          <Text>{n==-1?"":n}</Text>
        </View>
      )
    )
  }

  onPressKey(input){
    if(input=="call"){
      this.onPressCallKey()
    } else if(input=="←"){
      this.onPressDeleteKey()
    }else{
      this.onPressNumberKey(Number(input))
    }
  }

  onPressNumberKey(number){
    let callNumberList = this.state.callNumberList.slice();
    for(let i=0;i<callNumberList.length;i++){
      let num = callNumberList[i]
      if(num==-1 || num==number){
        callNumberList[i] = number
        break;
      }
    }

    this.setState({callNumberList})
  }

  onPressDeleteKey(){
    let callNumberList = this.state.callNumberList.slice();
    for(let i=callNumberList.length-1;i>=0;i--){
      let num = callNumberList[i]
      if(num!=-1){
        callNumberList[i] = -1
        break;
      }
    }

    this.setState({callNumberList})
  }

  onPressCallKey(){
    if(this.state.callNumberList.indexOf(-1)>=0)return

    this.call()
  }

  call(){

    let eatBiteList = this.calculateEatBite()
    let history = this.state.history.slice()
    history.push({
      callNumberList:this.state.callNumberList,
      eatBite:eatBiteList
    })

    this.setState({
      callNumberList:new Array(this.state.digitNum).fill(-1),
      history,
    })
  }

  calculateEatBite(){
    let settingNumberList = this.state.numberList.slice()
    let callNumberList = this.state.callNumberList.slice()
    let eatBiteList = [0,0]

    for(let cIndex=0;cIndex<callNumberList.length;cIndex++){
      for(let sIndex=0;sIndex<settingNumberList.length;sIndex++){
        let callNum = callNumberList[cIndex]
        let settingNum = settingNumberList[sIndex]
        if(callNum==settingNum){
          if(cIndex==sIndex)eatBiteList[0]++
          else eatBiteList[1]++
        }
      }
    }

    console.log(eatBiteList)

    return eatBiteList

  }

  renderHistory(){
    let cellHeight = 30
    let turnWidth = cellHeight
    let eatBiteWidth = 100
    return(
      <View style={{flex:1,width,alignItems:"center",justifyContent:"center"}}>
        <View style={{width:"90%",height:"90%",borderWidth:1}}>
          <View style={{height:cellHeight,width:"100%",flexDirection:"row",borderBottomWidth:1}}>
            <View style={{width:turnWidth}}/>
            <View style={{flex:1,height:cellHeight,justifyContent:"center",alignItems:"center"}}>
              <Text>NUMBER</Text>
            </View>
            <View style={{width:eatBiteWidth,height:cellHeight,justifyContent:"center",alignItems:"center"}}>
              <Text>EAT-BITE</Text>
            </View>
          </View>
          <ScrollView style={{flex:1}}>
            {this.state.history.map((hObj,i) => 
              <View style={{height:cellHeight,width:"100%",flexDirection:"row",borderBottomWidth:1}}>
                <View style={{height:cellHeight,width:turnWidth,justifyContent:"center",alignItems:"center"}}>
                  <Text>{i+1}</Text>
                </View>
                <View style={{height:cellHeight,flex:1,justifyContent:"center",alignItems:"center"}}>
                  <Text>{hObj.callNumberList.join("   ")}</Text>
                </View>
                <View style={{height:cellHeight,width:eatBiteWidth,justifyContent:"center",alignItems:"center"}}>
                  <Text>{hObj.eatBite.join(" - ")}</Text>
                </View>
              </View>  
            )}
          </ScrollView>
        </View>
      </View>
    )
  }

  renderKeyboard(){
    let keyList = ["7","8","9","4","5","6","1","2","3","call","0","←"]
    let kHeight = 200
    let kWidth = 300
    let borderWidth = 0.5
    return(
      <View style={{borderWidth:borderWidth/2}}>
        <View style={{height:kHeight,width:kWidth,flexWrap:"wrap",flexDirection:"row"}}>
          {keyList.map(k => 
            <TouchableOpacity
              key={k}
              style={{height:kHeight/4,width:kWidth/3,justifyContent:"center",alignItems:"center",borderWidth:borderWidth/2}}
              onPress={() => this.onPressKey(k)}
            >
              <Text>{k}</Text>
            </TouchableOpacity>  
          )}
        </View>
      </View>
      
    )
  }

  render(){
    console.log(this.state.numberList)
    return(
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.containerBackButton}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Text style={styles.textBackButton}>＜</Text>
        </TouchableOpacity>
        <View style={styles.containerCardList}>
          {this.renderCards()}
        </View>
        {this.renderHistory()}
        {this.renderKeyboard()}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
  },
  containerBackButton:{
    marginLeft:10,
    alignSelf:"flex-start",
  },
  textBackButton:{
    fontSize:20,
    fontWeight:"bold"
  },
  containerCardList:{
    flexDirection:"row"
  },
  containerCard:{
    width:80,
    height:120,
    borderRadius:10,
    backgroundColor:"white",
    justifyContent:"center",
    alignItems:"center",
    shadowColor: "#ccc",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
    elevation: 2,
    margin:5
  },
})