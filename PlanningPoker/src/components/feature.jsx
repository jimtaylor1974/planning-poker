"use strict";

import React            from 'react';
import _                from 'lodash';
import Estimate         from './estimate.jsx';
import EstimationPicker from './estimation-picker.jsx';
import StoreKeeper   from "./../mixins/store-keeper";
import PlayerStore      from "./../stores/player-store.js";

var Feature = React.createClass({
    mixins: [StoreKeeper],
    statics: {
        stores: [PlayerStore],
        getState: () => {
            return PlayerStore.current();
        }
    },
    render() {
        // Loop through each player in the game
        var playerEstimates = _.map(this.props.project.players, (player, playerId) => {

            // Find the estimate for the player
            // Player property is a route - the last value in the route is the player id
            var estimate = _.chain(this.props.feature.estimates)
                .map((e, id) => {
                    e.id = id;
                    return e;
                })
                .find(m => _.last(m.player) == playerId)
                .value();

            var estimateId;

            if (estimate) {
                estimateId = estimate.id;
            }
            else {
                estimateId = null;
                estimate = {
                    "player": _.take(this.props.route, 2).concat([
                        "players",
                        playerId
                    ]),
                    "card": null
                };
            }

            return {
                playerId,
                player,
                estimate,
                estimateId
            };
        });

        var route = this.props.route;
        var estimatesComplete = _.all(playerEstimates, playerEstimate => playerEstimate.estimateId != null);
        var featureId = _.last(route);

        var estimates = _.map(
            playerEstimates,
                playerEstimate => <Estimate
                    key={playerEstimate.playerId}
                    estimate={playerEstimate.estimate}
                    player={playerEstimate.player}
                    estimatesComplete={estimatesComplete}
                    featureId={featureId} />);


        var playerEstimate = _.find(playerEstimates, playerEstimate => playerEstimate.playerId == this.state.yourId);

        return (<div className="bottom-margin">
            <h3>{this.props.feature.description}</h3>

            <div className="row bottom-margin">{estimates}</div>

            <EstimationPicker featureRoute={route} playerEstimate={playerEstimate} />
        </div>);
    }
});

export default Feature;