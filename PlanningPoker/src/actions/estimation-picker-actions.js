"use strict";

import Constants     from "../constants";
import Dispatcher    from "../dispatcher";

export default {
    showPicker(featureId) {
        Dispatcher.dispatch({action: Constants.SHOW_PICKER, data: featureId});
    },
    hidePicker(featureId) {
        Dispatcher.dispatch({action: Constants.HIDE_PICKER, data: featureId});
    }
};