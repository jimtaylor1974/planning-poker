using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using PlanningPoker.Domain.Entities;
using PlanningPoker.EventStore;

namespace PlanningPoker.Domain.Queries
{
    public class EventsQuery
    {
        public IEnumerable<ModelEvent> Execute()
        {
            using (var context = new PlanningPokerDbContext())
            {
                var events = context
                    .EventRecords
                    .OrderBy(r => r.Id)
                    .Select(r => new { r.Id, r.Data })
                    .ToArray()
                    .Select(r =>
                    {
                        var modelEvent = JsonConvert.DeserializeObject<ModelEvent>(r.Data);
                        modelEvent.id = r.Id;
                        return modelEvent;
                    })
                    .ToArray();

                return events;
            }
        }
    }
}
