using System.Collections.Generic;
using System.Linq;
using PlanningPoker.EventStore;
using NCuid;

namespace PlanningPoker.Experiments
{
    public static class ExampleEvents
    {
        public static IEnumerable<ModelEvent> Get(int? take = null)
        {
            var project1 = Cuid.Generate(RandomSource.Secure);

            var player1 = Cuid.Generate(RandomSource.Secure);
            var player2 = Cuid.Generate(RandomSource.Secure);
            var player3 = Cuid.Generate(RandomSource.Secure);
            var player4 = Cuid.Generate(RandomSource.Secure);

            var feature1 = Cuid.Generate(RandomSource.Secure);

            var estimate1 = Cuid.Generate(RandomSource.Secure);
            var estimate2 = Cuid.Generate(RandomSource.Secure);
            var estimate3 = Cuid.Generate(RandomSource.Secure);
            var estimate4 = Cuid.Generate(RandomSource.Secure);
            var estimate5 = Cuid.Generate(RandomSource.Secure);

            var events = new[]
            {
                new ModelEvent
                {
                    route = new []{ "projects", project1 },
                    payload = new Payload
                    {
                        values = new
                        {
                            Name = "Project A"
                        }.ToDictionary()
                    }
                },
                new ModelEvent
                {
                    route = new []{ "projects", project1, "players" },
                    payload = new Payload
                    {
                        values = new Dictionary<string, object>
                        {
                            { player1, new { Name = "Player 1" }.ToDictionary() },
                            { player2, new { Name = "Player 2" }.ToDictionary() },
                            { player3, new { Name = "Player 3" }.ToDictionary() },
                            { player4, new { Name = "Player 4" }.ToDictionary() }
                        }
                    }
                },
                new ModelEvent
                {
                    route = new []{ "projects", project1, "features", feature1 },
                    payload = new Payload
                    {
                        values = new
                        {
                            Description = "New feature for project"
                        }.ToDictionary()
                    }
                },
                new ModelEvent
                {
                    route = new []{ "projects", project1, "features", feature1, "estimates", estimate1 },
                    payload = new Payload
                    {
                        values = new
                        {
                            Player = new [] { "projects", project1, "players", player1 },
                            Card = StoryPoints.Points008
                        }.ToDictionary()
                    }
                },
                new ModelEvent
                {
                    route = new []{ "projects", project1, "features", feature1, "estimates", estimate2 },
                    payload = new Payload
                    {
                        values = new
                        {
                            Player = new [] { "projects", project1, "players", player2 },
                            Card = StoryPoints.Points005
                        }.ToDictionary()
                    }
                },
                new ModelEvent
                {
                    route = new []{ "projects", project1, "features", feature1, "estimates", estimate3 },
                    payload = new Payload
                    {
                        values = new
                        {
                            Player = new [] { "projects", project1, "players", player3 },
                            Card = StoryPoints.Points003
                        }.ToDictionary()
                    }
                },
                new ModelEvent
                {
                    route = new []{ "projects", project1, "features", feature1, "estimates", estimate4 },
                    payload = new Payload
                    {
                        values = new
                        {
                            Player = new [] { "projects", project1, "players", player3 },
                            Card = StoryPoints.Break
                        }.ToDictionary()
                    }
                },
                new ModelEvent
                {
                    route = new []{ "projects", project1, "features", feature1, "estimates", estimate5 },
                    payload = new Payload
                    {
                        values = new
                        {
                            Player = new [] { "projects", project1, "players", player4 },
                            Card = StoryPoints.DontKnow
                        }.ToDictionary()
                    }
                },
                new ModelEvent
                {
                    route = new []{ "projects", project1, "features", feature1, "estimates", estimate2 },
                    payload = new Payload
                    {
                        values = new
                        {
                            Player = new [] { "projects", project1, "players", player2 },
                            Card =  StoryPoints.Break,
                        }.ToDictionary()
                    }
                },
                new ModelEvent
                {
                    route = new []{ "projects", project1, "features", feature1, "estimates" },
                    payload = new Payload
                    {
                        delete = new []{ estimate2 }
                    }
                },
                new ModelEvent
                {
                    route = new []{ "projects", project1, "features", feature1, "estimates", estimate2 },
                    payload = new Payload
                    {
                        values = new
                        {
                            Player = new [] { "projects", project1, "players", player2 },
                            Card =  StoryPoints.Points013,
                        }.ToDictionary()
                    }
                },
            };

            if (take == null)
            {
                return events;
            }

            return events.Take(take.Value);
        }

        private enum StoryPoints
        {
            Points000 = 0,
            Points001 = 1,
            Points002 = 2,
            Points003 = 3,
            Points005 = 5,
            Points008 = 8,
            Points013 = 13,
            Points020 = 20,
            Points040 = 40,
            Points100 = 100,
            DontKnow = -1,
            Break = -2,
            Waiting = -3,
            Ok = -4
        }
    }
}