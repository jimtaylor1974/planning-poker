"use strict";

import React                   from 'react';
import CardValue               from './card-value.js';
import ModelStore              from './../stores/model-store.js';
import _                       from 'lodash';
import StoreKeeper             from "./../mixins/store-keeper";
import PlayerStore             from "./../stores/player-store.js";
import Card                    from './card.jsx';
import EstimationPickerActions from './../actions/estimation-picker-actions.js';

var Estimate = React.createClass({
    mixins: [StoreKeeper],
    statics: {
        stores: [PlayerStore],
        getState: () => {
            return PlayerStore.current();
        }
    },
    showPicker() {
        EstimationPickerActions.showPicker(this.props.featureId);
    },
    render() {
        var estimate = this.props.estimate;

        var player = ModelStore.current().findByRoute(estimate.player);

        if (!player) {
            return <span></span>;
        }

        var playerId = _.last(estimate.player);

        var you = this.state;
        var isYourCard = you.yourId == playerId;

        var title = isYourCard ? 'Your estimate' : 'Estimate ' + player.name;

        var cardValue;
        if (isYourCard || this.props.estimatesComplete) {
            cardValue = _.find(CardValue, v => v == estimate.card);
        } else {
            if (estimate.card) {
                // They have provided an estimate but we are waiting for others to complete
                cardValue = CardValue.Ok;
            } else {
                // Waiting for this player to provide an estimate
                cardValue = CardValue.Waiting;
            }
        }

        var pickCard = isYourCard ? this.showPicker : null;

        return <Card cardValue={cardValue} title={title} isYourCard={isYourCard} pickCard={pickCard} />;
    }
});

export default Estimate;