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
import shopStyles from './ShopStyles';

import iconShop from '../../public/icon/shop-24.png';
import iconShopSelected from '../../public/icon/shop-selected-24.png';
import iconScan from '../../public/icon/scan-24.png';
import iconScanSelected from '../../public/icon/scan-selected-24.png';
import iconSMS from '../../public/icon/sms-24.png';
import iconSMSSelected from '../../public/icon/sms-selected-24.png';
import iconAdd from '../../public/icon/add-24.png';
import iconAddSelected from '../../public/icon/add-selected-24.png';
import iconMenu from '../../public/icon/menu-24.png';
import iconMenuRight from '../../public/icon/menu-right-24.png';

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

    renderHeader() {
        return (
            <View style={{flex:1, flexDirection: 'row'}}>

                <View style={shopStyles.headerRight}>
                    <TouchableOpacity onPress={this.openMenu.bind(this)}>
                        <Image source={iconMenu}/>
                    </TouchableOpacity>
                </View>

                <View style={{ flex:7}}>
                    <TouchableOpacity style={shopStyles.headerBody}>
                        <Text>Tìm kiếm</Text>
                    </TouchableOpacity>
                </View>

                <View style={shopStyles.headerRight}>
                    <TouchableOpacity>
                        <Image source={iconMenuRight}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
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
            <View style={shopStyles.fullScreen}>
                {/* Header */}
                <View style={shopStyles.header}>
                    {this.renderHeader()}
                </View>

                {/* Content */}
                <View style={shopStyles.body}>
                    {this.renderTabNavigator()}
                </View>
            </View>
        );
    }
}