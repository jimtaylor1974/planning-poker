"use strict";

import React                   from 'react';
import Overlay                 from './overlay.jsx';
import CardValue               from './card-value.js';
import Card                    from './card.jsx'
import ModelActions            from './../actions/model-actions.js';
import cuid                    from 'cuid';
import EstimationPickerActions from './../actions/estimation-picker-actions.js';
import EstimationPickerStore   from './../stores/estimation-picker-store.js';
import _                       from 'lodash';
import StoreKeeper             from "./../mixins/store-keeper";

var EstimationPicker = React.createClass({
    mixins: [StoreKeeper],
    statics: {
        stores: [EstimationPickerStore],
        getState: () => {
            return EstimationPickerStore.current();
        }
    },
    pickCard(cardValue) {
        var estimate = this.props.playerEstimate.estimate;
        estimate.card = cardValue;

        var estimateId = this.props.playerEstimate.estimateId ? this.props.playerEstimate.estimateId : cuid();

        var route = this.props.featureRoute.concat('estimates', estimateId);

        console.log(route);
        console.log(estimate);

        ModelActions.setValues(route, estimate);

        EstimationPickerActions.hidePicker(this.featureId());
    },
    close() {
        EstimationPickerActions.hidePicker(this.featureId());
    },
    featureId() {
        return _.last(this.props.featureRoute);
    },
    render() {
        var estimationPicker = <Overlay headerText="Choose your estimate" close={this.close}>
            <p>Pick a card</p>
            <div className="bottom-margin">
                <Card pickCard={this.pickCard} cardValue={CardValue.Points001} />
                <Card pickCard={this.pickCard} cardValue={CardValue.Points002} />
                <Card pickCard={this.pickCard} cardValue={CardValue.Points003} />
                <Card pickCard={this.pickCard} cardValue={CardValue.Points005} />
                <Card pickCard={this.pickCard} cardValue={CardValue.Points008} />
                <Card pickCard={this.pickCard} cardValue={CardValue.Points013} />
                <Card pickCard={this.pickCard} cardValue={CardValue.Points020} />
                <Card pickCard={this.pickCard} cardValue={CardValue.Points040} />
                <Card pickCard={this.pickCard} cardValue={CardValue.Points100} />
                <Card pickCard={this.pickCard} cardValue={CardValue.DontKnow} title="Don't know" />
                <Card pickCard={this.pickCard} cardValue={CardValue.Break} title="Take a break" />
            </div>
        </Overlay>;

        var show = this.state[this.featureId()];

        return (
            <div>
                {show ? estimationPicker : null}
            </div>);
    }
});

export default EstimationPicker;