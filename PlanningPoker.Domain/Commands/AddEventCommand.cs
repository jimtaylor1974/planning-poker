using PlanningPoker.Domain.Entities;
using PlanningPoker.Domain.Queries;
using PlanningPoker.EventStore;

namespace PlanningPoker.Domain.Commands
{
    public class AddEventCommand
    {
        private readonly ModelEvent modelEvent;

        public AddEventCommand(ModelEvent modelEvent)
        {
            this.modelEvent = modelEvent;
        }

        public void Handle()
        {
            using (var context = new PlanningPokerDbContext())
            {
                var eventRecord = new EventRecord(modelEvent);

                context.EventRecords.Add(eventRecord);

                context.SaveChanges();

                modelEvent.id = eventRecord.Id;

                var model = new ModelQuery().Execute();

                var snapshot = new Snapshot
                {
                    Id = modelEvent.id.Value,
                    Data = model.ToJson(),
                    EventRecord = eventRecord
                };

                context.Snapshots.Add(snapshot);

                context.SaveChanges();
            }
        }
    }
}
