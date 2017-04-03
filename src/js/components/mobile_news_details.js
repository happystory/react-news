import React from 'react';
import {Row, Col, BackTop} from 'antd';
import 'whatwg-fetch';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import CommonComments from './comment_comments';

export default class MobileNewsDeatails extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: ''
        }
    }

    componentDidMount() {
        var url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${this.props.match.params.uniquekey}`;
        var options = {
            method: 'GET'
        };
        fetch(url, options)
            .then(response => response.json())
            .then(json => {
                this.setState({newsItem: json});
                document.title = this.state.newsItem.title + ' - React News | React 驱动的新闻平台'
            });

    }

    createMarkUp() {
        return {__html: this.state.newsItem.pagecontent};
    }

    render() {
        return (
            <div id="mobileDetailsContainer">
                <MobileHeader />
                <div class="ucmobileList">
                    <Row>
                        <Col span={1}></Col>
                        <Col span={22} class="container">
                            <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkUp()}></div>
                            <hr />
                            <CommonComments uniquekey={this.props.match.params.uniquekey} />
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                </div>
                <MobileFooter />
                <BackTop />
            </div>
        );
    }
}