"use strict";

import React         from 'react';
import _             from 'lodash';
import ModelActions  from './../actions/model-actions.js';
import PlayerActions from './../actions/player-actions.js';
import StoreKeeper   from "./../mixins/store-keeper";
import PlayerStore   from "./../stores/player-store.js";

var You = React.createClass({
    mixins: [StoreKeeper],
    statics: {
        stores: [PlayerStore],
        getState: () => {
            return PlayerStore.current();
        }
    },
    nameChanged(event) {
        var yourName = event.target.value;

        PlayerActions.updateName(yourName);
    },
    joinGame() {
        var route = this.props.route.concat(['players', this.state.yourId]);

        ModelActions.setValues(route, { name: this.state.yourName });
    },
    render() {
        var project = this.props.project;

        var hasJoinedGame = _.any(project.players, (player, key) => key == this.state.yourId);

        if (hasJoinedGame) {
            return (<i>Playing as {this.state.yourName}</i>);
        }

        return (<div>
            <form className="form-inline">
                <div className="form-group">
                    <label htmlFor="yourName">You</label>
                    <input
                        type="text"
                        className="form-control"
                        id="yourName"
                        placeholder="Your name"
                        onChange={this.nameChanged}
                        value={this.state.yourName}/>
                </div>
                &nbsp;
                <button type="button" className="btn btn-primary" onClick={this.joinGame}>Join game</button>
            </form>
        </div>);
    }
});

export default You;