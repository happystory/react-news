import React from 'react';
import 'whatwg-fetch';
import {Row, Col} from 'antd';
import { Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import logo from '../../images/logo.png';
import {Link, HashRouter} from 'react-router-dom';

class PCHeader extends React.Component {
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

    componentWillMount() {
        console.log(localStorage.userid)
        if (localStorage.userid) {
            this.setState({
                hasLogined: true,
                userNickName: localStorage.getItem('userNickName'),
                userid: localStorage.getItem('userid')
            });
        }
    }

    setModalVisible(value) {
        this.setState({modalVisible: value});
    }

    handleClick(e) {
        if (e.key === 'register') {
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
                // console.log(url);
                // 
                var options = {
                    method: 'GET'
                };


                fetch(url, options)
                    .then(response => response.json())
                    .then(json => {
                        this.setState({userNickName: json.NickUserName, userid: json.UserId});

                        localStorage.setItem('userid', json.UserId);
                        localStorage.setItem('userNickName', json.NickUserName);

                        if (this.state.action === 'login') {
                            this.setState({hasLogined: true});
                        }

                        message.success('请求成功');
                        this.setModalVisible(false);
                    });
            }
        });
    }

    logout() {
        localStorage.removeItem('userid');
        localStorage.removeItem('userNickName');
        this.setState({hasLogined: false});
        console.log(this.state.hasLogined)
    }

    callback(key) {
        if (key === '1') {
            this.setState({action: 'login'});
        } else if (key === '2') {
            this.setState({action: 'register'});
        }
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined
            ?
            <Menu.Item key="logout" class="logout">
                <Button type="primary" htmlType="button">
                    {this.state.userNickName}
                </Button>
                &nbsp;&nbsp;
                <HashRouter>
                    <Link target="_blank" to="/" style={{display: 'inline'}}>
                    <Button type="dashed" htmlType="button">
                        个人中心
                    </Button>
                </Link>
                </HashRouter>
                
                &nbsp;&nbsp;
                <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>
                    退出
                </Button>
            </Menu.Item>
            :
             <Menu.Item key="register" class="register">
                <Icon type="appstore" />注册/登录
             </Menu.Item>   
            ;
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" class="logo">
                            <img src={logo} alt="logo" />
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
                            <Menu.Item key="top"><Icon type="appstore" />头条</Menu.Item>
                            <Menu.Item key="shehui"><Icon type="appstore" />社会</Menu.Item>
                            <Menu.Item key="guonei"><Icon type="appstore" />国内</Menu.Item>
                            <Menu.Item key="guoji"><Icon type="appstore" />国际</Menu.Item>
                            <Menu.Item key="yule"><Icon type="appstore" />娱乐</Menu.Item>
                            <Menu.Item key="tiyu"><Icon type="appstore" />体育</Menu.Item>
                            <Menu.Item key="keji"><Icon type="appstore" />科技</Menu.Item>
                            <Menu.Item key="shishang"><Icon type="appstore" />时尚</Menu.Item>
                            {userShow}
                        </Menu>


                    {/* 弹出层 */}
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
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    }
}

export default PCHeader = Form.create({})(PCHeader);