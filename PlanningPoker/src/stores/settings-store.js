"use strict";

import Dispatcher     from "../dispatcher";
import Constants      from "../constants";
import StoreCommon    from "./store-common";
import _              from "lodash";

var _settings = {};

function loadSettings(defaultSettings) {
    defaultSettings = defaultSettings || {};

    var bestValue = function (settingsProp, paramsProp, defaultProp) {
        return defaultSettings[settingsProp] || defaultProp;
    };

    _settings = {
        apiUrl: bestValue('apiUrl', '/')
    };
}

// Extend Message Store with EventEmitter to add eventing capabilities
var SettingsStore = _.assign({}, StoreCommon, {
    // Return current messages
    current(){
        return _settings;
    }
});

// Register callback with Dispatcher
Dispatcher.register(function (payload) {
    switch (payload.action) {
        // Respond to TIMEOUT action
        case Constants.SETTINGS_LOAD:
            loadSettings(payload.data);
            break;
        default:
            return true;
    }

    // If action was responded to, emit change event
    SettingsStore.emitChange();

    return true;

});

export default SettingsStore;