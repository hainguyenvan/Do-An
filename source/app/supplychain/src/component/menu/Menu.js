import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

export default class Menu extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'yellow'}}>
                <Text>Left menu</Text>
            </View>
        );
    }
}