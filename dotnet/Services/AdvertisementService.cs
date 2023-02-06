using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Services.Interfaces;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using Sabio.Models.Domain.Advertisements;
using Sabio.Data;
using System.Xml.Linq;
using Sabio.Models.Requests.Advertisements;

namespace Sabio.Services
{
    public class AdvertisementService : IAdvertisementService
    {
        IDataProvider _dataProvider;
        private static IAttorneyService _attorneyService;
        
        public AdvertisementService(IDataProvider dataProvider, IAttorneyService attorneyService)
        {
            _dataProvider = dataProvider;
            _attorneyService = attorneyService;
        }
        public List<Advertisement> SelectById(int id)
        {
            List<Advertisement> list = null;

            string procName = "[dbo].[Advertisements_SelectByIdV2]";

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection) { paramCollection.AddWithValue("@Id", id); }
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Advertisement advertisement = MapSingleAdvertisement(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<Advertisement>();
                }

                list.Add(advertisement);
            });
            return list;
        }

        public Paged<Advertisement> SelectByCreatedBy(int CreatedBy, int pageIndex, int pageSize)
        {
            Paged<Advertisement> pagedList = null;
            List<Advertisement> list = null;
            int totalCount = 0;

            _dataProvider.ExecuteCmd(
                "[dbo].[Advertisements_Select_ByCreatedByV2]",
                (param) =>

                {
                    param.AddWithValue("@CreatedBy", CreatedBy);
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (IDataReader reader, short set) =>
                {
                    int startingIndex = 0;
                    Advertisement advertisement = MapSingleAdvertisement(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<Advertisement>();
                    }

                    list.Add(advertisement);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Advertisement>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<Advertisement> SelectByTierId(int adTierId)
        {
            List<Advertisement> list = null;

            string procName = "[dbo].[Advertisements_Select_ByTierIdV2]";

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection) { paramCollection.AddWithValue("@AdTierId", adTierId); }
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Advertisement advertisement = MapSingleAdvertisement(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<Advertisement>();
                }

                list.Add(advertisement);
            });
            return list;
        }
        public void Delete(int id)
        {
            string procName = "[dbo].[Advertisements_Delete_ById]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                },
                returnParameters: null
                );
        }
        public int Add(AdvertisementAddRequest model, int userId)
        {

            int id = 0;

            string procName = "[dbo].[Advertisements_InsertV2]";
            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {

                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);

            });

            return id;
        }
        public void Update(AdvertisementUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Advertisements_UpdateV2]";
            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {

                AddCommonParams(model, col, userId);
                col.AddWithValue("@Id", model.Id);
            },

            returnParameters: null);

        }

        private static void AddCommonParams(AdvertisementAddRequest model, SqlParameterCollection col, int userId)
        {

            col.AddWithValue("@AttorneyProfileId", userId);
            col.AddWithValue("@AdTierId", model.AdTierId);
            col.AddWithValue("@Title", model.Title);
            col.AddWithValue("@AdMainImage", model.AdMainImage);
            col.AddWithValue("@Details", model.Details);
            col.AddWithValue("@DateStart", model.DateStart);
            col.AddWithValue("@DateEnd", model.DateEnd);

        }

        private static Advertisement MapSingleAdvertisement(IDataReader reader, ref int startingIndex)
        {
            Advertisement advertisement = new Advertisement();

            advertisement.Id = reader.GetSafeInt32(startingIndex++);
            advertisement.AttorneyProfileId = reader.GetSafeInt32(startingIndex++);
            advertisement.AdTierId = reader.GetSafeInt32(startingIndex++);
            advertisement.Attorney = _attorneyService.MapSingleAttorney(reader, ref startingIndex);
            advertisement.Title = reader.GetSafeString(startingIndex++);
            advertisement.AdMainImage = reader.GetSafeString(startingIndex++);
            advertisement.Details = reader.GetSafeString(startingIndex++);
            advertisement.DateCreated = reader.GetSafeUtcDateTime(startingIndex++);
            advertisement.DateModified = reader.GetSafeUtcDateTime(startingIndex++);
            advertisement.DateStart = reader.GetSafeUtcDateTime(startingIndex++);
            advertisement.DateEnd = reader.GetSafeUtcDateTime(startingIndex++);
            return advertisement;
        }
    }
}
