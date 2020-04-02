import React,{ Component } from 'react';

//screens
import HomeScreen from "./screens/home/HomeScreen"
import SinglePlayScreen from "./screens/single/SinglePlayScreen"
import SelectOnlineTypeScreen from "./screens/online/SelectOnlineTypeScreen"
import SelectRoomTypeScreen from "./screens/online/SelectRoomTypeScreen"
import {
  CreateRoomScreen,
  JoinRoomScreen,
} from "./screens/online/MatchingScreen"
import OnlinePlayScreen from "./screens/online/OnlinePlayScreen"

//reactnavigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabBar({state,descriptors, navigation}){return false}

export default class App extends Component {
  render(){
    console.disableYellowBox = true;
    return(
      <NavigationContainer>
        <Stack.Navigator
          headerMode="none"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Single" component={SinglePlayScreen} />
          <Stack.Screen name="Online" component={SelectOnlineTypeScreen} />
          <Stack.Screen name="SelectRoomType" component={SelectRoomTypeScreen} />
          <Stack.Screen name="CreateRoom" component={CreateRoomScreen}/>
          <Stack.Screen name="JoinRoom" component={JoinRoomScreen}/>
          <Stack.Screen name="OnlinePlay" component={OnlinePlayScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}