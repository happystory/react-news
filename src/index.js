import React from 'react';
import ReactDOM from 'react-dom';
import PCIndex from './js/components/pc_index';
import MobileIndex from './js/components/mobile_index';

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
                        </div>
                    </HashRouter>
                </MediaQuery>
                <MediaQuery query='(max-device-width: 1224px)'>
                    <HashRouter history={hashHistory}>
                        <div>
                            <Route exact path="/" component={MobileIndex}></Route>
                            <Route path="/details/:uniquekey" component={MobileNewsDeatails}></Route>
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

