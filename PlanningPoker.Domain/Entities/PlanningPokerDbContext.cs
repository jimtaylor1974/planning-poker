using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace PlanningPoker.Domain.Entities
{
    public class PlanningPokerDbContext : DbContext
    {
        public virtual IDbSet<EventRecord> EventRecords { get; set; }
        public virtual IDbSet<Snapshot> Snapshots { get; set; }

        public PlanningPokerDbContext()
            : base("DefaultConnection")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            if (modelBuilder == null)
            {
                throw new ArgumentNullException("modelBuilder");
            }

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
