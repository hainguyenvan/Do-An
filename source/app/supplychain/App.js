import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import Main from "./src/Main";
import Constants from "./src/Constants";

const App = StackNavigator(
  {
    Main: { screen: Main }
  },
  {
    /*initialRouteName: Constants.HOME,*/
    initialRouteName: Constants.MAIN_SCREEN,
    headerMode: "none"
  }
);

export default App;