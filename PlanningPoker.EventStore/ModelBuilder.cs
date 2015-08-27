using System;
using System.Collections.Generic;

namespace PlanningPoker.EventStore
{
    public class ModelBuilder
    {
        public IDictionary<string, object> ApplyEvents(IDictionary<string, object> root, IEnumerable<ModelEvent> events)
        {
            foreach (var modelEvent in events)
            {
                ApplyEvent(root, modelEvent);
            }

            return root;
        }

        public IDictionary<string, object> ApplyEvent(IDictionary<string, object> root, ModelEvent modelEvent)
        {
            var model = FetchModel(root, modelEvent.route);

            if (modelEvent.payload == null)
            {
                return null;
            }

            if (modelEvent.payload.values != null)
            {
                model.Merge(modelEvent.payload.values);
            }

            if (modelEvent.payload.delete != null)
            {
                model.DeleteByKeys(modelEvent.payload.delete);
            }

            return model;
        }

        private IDictionary<string, object> FetchModel(IDictionary<string, object> root, string[] route)
        {
            var model = root;

            foreach (var key in route)
            {
                model = model.GetOrDefault(key, () => NewModel(model, key)) as IDictionary<string, object>;
            }

            return model;
        }

        public IDictionary<string, object> NewModel(IDictionary<string, object> parent, string key)
        {
            var model = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);

            parent.Add(key, model);

            return model;
        }
    }
}