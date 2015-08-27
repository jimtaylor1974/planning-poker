"use strict";
import React          from "react";
import routie         from './utils/routie';
import App            from './components/app.jsx';
import SettingsAction from './actions/settings-actions';
import ModelActions   from './actions/model-actions.js';
import Constants      from './constants.js';

window.DEFAULT_SETTINGS = { apiUrl: '/' };

SettingsAction.load(window.DEFAULT_SETTINGS);
ModelActions.getEvents();

React.render(
    <App />,
    document.getElementById('Main')
);

routie({
    '': function() {
        ModelActions.selectPage(Constants.PROJECTS_PAGE, []);
    },
    '/projects/:projectId': function(projectId) {
        ModelActions.selectPage(Constants.PROJECT_PAGE, ['projects', projectId]);
    },
    '/events': function() {
        ModelActions.selectPage(Constants.EVENTS_PAGE, []);
    },
    '*': function() {
        // default go to landing page
        routie('');
    }
});

$(function() {
    var connection = $.hubConnection();

    var proxy = connection.createHubProxy('eventHub');

    proxy.on('raiseEvent', function (modelEvent) {

        console.log('eventHub.raiseEvent', modelEvent);

        ModelActions.applyEvent(modelEvent);
    });

    connection.start();
});