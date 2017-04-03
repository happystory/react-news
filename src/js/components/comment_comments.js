import React from 'react';
import {Row, Col} from 'antd';
import {Form, Card, Input, Button, notification} from 'antd';
const FormItem = Form.Item;

class CommonComments extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: ''
        };
    }

    componentDidMount() {
        var url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${this.props.uniquekey}`;
        var options = {
            method: 'GET'
        };
        fetch(url, options)
            .then(response => response.json())
            .then(json => {
                this.setState({comments: json});
            });

    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                // var formData = this.props.from.getFiledsValue();
                console.log(values.remark);
                var url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${localStorage.getItem('userid')}` +
                        `&uniquekey=${this.props.uniquekey}&commnet=${values.remark}`;
                var options = {
                    method: 'GET'
                };
                
                fetch(url, options)
                    .then(response => response.json())
                    .then(json => {
                        this.componentDidMount();

                    });
            }
        });
    }

    addUserCollection() {
        var options = {
            method: 'GET'
        };
        var url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${localStorage.getItem('userid')}&uniquekey=${this.props.uniquekey}`;
        fetch(url, options)
            .then(response => response.json())
            .then(json => {
                notification['success']({message: 'ReactNews提醒', description: '收藏文章成功'})
            })
            .catch(err => {
                notification['error']({message: 'ReactNews提醒', description: '请登录后收藏'});
            })
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length
        ?
        comments.map((comment, index) => (
            <Card key={index} title={comment.UserName} extra={<a href="#">发布于{comment.datetime}</a>}>
                <p>{comment.Comments}</p>
            </Card>
        ))
        :
        '没有加载到任何评论';

        return (
            <div class="comment">
            <Row>
                <Col span={24}>
                    <hr />

                    {commentList}
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem label="您的评论">
                            {getFieldDecorator('remark', {
                                rules: [],
                              })(
                                <Input type="textarea" placeholder="请输入您的评论" />
                              )}
                        </FormItem>
                        <Button type="primary" htmlType="submit">提交</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="primary" onClick={this.addUserCollection.bind(this)}>收藏</Button>
                    </Form>
                </Col>
            </Row>
            </div>
        )
    }
}

export default CommonComments = Form.create({})(CommonComments);