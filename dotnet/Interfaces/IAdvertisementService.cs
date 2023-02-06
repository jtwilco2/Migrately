using Sabio.Models;
using Sabio.Models.Domain.Advertisements;
using Sabio.Models.Requests.Advertisements;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IAdvertisementService
    {
        public List<Advertisement> SelectById(int id);
        Paged<Advertisement> SelectByCreatedBy(int CreatedBy, int pageIndex, int pageSize);
        public List<Advertisement> SelectByTierId(int adTierId);
        public void Delete(int id);
        public int Add(AdvertisementAddRequest model, int userId);
        public void Update(AdvertisementUpdateRequest model, int userId);
    }
}