import React,{ Component } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native"

export default class HomeScreen extends Component {
  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.containerButton}
          onPress={() => this.props.navigation.navigate("Single")}
        >
          <Text style={styles.textButton}>single</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.containerButton,{backgroundColor:"#805C7E"}]}
          onPress={() => this.props.navigation.navigate("Online")}
        >
          <Text style={styles.textButton}>online</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
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