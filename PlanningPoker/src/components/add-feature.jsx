"use strict";

import React         from 'react';
import _             from 'lodash';
import ModelActions  from './../actions/model-actions.js';
import cuid          from 'cuid';

var AddFeature = React.createClass({
    addFeature() {
        var featureDescriptionInput = React.findDOMNode(this.refs.featureDescriptionInput);

        ModelActions.setValues(this.props.route.concat(['features', cuid()]), { description: featureDescriptionInput.value });

        featureDescriptionInput.value = '';
    },
    render() {
        return (
            <form className="form-inline">
                <div className="form-group">
                    <input type="text" className="form-control" id="featureDescription" placeholder="Feature description" ref="featureDescriptionInput"/>
                </div>
                &nbsp;
                <button type="button" className="btn btn-default" onClick={this.addFeature}>Add feature</button>
            </form>);
    }
});

export default AddFeature;