using System;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using PlanningPoker.Domain.Commands;
using PlanningPoker.Domain.Entities;
using PlanningPoker.Domain.Queries;

namespace PlanningPoker.Experiments
{
    class Program
    {
        static void Main(string[] args)
        {
            PopulateDatabaseWithExampleValues();

            var result = new ModelQuery().Execute();

            var json = JsonConvert.SerializeObject(result, Formatting.Indented, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });

            SaveJson(json);
            Console.WriteLine(json);
            Console.ReadLine();
        }

        private static void PopulateDatabaseWithExampleValues()
        {
            using (var context = new PlanningPokerDbContext())
            {
                context.Database.ExecuteSqlCommand("DELETE FROM [EventRecord]");
                context.Database.ExecuteSqlCommand("DELETE FROM [Snapshot]");
            }

            var events = ExampleEvents.Get();

            foreach (var modelEvent in events)
            {
                new AddEventCommand(modelEvent).Handle();
            }
        }

        private static void SaveJson(string json)
        {
            var outputDirectory = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop),
                "PlanningPoker");

            if (!Directory.Exists(outputDirectory))
            {
                Directory.CreateDirectory(outputDirectory);
            }

            var path = Path.Combine(outputDirectory, "model.json.txt");

            File.WriteAllText(path, json);
        }
    }
}
