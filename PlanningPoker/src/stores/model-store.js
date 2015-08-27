"use strict";

import Dispatcher          from "../dispatcher";
import Constants           from "../constants";
import StoreCommon         from "./store-common";
import _                   from 'lodash';
import ModelBuilder        from './../event-store/model-builder.js';

var _model = {
    events: [],
    data: {},
    page: Constants.PROJECTS_PAGE,
    route: []
};
addMethods(_model);

function loadEvents(events) {
    var data = ModelBuilder.applyEvents({}, events);

    _model.events = events;
    _model.data = data;
}

function addMethods(model) {
    model.findByRoute = (route) => {
        return find(model.data, route);
    }
}

function applyEvent(event) {
    var data = ModelBuilder.applyEvent(_model.data, event);

    _model.events.push(event);
    _model.data = data;
}

function find(root, route) {
    if (route && route.length) {
        var model = root;

        _.each(route, key => {
            if (model) {
                model = model[key];
            }
        });

        return model;
    }

    return null;
}

function selectPage(data) {
    _model.page = data.page;
    _model.route = data.route;
}

// Extend Model Store with EventEmitter to add eventing capabilities
var ModelStore = _.assign({}, StoreCommon, {
    // Return current resource
    current() {
        return _model;
    }
});

// Register callback with Dispatcher
Dispatcher.register(function (payload) {
    var action = payload.action;

    switch (action) {

        case Constants.GET_EVENTS:
             var events = payload.data.response.body;

            loadEvents(events);
            break;

        case Constants.APPLY_EVENT:
            applyEvent(payload.data);
            break;

        case Constants.SELECT_PAGE:
            selectPage(payload.data);
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    ModelStore.emitChange();

    return true;

});

export default ModelStore;