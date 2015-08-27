"use strict";

import React         from 'react';
import _             from 'lodash';

var Player = React.createClass({
    render() {
        return (<div>
            {this.props.player.name}
        </div>);
    }
});

export default Player;