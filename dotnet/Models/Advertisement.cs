using Sabio.Models.Domain.Attorneys;
using Sabio.Models.Domain.Languages;
using Sabio.Models.Domain.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Advertisements
{
    public class Advertisement
    {
        public int Id { get; set; }
        public int AttorneyProfileId { get; set; }
        public int AdTierId { get; set; }
        public Attorney Attorney { get; set; }
        public string Title { get; set; }
        public string AdMainImage { get; set; }
        public string Details { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
    }
}
