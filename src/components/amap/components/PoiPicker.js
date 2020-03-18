import React from 'react';

export default class PoiPicker extends React.Component {

    constructor(props) {
        super(props);
        this.loadUI();
    }

    loadUI = () => {
        const {upDateAMapCenter} = this.props;
        window.AMapUI.loadUI(['misc/PoiPicker'], (PoiPicker) => {
            let poiPicker = new PoiPicker({
                input: 'pickerInput',
            });
            poiPicker.on('poiPicked', (poiResult) => {
                upDateAMapCenter(poiResult.item.location);
            });

        });
    };

    render() {
        return null;
    }
}