import React,{ Component } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native"

export default class SelectOnlineTypeScreen extends Component {
  render(){
    return(
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.containerBackButton}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.textBackButton}>＜</Text>
        </TouchableOpacity>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <TouchableOpacity
            style={[styles.containerButton,{backgroundColor:"#BFFFA1"}]}
            onPress={() => alert("準備中")}
          >
            <Text style={styles.textButton}>online</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.containerButton,{backgroundColor:"#5F8050"}]}
            onPress={() => this.props.navigation.navigate("SelectRoomType")}
          >
            <Text style={styles.textButton}>friend</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
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
  }
})