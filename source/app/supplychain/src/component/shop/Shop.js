import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

import SMS from '../sms/SMS';
import Scan from '../scan/Scan';
import Add from '../add/Add';

import Colors from '../../Colors';

import iconShop from '../../public/icon/shop-24.png';
import iconShopSelected from '../../public/icon/shop-selected-24.png';
import iconScan from '../../public/icon/scan-24.png';
import iconScanSelected from '../../public/icon/scan-selected-24.png';
import iconSMS from '../../public/icon/sms-24.png';
import iconSMSSelected from '../../public/icon/sms-selected-24.png';
import iconAdd from '../../public/icon/add-24.png';
import iconAddSelected from '../../public/icon/add-selected-24.png';

export default class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'shop'
        }
    }

    openMenu() {
        const {open} = this.props;
        open();
    }

    renderShopView() {
        return (
            <View style={{backgroundColor: 'yellow', flex: 1}}>
                <Text>Shop Component</Text>
            </View>
        );
    }

    renderTabNavigator() {
        const {navigate} = this.props;
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'shop'}
                    title="Shop"
                    badgeText="1"
                    renderIcon={() => <Image source={iconShop}/>}
                    renderSelectedIcon={() => <Image source={iconShopSelected}/>}
                    onPress={() => this.setState({selectedTab: 'shop'})}>
                    {this.renderShopView()}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'scan'}
                    title="Scan"
                    renderIcon={() => <Image source={iconScan}/>}
                    renderSelectedIcon={() => <Image source={iconScanSelected}/>}
                    onPress={() => this.setState({selectedTab: 'scan'})}>
                    <Scan/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'sms'}
                    title="SMS"
                    renderIcon={() => <Image source={iconSMS}/>}
                    renderSelectedIcon={() => <Image source={iconSMSSelected}/>}
                    onPress={() => this.setState({selectedTab: 'sms'})}>
                    <SMS/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'add'}
                    title="Add"
                    renderIcon={() => <Image source={iconAdd}/>}
                    renderSelectedIcon={() => <Image source={iconAddSelected}/>}
                    onPress={() => this.setState({selectedTab: 'add'})}>
                    <Add/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'red'}}>
                <TouchableOpacity onPress={this.openMenu.bind(this)}>
                    <Text>Open menu</Text>
                </TouchableOpacity>
                {this.renderTabNavigator()}
            </View>
        );
    }
}