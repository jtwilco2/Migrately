using Sabio.Models.Domain.Locations;
using Sabio.Models;
using Sabio.Models.Requests.Locations;
using System.Data;

namespace Sabio.Services.Interfaces
{
    public interface ILocationService
    {
        int AddLocation(LocationAddRequest model , int userId);

        void DeleteLocation(int id);

        void UpdateLocation(LocationUpdateRequest model,int userId);

        Paged<Location> LocationPaginatedCreatedBy(int pageIndex, int pageSize, int createdBy);

        Paged<Location> LocationSearchDetails(int pageIndex, int pageSize, string query, int userId);

        Location MapSingleLocation(IDataReader reader, ref int startingIndex);
    }
}