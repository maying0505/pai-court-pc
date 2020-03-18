import {observable, action} from 'mobx';
import { address } from 'ip';

class PickerPosition {
    @observable
    pickerPosition = null;

    @observable
    amapCenter = 0;

    @action upDatePickerPosition = position => {
        this.pickerPosition = position;
    };

    @action upDateAMapCenter = obj => {
        this.amapCenter = obj;
    };
}

export default new PickerPosition();