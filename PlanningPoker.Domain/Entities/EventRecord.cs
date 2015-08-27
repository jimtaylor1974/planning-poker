using System;
using System.ComponentModel.DataAnnotations.Schema;
using PlanningPoker.EventStore;

namespace PlanningPoker.Domain.Entities
{
    public class EventRecord
    {
        public EventRecord()
        {
        }

        public EventRecord(object data)
        {
            CreatedUtc = DateTime.UtcNow;
            Data = data.ToJson();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        
        public DateTime CreatedUtc { get; set; }

        public string Data { get; set; }
    }
}
