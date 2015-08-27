"use strict";

import Constants     from "../constants";
import Dispatcher    from "../dispatcher";

export default {
    updateName(name) {
        Dispatcher.dispatch({action: Constants.UPDATE_PLAYER_NAME, data: name});
    }
};