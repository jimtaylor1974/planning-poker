using System;
using System.Collections.Generic;
using PlanningPoker.EventStore;

namespace PlanningPoker.Domain.Queries
{
    public class ModelQuery
    {
        public IDictionary<string, object> Execute(IDictionary<string, object> root = null)
        {
            if (root == null)
            {
                root = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
            }

            var events = new EventsQuery().Execute();

            var result = new ModelBuilder().ApplyEvents(root, events);

            return result;
        }
    }
}