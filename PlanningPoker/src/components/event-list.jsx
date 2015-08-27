"use strict";

import React from 'react';
import _     from 'lodash';

var EventList = React.createClass({
    render() {
        var events = _.map(this.props.events, (event, key) => <pre key={key}>{JSON.stringify(event, null, 2)}</pre>);

        return (<div>
            <h2>Events</h2>
            <a href="#">Projects</a>
            {events}</div>);
    }
});

export default EventList;