import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Drawer from 'react-native-drawer';

import Shop from './component/shop/Shop';
import Menu from './component/menu/Menu';

export default class Main extends Component {

    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open();
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Drawer
                openDrawerOffset={0.3}
                tapToClose={true}
                ref={(ref) => this._drawer = ref}
                content={<Menu navigate={navigate}/>}>
                <Shop open={this.openControlPanel.bind(this)} navigate={navigate}/>
            </Drawer>
        );
    }
}