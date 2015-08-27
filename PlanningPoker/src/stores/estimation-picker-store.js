"use strict";

import Dispatcher          from "../dispatcher";
import Constants           from "../constants";
import StoreCommon         from "./store-common";
import _                   from 'lodash';

var pickerState = {};

// Extend Store with EventEmitter to add eventing capabilities
var EstimationPickerStore = _.assign({}, StoreCommon, {
    current() {
        return pickerState;
    }
});

function showPicker(featureId) {
    pickerState[featureId] = true;
}

function hidePicker(featureId) {
    pickerState[featureId] = false;
}

// Register callback with Dispatcher
Dispatcher.register(function (payload) {
    var action = payload.action;

    switch (action) {
        case Constants.SHOW_PICKER:
            showPicker(payload.data);
            break;

        case Constants.HIDE_PICKER:
            hidePicker(payload.data);
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    EstimationPickerStore.emitChange();

    return true;

});

export default EstimationPickerStore;