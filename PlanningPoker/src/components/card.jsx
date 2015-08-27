"use strict";

import React         from 'react';
import CardValue     from './card-value.js';

var Card = React.createClass({
    pickCard() {
        var pickCard = this.props.pickCard;
        var cardValue = this.props.cardValue || CardValue.None;

        if (pickCard) {
            pickCard(cardValue);
        }
    },
    propTypes: {
        pickCard: React.PropTypes.func
    },
    render() {
        var pickCard = this.props.pickCard;
        var isYourCard = this.props.isYourCard || false;
        var cardValue = this.props.cardValue || CardValue.None;
        var title = this.props.title;

        var card;

        switch (cardValue || CardValue.None) {
            case CardValue.None:
                card = <span>&hellip;</span>;
                break;
            case CardValue.DontKnow:
                card = <i className="fa fa-question"></i>;
                break;
            case CardValue.Break:
                card = <i className="fa fa-coffee"></i>;
                break;
            case CardValue.Waiting:
                card = <span className="glyphicon glyphicon-hourglass" aria-hidden="true"></span>;
                break;
            case CardValue.Ok:
                card = <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>;
                break;
            default:
                card = <span>{String(cardValue)}</span>;
                break;
        }

        var titleControl = title ? <h4>{title}</h4> : <h4>{cardValue}</h4>;

        var classes = ['card'];

        if(isYourCard) {
            classes.push('your-card');
        }

        if (pickCard) {
            classes.push('pointer');
        }

        return (
        <div className="col-md-2">
            {titleControl}
             <div className={classes.join(' ')} onClick={this.pickCard}>
                <span className="card-icon">
                {card}
                </span>
             </div>
        </div>
        );
    }
});

export default Card;