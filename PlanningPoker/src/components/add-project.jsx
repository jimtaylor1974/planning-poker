"use strict";

import React         from 'react';
import _             from 'lodash';
import ModelActions  from './../actions/model-actions.js';
import cuid          from 'cuid';

var AddProject = React.createClass({
    addProject() {
        var projectNameInput = React.findDOMNode(this.refs.projectNameInput);

        ModelActions.setValues(['projects', cuid()], { name: projectNameInput.value });

        projectNameInput.value = '';
    },
    render() {
        return (
            <form className="form-inline">
                <div className="form-group">
                    <input type="text" className="form-control" id="ProjectName" placeholder="Project name" ref="projectNameInput"/>
                </div>
                &nbsp;
                <button type="button" className="btn btn-default" onClick={this.addProject}>Add project</button>
            </form>);
    }
});

export default AddProject;