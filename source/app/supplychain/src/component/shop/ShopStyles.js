import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Colors from "../../Colors";

const shopStyles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor:Colors.WHITE
    },

    // Header
    header: {
        flex:1
    },
    headerRight: {
        flex:1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    headerBody:{
        flex: 1, 
        backgroundColor: Colors.GRAY, 
        marginLeft:10, 
        marginRight: 10,
        marginBottom: 5, 
        marginTop:5,
        alignItems:'center', 
        justifyContent: 'center',
        borderRadius: 4
    },
    headerLeft: {
        flex:1, 
        justifyContent: "center", 
        alignItems:'center'
    },

    // Body
    body: {
        flex: 13,
        backgroundColor: Colors.GRAY
    }
});

export default shopStyles;
