using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

namespace PlanningPoker.EventStore
{
    public static class Extensions
    {
        public static dynamic ToObject(this string json)
        {
            json = json == null ? null : json.TrimStart();

            if (string.IsNullOrWhiteSpace(json))
            {
                return null;
            }

            if (json[0] == '[')
            {
                return JArray.Parse(json);
            }

            return JObject.Parse(json);
        }

        public static string ToJson(this object value)
        {
            if (value == null)
            {
                return null;
            }

            return JsonConvert.SerializeObject(value, Formatting.Indented, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
        }

        public static IDictionary<string, object> DeleteByKeys(this IDictionary<string, object> dictionary, params string[] keys)
        {
            foreach (var key in keys)
            {
                if (dictionary.ContainsKey(key))
                {
                    dictionary.Remove(key);
                }
            }

            return dictionary;
        }

        public static IDictionary<string, object> Merge(this IDictionary<string, object> dictionary, IDictionary<string, object> merge)
        {
            foreach (var kvp in merge)
            {
                dictionary.AddOrSet(kvp);
            }

            return dictionary;
        }

        public static IDictionary<string, object> ToDictionary(this object data)
        {
            if (data == null)
            {
                return null;
            }

            const BindingFlags publicAttributes = BindingFlags.Public | BindingFlags.Instance;

            return data
                .GetType()
                .GetProperties(publicAttributes)
                .Where(property => property.CanRead)
                .ToDictionary(property => property.Name, property => property.GetValue(data, null), StringComparer.OrdinalIgnoreCase);
        }

        public static IDictionary<string, object> AddOrSet(this IDictionary<string, object> dictionary, KeyValuePair<string, object> keyValuePair)
        {
            return dictionary.AddOrSet(keyValuePair.Key, keyValuePair.Value);
        }

        public static IDictionary<string, object> AddOrSet(this IDictionary<string, object> dictionary, string key, object value)
        {
            if (dictionary.ContainsKey(key))
            {
                dictionary[key] = value;
            }
            else
            {
                dictionary.Add(key, value);
            }

            return dictionary;
        }

        public static object GetOrDefault(this IDictionary<string, object> dictionary, string key, Func<IDictionary<string, object>> getDefaultValue = null)
        {
            if (dictionary.ContainsKey(key))
            {
                return dictionary[key];
            }

            return getDefaultValue == null ? null : getDefaultValue();
        }
    }
}