import React from 'react';

export default class PositionPicker extends React.Component {

    constructor(props) {
        super(props);
        this.loadUI();
    }

    loadUI = () => {
        const {upDatePickerPosition} = this.props;
        window.AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {
            console.log('PositionPicker', PositionPicker);
            const map = this.props.__map__;
            let positionPicker = new PositionPicker({
                mode: 'dragMap', //dragMarker,dragMap
                map: map,
            });
            positionPicker.on('success', (positionResult) => {
                const {address, position} = positionResult;
                if (address && position.lat && position.lng) {
                    const {lat, lng} = position;
                    const obj = {
                        lat,
                        lng,
                        address,
                    };
                    upDatePickerPosition(obj);
                }
            });
            positionPicker.on('fail', (positionResult) => {
                upDatePickerPosition(null);
            });
            positionPicker.start();
        });
    };

    render() {
        return null;
    }
}
