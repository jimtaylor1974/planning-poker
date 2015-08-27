using System.Collections.Generic;
using Newtonsoft.Json;

namespace PlanningPoker.EventStore
{
    // ReSharper disable InconsistentNaming
    public class Payload
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public IDictionary<string, object> values { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string[] delete { get; set; }
    }
}