using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Requests.Locations;
using Sabio.Services.Interfaces;
using Sabio.Data;
using Sabio.Models;
using Sabio.Models.Domain.Locations;
using static System.Net.Mime.MediaTypeNames;
using Sabio.Models.Domain;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Sabio.Services
{
    public class LocationService : ILocationService
    {
        private IDataProvider _data = null;
       
        public LocationService(IDataProvider data)
        {
            _data = data;
           
        }

        public int AddLocation(LocationAddRequest model , int userId)
        {
            int id = 0;
           
            string procName = "[dbo].[Locations_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, userId);
                  

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);

                },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);

            });

            return id;
        }

        public void DeleteLocation(int id)
        {
            string procName = "[dbo].[Locations_Delete_ById]";

            _data.ExecuteNonQuery(procName,
               inputParamMapper: delegate (SqlParameterCollection paramCollection)
               {
                   paramCollection.AddWithValue("@Id", id);
               }
          );

        }

        public void UpdateLocation(LocationUpdateRequest model , int userId)
        {
            string procName = "[dbo].[Locations_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, userId);
                    col.AddWithValue("@Id", model.Id);

                },
            returnParameters: null);
        }

        public Paged<Location> LocationPaginatedCreatedBy(int pageIndex, int pageSize, int createdBy)
        {
            Paged<Location> pagedResult = null;
            List<Location> result = null;
            string procName = "[dbo].[Locations_Select_ByCreatedBy]";
            int totalCount = 0;

            _data.ExecuteCmd(procName,
              inputParamMapper: delegate (SqlParameterCollection parameterCollection)
              {
                  parameterCollection.AddWithValue("@PageIndex", pageIndex);
                  parameterCollection.AddWithValue("@PageSize", pageSize);
                  parameterCollection.AddWithValue("@createdBy", createdBy);
              },
              singleRecordMapper: delegate (IDataReader reader, short set)
              {
                  int startingIndex = 0;
                  Location location = MapSingleLocation(reader, ref startingIndex);

                  if (totalCount == 0)
                  {
                      totalCount = reader.GetSafeInt32(startingIndex++);
                  }

                  if (result == null)
                  {
                      result = new List<Location>();
                  }

                  result.Add(location);
              });

            if (result != null)
            {
                pagedResult = new Paged<Location>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;



        }

        public Paged<Location> LocationSearchDetails(int pageIndex, int pageSize, string query, int userId)
        {
            Paged<Location> pagedResult = null;
            List<Location> result = null;
            string procName = "[dbo].[Locations_SearchDetails]";
            int totalCount = 0;

            _data.ExecuteCmd(procName,
              inputParamMapper: delegate (SqlParameterCollection parameterCollection)
              {
                  parameterCollection.AddWithValue("@PageIndex", pageIndex);
                  parameterCollection.AddWithValue("@PageSize", pageSize);
                  parameterCollection.AddWithValue("@query", query);
                  parameterCollection.AddWithValue("@createdBy", userId);
              },
              singleRecordMapper: delegate (IDataReader reader, short set)
              {
                  int startingIndex = 0;
                  Location location = MapSingleLocation(reader, ref startingIndex);

                  if (totalCount == 0)
                  {
                      totalCount = reader.GetSafeInt32(startingIndex++);
                  }

                  if (result == null)
                  {
                      result = new List<Location>();
                  }

                  result.Add(location);
              });

            if (result != null)
            {
                pagedResult = new Paged<Location>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;



        }

        private static void AddCommonParams(LocationAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@LocationTypeId", model.LocationTypeId);
            col.AddWithValue("@LineOne", model.LineOne);
            col.AddWithValue("@LineTwo", model.LineTwo);
            col.AddWithValue("@City", model.City);
            col.AddWithValue("@Zip", model.Zip);
            col.AddWithValue("@StateId", model.StateId);
            col.AddWithValue("@Latitude", model.Latitude);
            col.AddWithValue("@Longitude", model.Longitude);
            col.AddWithValue("@CreatedBy", userId);
            col.AddWithValue("@ModifiedBy", userId);

        }

        public Location MapSingleLocation(IDataReader reader, ref int startingIndex)
        {
            Location location = new Location();
            location.LocationType = new LookUp();
            location.State = new LookUp();

            location.Id = reader.GetSafeInt32(startingIndex++);
            location.LocationType.Id = reader.GetSafeInt32(startingIndex++);
            location.LocationType.Name = reader.GetSafeString(startingIndex++);
            location.LineOne = reader.GetSafeString(startingIndex++);
            location.LineTwo = reader.GetSafeString(startingIndex++);
            location.City = reader.GetSafeString(startingIndex++);
            location.Zip = reader.GetSafeString(startingIndex++);
            location.State.Id = reader.GetSafeInt32(startingIndex++);
            location.State.Name = reader.GetSafeString(startingIndex++);
            location.Latitude = reader.GetSafeDouble(startingIndex++);
            location.Longitude = reader.GetSafeDouble(startingIndex++);
            location.DateCreated = reader.GetDateTime(startingIndex++);
            location.DateModified = reader.GetDateTime(startingIndex++);
            location.CreatedBy = reader.GetSafeInt32(startingIndex++);
            location.ModifiedBy = reader.GetSafeInt32(startingIndex++);

            return location;
        }
    }
}
