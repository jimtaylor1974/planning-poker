"use strict";

import Dispatcher          from "../dispatcher";
import Constants           from "../constants";
import StoreCommon         from "./store-common";
import _                   from 'lodash';
import cuid                from 'cuid';

var player = getPlayer();

function getPlayer() {
    var yourId = window.localStorage.yourId;

    if (!yourId) {
        yourId = cuid();
        window.localStorage.yourId = yourId;
    }

    return {
        yourName: window.localStorage.yourName,
        yourId: yourId
    }
}

// Extend Store with EventEmitter to add eventing capabilities
var PlayerStore = _.assign({}, StoreCommon, {
    // Return current player
    current() {
        return player;
    }
});

function updateName(name) {
    player.yourName = name;
    window.localStorage.yourName = name;
}

// Register callback with Dispatcher
Dispatcher.register(function (payload) {
    var action = payload.action;

    switch (action) {
        case Constants.UPDATE_PLAYER_NAME:
            updateName(payload.data);
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    PlayerStore.emitChange();

    return true;

});

export default PlayerStore;