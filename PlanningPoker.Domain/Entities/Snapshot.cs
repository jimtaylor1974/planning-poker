using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlanningPoker.Domain.Entities
{
    public class Snapshot
    {
        [Key]
        public long Id { get; set; }

        public string Data { get; set; }

        public virtual long EventRecordId { get; set; }

        [ForeignKey("EventRecordId")]
        public virtual EventRecord EventRecord { get; set; }
    }
}