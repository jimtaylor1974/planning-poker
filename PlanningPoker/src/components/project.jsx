"use strict";

import React         from 'react';
import _             from 'lodash';
import Feature       from './feature.jsx';
import PlayerList    from './player-list.jsx';
import AddFeature    from './add-feature.jsx';

var Project = React.createClass({
    render() {
        var route = this.props.route;
        var project = this.props.project || {};

        var features = _.map(
            project.features,
            (feature, key) => <Feature key={key} project={project} feature={feature} route={route.concat(['features', key])} />);

        return (<div>
            <a href="#">Projects</a>
            <h2>Project - {project.name}</h2>
            <h2>Features</h2>
            <div>{features}</div>

            <AddFeature route={route} />
            <PlayerList route={route} project={project} />

            <p>&nbsp;</p>
            <pre>{JSON.stringify(project, null, 2)}</pre>
        </div>);
    }
});

export default Project;