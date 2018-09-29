import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Colors from "./Colors";

const mainStyles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  line: {
    borderBottomColor: Colors.GRAY_LIGHT,
    borderBottomWidth: 1,
    paddingTop: 10
  },
  fontWeight: {
    fontWeight: "bold"
  },
  txtRed: {
    color: Colors.RED
  },
  txtBlack: {
    color: Colors.BLACK
  },
  txtSkyBlue: {
    color: Colors.SKY_BLUE
  },
  txtWhite: {
    color: Colors.WHITE
  },
  txtGrayLight: {
    color: Colors.GRAY_LIGHT
  },
  txtBlue: {
    color: Colors.BLUE
  }
});

export default mainStyles;
