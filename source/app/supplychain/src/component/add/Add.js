import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';


export default class Add extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{backgroundColor: 'red', flex: 1}}>
                <Text>Add Component</Text>
            </View>
        );
    }
}