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

//firebase
import {
  CreateRoom,
  DeleteRoom,
  SearchRoom,
  db,
} from "../../firebase/firebase"

//this.props.route.params
/*
  roomType:"create" or "join"
*/
export default class MatchingScreen extends Component { 
  render(){
    if(!this.props.hasOwnProperty("route"))return false
    if(this.props.route.params.roomType=="create")return <CreateRoomScreen navigation={this.props.navigation}/>
    else return <JoinRoomScreen navigation={this.props.navigation}/>
  }
}

export class CreateRoomScreen extends Component {

  constructor(props){
    super(props)

    this.state = {
      roomNum:null,
      observer:null,
    }
  }

  async componentDidMount(){
    let roomNum = CreateRoom()
    let observer = db.collection("rooms").doc(roomNum).onSnapshot(docSnapshot => {
      if(docSnapshot.exists){
        if(!docSnapshot.data().isWaiting){
          //待機状態が解除されたらバトル開始
          this.state.observer()
          this.props.navigation.navigate("OnlinePlay")
        }
      }
    },err => {
      alert("error")
      console.log("error:",err)
    })
    this.setState({roomNum,observer})
  }

  componentWillUnmount(){
    if(this.state.observer!=null)this.state.observer()
    if(this.state.roomNum!=null)DeleteRoom(this.state.roomNum)
  }

  render(){
    return(
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.containerBackButton}
          onPress={() => {
            this.props.navigation.navigate("Home")
          }}
        >
          <Text style={styles.textBackButton}>＜</Text>
        </TouchableOpacity>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <Text>部屋番号は{this.state.roomNum}</Text>
        </View>
      </SafeAreaView>
    )
  }
}

export class JoinRoomScreen extends Component {

  constructor(props){
    super(props)

    let digitNum = 4
    this.state = {
      digitNum,
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
      if(num==-1){
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

    this.searchRoom()
  }

  async searchRoom(){
    let doc = await SearchRoom(this.state.callNumberList.join("")).catch((err) => console.log('Error getting document', err))
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
      if(doc.data().isWaiting){
        //待機状態なら待機状態を解除してバトル開始
        db.collection("rooms").doc(this.state.callNumberList.join("")).set({isWaiting:false})
        this.props.navigation.navigate("OnlinePlay")
      }
    }
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
        {this.renderKeyboard()}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center"
  },
  containerBackButton:{
    marginLeft:10,
    alignSelf:"flex-start",
  },
  textBackButton:{
    fontSize:20,
    fontWeight:"bold"
  },
  containerButton:{
    width:150,
    height:40,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#FFB8FB",
    borderRadius:10,
    margin:5,
  },
  textButton:{
    fontWeight:"bold",
    fontSize:16,
    color:"white"
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