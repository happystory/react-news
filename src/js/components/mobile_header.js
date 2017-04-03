import React from 'react';
import { Menu, Icon, Tabs, message, Form, Input, Button, Modal} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import logo from '../../images/logo.png';
import {Link, HashRouter} from 'react-router-dom';

class MobileHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: ''
        };
    }

    setModalVisible(value) {
        this.setState({modalVisible: value});
    }

    handleClick(e) {
        if (e.key = 'register') {
            this.setState({current: 'register'});
            this.setModalVisible(true);
        } else {
            this.setState({current: e.key});
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values);
                var url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${this.state.action}` + 
                `&userName=${values.userName}&password=${values.password}` +
                `&r_userName=${values.r_userName}&r_password=${values.r_password}&r_confirmPassword=${values.r_confirmPassword}`;
                // 
                var options = {
                    method: 'GET'
                };


                fetch(url, options)
                    .then(response => response.json())
                    .then(json => {
                        this.setState({userNickName: json.NickUserName, userid: json.UserId});

                        if (this.state.action === 'login') {
                            this.setState({hasLogined: true});
                        }

                        message.success('请求成功');
                        this.setModalVisible(false);
                    });
            }
        });
    }

    callback(key) {
        if (key === '1') {
            this.setState({action: 'login'});
        } else if (key === '2') {
            this.setState({action: 'register'});
        }
    }

    login() {
        this.setModalVisible(true);
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined ?
            <HashRouter>
                <Link target="_blank" to="/">
                    <Icon type="inbox" />
                </Link>
            </HashRouter>
            :
            <Icon type="setting" onClick={this.login.bind(this)} />;

        return (
            <div id="mobileheader">
                <header>
                        <a href="/">
                            <img src={logo} alt="logo" />
                        </a>
                    <span>ReactNews</span>
                    {userShow}
                </header>

                <Modal 
                    title="用户中心"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalVisible}
                    onCancel={()=>this.setModalVisible(false)}
                    onOk={()=>this.setModalVisible(false)}
                    okText="关闭">
                    <Tabs type="card" onChange={this.callback.bind(this)}>
                        <TabPane tab="登录" key="1">
                            <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem>
                                  {getFieldDecorator('userName', {
                                    rules: [{ required: false, message: 'Please input your username!' }],
                                  })(
                                    <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
                                  )}
                                </FormItem>
                                <FormItem>
                                  {getFieldDecorator('password', {
                                    rules: [{ required: false, message: 'Please input your Password!' }],
                                  })(
                                    <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
                                  )}
                                </FormItem>
                                <Button type="primary" htmlType="submit">登录</Button>
                            </Form>
                        </TabPane>


                        <TabPane tab="注册" key="2">
                            <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem>
                                  {getFieldDecorator('r_userName', {
                                    rules: [{ required: false, message: 'Please input your username!' }],
                                  })(
                                    <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
                                  )}
                                </FormItem>
                                <FormItem>
                                  {getFieldDecorator('r_password', {
                                    rules: [{ required: false, message: 'Please input your Password!' }],
                                  })(
                                    <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
                                  )}
                                </FormItem>
                                <FormItem>
                                  {getFieldDecorator('r_confirmPassword', {
                                    rules: [{ required: false, message: 'Please input your Password!' }],
                                  })(
                                    <Input prefix={<Icon type="lock" />} type="password" placeholder="请再次输入密码" />
                                  )}
                                </FormItem>
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        );
    }
}

export default MobileHeader = Form.create({})(MobileHeader);