import React from 'react';

export default class PoiPickerInput extends React.Component {
    render() {
        return (
            <div className='picker-box' id='pickerBox'>
                <input className='picker-input' id='pickerInput' placeholder="输入关键字选取地点"/>
            </div>
        )
    }
}