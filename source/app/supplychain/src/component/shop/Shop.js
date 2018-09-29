import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ListView,
    ScrollView
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
import iconCopyright from '../../public/icon/copyright-24.png';
import iconCatalog from '../../public/icon/catalog.png';
import iconRate from '../../public/icon/follow_product.png';
import iconShopCategory from '../../public/icon/shop-category-24.png';

export default class Shop extends Component {

    constructor(props) {
        super(props);
        data = [
            {
                "logo": "http://freevectorlogo.net/wp-content/uploads/2012/10/vinaphone-logo-vector.png",
                "saleNumber": "4"
            },
            {
                "logo": "https://lh3.googleusercontent.com/GXRdOwOm_A-hYcQFVg_qdegTHU7tItKMZVRBPNrqeX3H7KIQMizrtoF6mX8TFQp_r14=w300",
                "saleNumber": "0"
            },
            {
                "logo": "http://newnem.com/media/logo-nemnew.jpg",
                "saleNumber": "9"
            },
            {
                "logo": "https://mir-s3-cdn-cf.behance.net/projects/404/9612659.547d80d0dc3e7.jpg",
                "saleNumber": "10"
            },
            {
                "logo": "https://shopping.pearlplaza.com.vn/pictures/PearlPlaza/customer/restaurant/king-bbq-buffet/kingbbq-logo.jpg",
                "saleNumber": "0"
            },
            {
                "logo": "http://pluspng.com/img-png/kfc-png-logo-902.png",
                "saleNumber": "100"
            },
            {
                "logo": "https://lh3.googleusercontent.com/GXRdOwOm_A-hYcQFVg_qdegTHU7tItKMZVRBPNrqeX3H7KIQMizrtoF6mX8TFQp_r14=w300",
                "saleNumber": "0"
            },
        ];
        ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data),
            selectedTab: 'shop'
        };
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

    renderSeparator(sectionID, rowID, rowSelected) {
        return (
            <View style={shopStyles.line}/>
        );
    }

    renderRow(data) {
        return (
            <View style={shopStyles.wrapRow}>

                <TouchableOpacity style={shopStyles.rowLeft}>
                    <Image source={iconRate} style={shopStyles.imgFollow}/>
                </TouchableOpacity>

                <TouchableOpacity style={shopStyles.rowRight}>
                    <Image source={{uri: data.logo}} style={shopStyles.logo}/>
                    <View style={{ marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Cửa hàng Thắng lợi</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight: 'bold'}}>Đ/C: </Text>
                            <Text>Đông Anh - Hà Nội</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Image source={iconRate} style={shopStyles.imgFollow}/>
                            <Image source={iconRate} style={shopStyles.imgFollow}/>
                            <Image source={iconRate} style={shopStyles.imgFollow}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderListView() {
        return (
            <View style={{flex:1, marginTop: 8}}>
               <View style={{flex: 1, backgroundColor: Colors.GRAY,flexDirection:'row'}}>
                    <Image source={iconShopCategory} style={{marginLeft: 10}}/>
                    <Text style={{marginLeft: 4, color: Colors.GREEN}}>
                        Danh sách cửa hàng
                    </Text>
                </View>
                <View style={{flex: 15, backgroundColor:Colors.WHITE}}>
                    <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                            renderSeparator={this.renderSeparator.bind(this)}
                            contentContainerStyle={shopStyles.containerListView}/>
                </View>
            </View>
        );
    }

    renderShopView() {
        return (
            <View style={{flex: 1, backgroundColor:Colors.GRAY}}>
                {this.renderListView()}
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