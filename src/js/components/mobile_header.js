import React from 'react';
import {Row, Col} from 'antd';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import logo from '../../images/logo.png';

export default class MobileHeader extends React.Component {

    render() {
        return (
            <div id="mobileheader">
                <header>
                    <img src={logo} alt="logo" />
                    <span>ReactNews</span>
                </header>
            </div>
        );
    }
}