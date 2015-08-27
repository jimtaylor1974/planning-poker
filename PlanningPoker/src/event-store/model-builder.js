"use strict";

import _ from 'lodash';

export default {
    applyEvents(root, events) {
        _.each(events, modelEvent => applyEvent(root, modelEvent));

        return root;
    },
    applyEvent
}

function applyEvent(root, modelEvent) {
    root.__EventId = modelEvent.id;

    var model = fetchModel(root, modelEvent.route);

    if (modelEvent.payload == null)
    {
        return;
    }

    if (modelEvent.payload.values != null)
    {
        _.assign(model, modelEvent.payload.values);
    }

    if (modelEvent.payload.delete != null)
    {
        _.each(modelEvent.payload.delete, name => delete model[name] );
    }

    return root;
}

function fetchModel(root, route)
{
    var model = root;

    _.each(route, key => {
        model = model[key] || newModel(model, key);
    });

    return model;
}

function newModel(parent, key)
{
    var model = {};

    parent[key] = model;

    return model;
}