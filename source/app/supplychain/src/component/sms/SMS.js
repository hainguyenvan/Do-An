import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';


export default class SMS extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{backgroundColor: 'red', flex: 1}}>
                <Text>SMS Component</Text>
            </View>
        );
    }
}