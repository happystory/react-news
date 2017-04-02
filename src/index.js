import React from 'react';
import ReactDOM from 'react-dom';
import PCIndex from './js/components/pc_index';
import MobileIndex from './js/components/mobile_index';

import './css/pc.styl';
import './css/mobile.styl';

import 'antd/dist/antd.css';

import MediaQuery from 'react-responsive';



export default class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query='(min-device-width: 1224px)'>
                    <PCIndex />
                </MediaQuery>
                <MediaQuery query='(max-device-width: 1224px)'>
                    <MobileIndex />
                </MediaQuery>
            </div>
        );
    }
}

ReactDOM.render( 
    <Root /> ,
    document.getElementById('root')
);

