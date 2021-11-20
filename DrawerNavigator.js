import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import LogOut from "../screens/LogOut";
import firebase from "firebase";
import CustomSideBarMenu from "../screens/CustomSideBarMenu"
const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {

constructor(props){
  super(props)
    this.state={
      light_theme:true,

    }
}


  render(){
    let props = this.props
    return (
      <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor:"#E91E63",
        inactiveTintColor:this.state.light_theme ? "black":"white",
        itemStyle:{marginVertical:5}
      }}
      drawerContent ={(props)=>{
        <CustomSideBarMenu{...props}/>
      }}

      
      >
        <Drawer.Screen name="Home" component={StackNavigator} options={{unmountOnBlur:true}} />
        <Drawer.Screen name="Profile" component={Profile}  options={{unmountOnBlur:true}} />
        <Drawer.Screen name= "logOut" component={LogOut}  options={{unmountOnBlur:true}}/>
      </Drawer.Navigator>
    );
  }
  componentDidMount() {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function(snapshot) {
        theme = snapshot.val().current_theme;
      });
    this.setState({ light_theme: theme === "light" ? true : false });
  }

  
};


