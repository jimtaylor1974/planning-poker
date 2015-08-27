using System.Web.Http;
using PlanningPoker.Domain.Queries;

namespace PlanningPoker.Controllers
{
    public class ModelController : ApiController
    {
        public IHttpActionResult Get()
        {
            var result = new ModelQuery().Execute();

            return Ok(result);
        }
    }
}
