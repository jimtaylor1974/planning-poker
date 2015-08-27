using System.Web.Http;
using Microsoft.Owin;
using Owin;
using PlanningPoker;

[assembly: OwinStartup(typeof(Startup))]

namespace PlanningPoker
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            app.MapSignalR();

            app.UseWebApi(config);

            WebApiConfig.Register(config);
        }
    }
}