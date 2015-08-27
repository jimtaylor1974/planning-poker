"use strict";

import React         from 'react';
import StoreKeeper   from "./../mixins/store-keeper";
import ModelStore    from "./../stores/model-store.js";
import Constants     from "./../constants.js";
import ProjectList   from "./../components/project-list.jsx";
import Project       from "./../components/project.jsx";
import EventList     from "./../components/event-list.jsx";

var App = React.createClass({
    mixins: [StoreKeeper],
    statics: {
        stores: [ModelStore],             // Subscribe to changes in the model store
        getState: () => {                 // Method to retrieve state from stores
            return ModelStore.current();
        }
    },
    render() {
        var model = this.state;

        var data = model.data;

        var page = null;
        switch(model.page) {
            case Constants.PROJECTS_PAGE:
                page = <ProjectList projects={data.projects} />;
                break;
            case Constants.PROJECT_PAGE:
                var project = model.findByRoute(model.route);
                page = <Project project={project} route={model.route} />;
                break;
            case Constants.EVENTS_PAGE:
                page = <EventList events={model.events} />;
                break;
        }

        return (<div>
            <h1>Planning poker app</h1>
            {page}
        </div>);
    }
});

export default App;