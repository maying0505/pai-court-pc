import React from 'react';
import {Map} from 'react-amap';
import {inject, observer} from 'mobx-react';

import './index.css';
import {PoiPicker, LoadingMap, PositionPicker, PositionLayer, PoiPickerInput} from './components';


const AMAP_KEY = 'ab9a8aba8b7afec23beef1ae81cde4e6';
const AMAP_VERSION = '1.4.8';// '1.4.8';

@inject('pickerPosition')
@observer
export default class Amap extends React.Component {

    _onAmapClick = (event) => {
        const {upDateAMapCenter} = this.props.pickerPosition;
        upDateAMapCenter(event.lnglat);
    };

    _onAmapCreated = (instance) => {
    };

    render() {
        const {pickerPosition, amapCenter, upDatePickerPosition, upDateAMapCenter} = this.props.pickerPosition;
        const plugins = [
            'Scale',
            {
                name: 'ToolBar',
                options: {
                    visible: true,  // 不设置该属性默认就是 true
                    liteStyle: false,
                    locate: true,
                    ruler: true,
                    position: 'LT',
                    onCreated(ins) {
                    },
                },
            }
        ];
        const events = {
            created: this._onAmapCreated,
            click: this._onAmapClick
        };
        console.log('amapCenter', pickerPosition);
        return (
            <div style={{width: '70vw', height: '70vh'}}>
                <Map
                    center={amapCenter}
                    events={events}
                    useAMapUI={true}
                    plugins={plugins}
                    amapkey={AMAP_KEY}
                    loading={<LoadingMap/>}
                    version={AMAP_VERSION}
                >
                    <PositionPicker
                        upDatePickerPosition={upDatePickerPosition}
                    />
                    <PositionLayer
                        pickerPosition={pickerPosition}
                    />
                    <PoiPickerInput/>
                    <PoiPicker
                        upDateAMapCenter={upDateAMapCenter}
                    />
                </Map>
            </div>
        )
    }
}

