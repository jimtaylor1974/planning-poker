"use strict";

import React         from 'react';

var Overlay = React.createClass({
    propTypes: {
        close: React.PropTypes.func
    },
    close() {
        if (this.props.close) {
            this.props.close();
        }
    },
    render() {
        var headerText = this.props.headerText;

        var header = headerText ? <h2>{headerText}</h2> : null;

        return (
            <div className="overlay container">
                <div>
                    <button type="button" className="close pull-right" aria-label="Close" onClick={this.close}><span aria-hidden="true">&times;</span></button>
                    {header}
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default Overlay;