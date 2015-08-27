"use strict";

import Request       from "superagent";
import Constants     from "../constants";
import Dispatcher    from "../dispatcher";
import SettingsStore from '../stores/settings-store';
import _             from 'lodash';

const TIMEOUT = 10000;

var _pendingRequests = {};

function abortPendingRequests(key) {
    if (_pendingRequests[key]) {
        _pendingRequests[key]._callback = function () {
        };
        _pendingRequests[key].abort();
        _pendingRequests[key] = null;
    }
}

function combine(url, part) {
    return _.trimRight(url, '/') + '/' + _.trimLeft(part, '/');
}

function makeUrl(part) {
    if (part.indexOf("http") >= 0) {
        return part;
    } else {
        return combine(SettingsStore.current().apiUrl, part);
    }
}

// GET request
function get(url) {
    return Request
        .get(url)
        // .timeout(TIMEOUT)
        .set('Accept', 'application/json')
        /*.query()*/;
}

// POST request
function post(url, body) {
    return Request
        .post(url)
        .send(body)
        .set('Accept', 'application/json')
        // .timeout(TIMEOUT)
        /*.query()*/;
}

// PUT request
function put(url, body) {
    return Request
        .put(url)
        .send(body)
        .set('Accept', 'application/json')
        // .timeout(TIMEOUT)
        /*.query()*/;
}

// DELETE request
function del(url) {
    return Request
        .del(url)
        .set('Accept', 'application/json')
        // .timeout(TIMEOUT)
        /*.query()*/;
}

function dispatch(key, response, url) {
    Dispatcher.dispatch({
        action: key,
        data: {
            url,
            response
        }
    });
}

// Dispatch a response based on the server response
function dispatchResponse(key, url) {
    return function (err, response) {
        if (err && err.timeout === TIMEOUT) {
            dispatch(Constants.TIMEOUT, response, url);
        } else if (response == null) {
            dispatch(Constants.NO_RESPONSE, response, url);
        } else if (response.status === 401) {
            dispatch(Constants.NOT_AUTHORIZED, response, url);
        } else if (response.status === 404) {
            dispatch(Constants.NOT_FOUND, response, url);
        }else if (response.status === 501) {
            dispatch(Constants.NOT_IMPLEMENTED, response, url);
        } else if (!response.ok) {
            dispatch(Constants.API_ERROR, response, url);
        } else {
            dispatch(key, response, url);
        }
    };
}

function doRequest(key, url, callback) {
    abortPendingRequests(key);
    var request = _pendingRequests[key] = callback(makeUrl(url));
    request.end(dispatchResponse(key, url));
    return request;
}

export default {

    get(key, url){
        return doRequest(key, url, function (fullUrl) {
            return get(fullUrl);
        });
    },

    post(key, url, body){
        return doRequest(key, url, function (fullUrl) {
            return post(fullUrl, body);
        });
    },

    put(key, url, body){
        return doRequest(key, url, function (fullUrl) {
            return put(fullUrl, body);
        });
    },

    del(key, url){
        return doRequest(key, url, function (fullUrl) {
            return del(fullUrl);
        });
    }

};
