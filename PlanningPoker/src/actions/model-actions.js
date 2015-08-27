"use strict";

import Constants     from "../constants";
import Dispatcher    from "../dispatcher";
import Api           from './../actions/api.js';

export default {
    getEvents() {
        Api.get(Constants.GET_EVENTS, '/events');
    },
    setValues(route, values) {
        var event = {
            route,
            payload: { values }
        };

        Api.post(Constants.SET_MODEL_VALUES, '/events', event);
    },
    selectPage(page, route) {
        Dispatcher.dispatch({action: Constants.SELECT_PAGE, data: {page, route}});
    },
    applyEvent(event) {
        Dispatcher.dispatch({action: Constants.APPLY_EVENT, data: event});
    }
};