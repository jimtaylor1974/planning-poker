using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace PlanningPoker.Hubs
{
    [HubName("eventHub")]
    public class EventHub : Hub
    {
    }
}
