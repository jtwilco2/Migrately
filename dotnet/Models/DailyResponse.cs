using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Videochat
{
    public class DailyResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool Api_Created { get; set; }
        public string Privacy { get; set; }
        public string Url { get; set; }
        public DateTime Created_At { get; set; }
        public object Config { get; set; }
    }
}
