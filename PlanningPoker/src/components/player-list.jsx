"use strict";

import React         from 'react';
import _             from 'lodash';
import Player        from './player.jsx';
import You           from './you.jsx';

var PlayerList = React.createClass({
    render() {
        var route = this.props.route;

        var players = _.map(
            this.props.project.players,
            (player, key) => <Player key={key} player={player} route={route.concat(['players', key])} />);


        return (<div>
            <h2>Players</h2>
            <ul className="list-unstyled">{players}</ul>
            <You route={route} project={this.props.project} />
        </div>);
    }
});

export default PlayerList;