using System.Web.Http;
using PlanningPoker.Domain.Commands;
using PlanningPoker.Domain.Queries;
using PlanningPoker.EventStore;
using PlanningPoker.Hubs;

namespace PlanningPoker.Controllers
{
    public class EventsController : ApiControllerWithHub<EventHub>
    {
        public IHttpActionResult Get()
        {
            var result = new EventsQuery().Execute();

            return Ok(result);
        }

        public IHttpActionResult Post(ModelEvent modelEvent)
        {
            new AddEventCommand(modelEvent).Handle();

            Hub.Clients.All.raiseEvent(modelEvent);

            return Ok();
        }
    }
}
