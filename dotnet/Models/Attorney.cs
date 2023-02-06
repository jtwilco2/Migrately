using Sabio.Models.Domain.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Attorneys
{
    public class Attorney
    {
        public int Id { get; set; }
        public string PracticeName { get; set; }
        public Location Location { get; set; }
        public string Bio { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public List<LookUp3Col> Languages { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
