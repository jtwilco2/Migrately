using Sabio.Models.Requests.Attorneys;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Advertisements
{
    public class AdvertisementUpdateRequest : AdvertisementAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
