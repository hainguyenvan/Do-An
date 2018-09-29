// import React, {Component} from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity
// } from 'react-native';

// import Constants from './Constants';
// import styles from './MainStyle';
// import Menu from './component/menu/Menu';
// import Shop from './component/shop/Shop';
// import Drawer from 'react-native-drawer'

// export default class Main extends Component {

//     closeControlPanel = () => {
//         this.drawer.close()
//     };
    
//     openControlPanel = () => {
//         this.drawer.open()
//     };

//     render() {
//         const {navigate} = this.props.navigation;
//         return (
//             <View>
//                 <Drawer
//                     openDrawerOffset={0.3}
//                     tapToClose={true}
//                     ref={(ref) => this.drawer = ref}
//                     content={<Menu navigate={navigate}/>}>
//                     <Shop open={this.openControlPanel.bind(this)} navigate={navigate}/>
//                 </Drawer>
//             </View>
//         )
//             ;
//     }
// }



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