import React from 'react';
import {Row, Col} from 'antd';
import 'whatwg-fetch';
import {HashRouter, Route, Link, browerHistory} from 'react-router-dom';

export default class MobileList extends React.Component {
    constructor() {
        super();
        this.state = {
            news: ''
        };
    }

    componentWillMount() {
        var url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.type}&count=${this.props.count}`;
        var options = {
            method: 'GET'
        };
        fetch(url, options)
            .then(response => response.json())
            .then(json => this.setState({news: json}));
    }

    render() {
        const {news} = this.state;
        const newsList = news.length
        ?
        news.map((newsItem, index) => (
            <section key={index} class="m_article list-item special_section clearfix">
                <HashRouter>
                    <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                        <div class="m_article_img">
                            <img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
                        </div>
                        <div class="m_article_info">
                            <div class="m_article_title">
                                <span>{newsItem.title}</span>
                            </div>
                            <div class="m_article_desc clearfix">
                                <div class="m_article_desc_l">
                                    <span class="m_article_channel">
                                        {newsItem.realType}
                                    </span>
                                    <span class="m_article_time">
                                        {newsItem.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </HashRouter>
            </section>
        ))
        :
        '没有加载到任何新闻';

        return (
            <div>
                <Row>
                    <Col span={24}>
                        {newsList}
                    </Col>
                </Row>
            </div>
        );
    }
}