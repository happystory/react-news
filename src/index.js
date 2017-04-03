import React from 'react';
import ReactDOM from 'react-dom';
import PCIndex from './js/components/pc_index';
import MobileIndex from './js/components/mobile_index';
import PCUserCenter from './js/components/pc_usercenter';
import MobileUserCenter from './js/components/mobile_usercenter';

import './css/pc.styl';
import './css/mobile.styl';

import 'antd/dist/antd.css';

import MediaQuery from 'react-responsive';

import {HashRouter, hashHistory, Route} from 'react-router-dom';
import PCNewsDetails from './js/components/pc_news_details';
import MobileNewsDeatails from './js/components/mobile_news_details';



export default class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query='(min-device-width: 1224px)'>
                    <HashRouter history={hashHistory}>
                        <div>
                            <Route exact path="/" component={PCIndex}></Route>
                            <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
                            <Route path="/usercenter" component={PCUserCenter}></Route>
                        </div>
                    </HashRouter>
                </MediaQuery>
                <MediaQuery query='(max-device-width: 1224px)'>
                    <HashRouter history={hashHistory}>
                        <div>
                            <Route exact path="/" component={MobileIndex}></Route>
                            <Route path="/details/:uniquekey" component={MobileNewsDeatails}></Route>
                            <Route path="/usercenter" component={MobileUserCenter}></Route>
                        </div>
                    </HashRouter>
                </MediaQuery>
            </div>
        );
    }
}

ReactDOM.render( 
    <Root /> ,
    document.getElementById('root')
);

