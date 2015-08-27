// ReSharper disable InconsistentNaming

namespace PlanningPoker.EventStore
{
    public class ModelEvent
    {
        public long? id { get; set; }
        public string[] route { get; set; }
        public Payload payload { get; set; }
    }
}