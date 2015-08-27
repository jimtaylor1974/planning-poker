"use strict";

import React         from 'react';
import _             from 'lodash';
import AddProject    from './../components/add-project.jsx';

var ProjectList = React.createClass({
    render() {
        var projects = _.map(this.props.projects, (project, key) => <li key={key}><a
            href={'#/projects/' + key}>{project.name}</a></li>);

        return (<div>
            <h2>Projects</h2>
            <ul className="list-unstyled">{projects}</ul>

            <hr />

            <AddProject />

            <p>&nbsp;</p>
            <pre>{JSON.stringify(this.props.projects, null, 2)}</pre>
        </div>);
    }
});

export default ProjectList;