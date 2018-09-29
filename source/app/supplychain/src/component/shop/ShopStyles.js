import React, {
    Component
} from "react";
import {
    StyleSheet,
    Dimensions
} from "react-native";
import Colors from "../../Colors";

import Constants from '../../Constants';

const {
    height,
    width
} = Dimensions.get(Constants.WINDOW);

const shopStyles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },

    // Header
    header: {
        flex: 1
    },
    headerRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerBody: {
        flex: 1,
        backgroundColor: Colors.GRAY,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
    headerLeft: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },

    // Body
    body: {
        flex: 13,
        backgroundColor: Colors.GRAY
    },

    // ListView
    line: {
        borderBottomColor: Colors.GRAY_LIGHT,
        borderBottomWidth: 1,
    },
    wrapRow: {
        height: height / 10,
        width: width,
        flexDirection: 'row'
    },
    rowLeft: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgFollow: {
        height: height / 40,
        width: width / 25
    },
    rowRight: {
        flex: 8,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        height: height / 20,
        width: width / 4
    }
});

export default shopStyles;