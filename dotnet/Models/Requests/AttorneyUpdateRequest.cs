using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Attorneys
{
    public class AttorneyUpdateRequest : AttorneyAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
