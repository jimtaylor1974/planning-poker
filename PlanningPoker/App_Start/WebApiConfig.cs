using System;
using System.Web.Http;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace PlanningPoker
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            UseCamelCaseForJson(config);

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }

        private static void UseCamelCaseForJson(HttpConfiguration config)
        {
            var formatters = config.Formatters;
            var jsonFormatter = formatters.JsonFormatter;

            var settings = jsonFormatter.SerializerSettings;
            settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            settings.PreserveReferencesHandling = PreserveReferencesHandling.None; // http://stackoverflow.com/a/12748861/1019967
            settings.Formatting = Formatting.Indented;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // settings.Converters.Add(new LowerCaseGuidConverter());

            formatters.Remove(formatters.XmlFormatter);
        }
    }

    internal class LowerCaseGuidConverter : JsonConverter
    {
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            switch (reader.TokenType)
            {
                case JsonToken.Null:
                    return Guid.Empty;
                case JsonToken.String:
                    var guid = reader.Value as string;

                    if (string.IsNullOrEmpty(guid))
                    {
                        return Guid.Empty;
                    }

                    return new Guid(guid);
                default:
                    throw new ArgumentException("Invalid token type");
            }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            if (Guid.Empty.Equals(value))
            {
                writer.WriteValue(Guid.Empty);
            }
            else
            {
                writer.WriteValue(((Guid)value).ToString("D").ToLowerInvariant());
            }
        }

        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(Guid);
        }
    }
}
