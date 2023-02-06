using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Attorneys;
using Sabio.Models.Domain.Languages;
using Sabio.Models.Domain.Locations;
using Sabio.Models.Requests.Attorneys;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class AttorneyService : IAttorneyService
    {
        IDataProvider _data = null;
        private static ILocationService _locationService = null;

        public AttorneyService(IDataProvider data, ILocationService locationService)
        {
            _data = data;
            _locationService = locationService;
        }

        public  List<Attorney> SelectAll()
        {
            List<Attorney> list = null;

            string procName = "[dbo].[Attorneys_SelectAll]";

            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Attorney attorney = MapSingleAttorney(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<Attorney>();
                }

                list.Add(attorney);
            });
            return list;
        }

        public Attorney SelectByUserId(int currentUserId)
        {
            Attorney attorney = null;

            string procName = "[dbo].[Attorneys_SelectByUserId]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@UserId", currentUserId);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                attorney = MapSingleAttorney(reader, ref startingIndex);
            });

            return attorney;
        }

        public Paged<Attorney> SelectByPage(int pageIndex, int pageSize)
        {
            Paged<Attorney> pagedList = null;
            List<Attorney> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Attorneys_SelectAll_Paginated]",
                (param) =>

                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Attorney attorney = MapSingleAttorney(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<Attorney>();
                    }

                    list.Add(attorney);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Attorney>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Attorney> SelectByLanguage(int pageIndex, int pageSize, string language)
        {
            Paged<Attorney> pagedList = null;
            List<Attorney> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Attorneys_Select_ByLanguage]",
                (param) =>

                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@Language", language);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;

                    Attorney friend = MapSingleAttorney(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<Attorney>();
                    }

                    list.Add(friend);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Attorney>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<Attorney> SelectByBioQuery(string query)
        {
            List<Attorney> list = null;

            string procName = "[dbo].[Attorneys_Select_ByBioQuery]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Query", query);
            }
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Attorney attorney = MapSingleAttorney(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<Attorney>();
                }

                list.Add(attorney);
            });
            return list;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Attorneys_Delete]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {

                    col.AddWithValue("@Id", id);
                },
                returnParameters: null);
        }

        public int Add(AttorneyAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Attorneys_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, userId);
                    col.AddWithValue("@AttorneyLanguages", MapLanguages(model.Languages));

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

        public void Update(AttorneyUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Attorneys_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, userId);
                    col.AddWithValue("@AttorneyLanguages", MapLanguages(model.Languages));
                    col.AddWithValue("@Id", model.Id);
                },
                returnParameters: null);
        }

        private static void AddCommonParams(AttorneyAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@Practice", model.PracticeName);
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
            col.AddWithValue("@Bio", model.Bio);
            col.AddWithValue("@Phone", model.Phone);
            col.AddWithValue("@Website", model.Website);
            col.AddWithValue("@Email", model.Email);
        }

        private DataTable MapLanguages(List<string> languagesToMap)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("Name", typeof(string));

            foreach (string language in languagesToMap)
            {
                DataRow dr = dt.NewRow();
                int startingIndex = 0;

                dr.SetField(startingIndex++, language);

                dt.Rows.Add(dr);
            }

            return dt;
        }


        public Attorney MapSingleAttorney(IDataReader reader, ref int startingIndex)
        {
            Attorney attorney = new Attorney();

            attorney.Id = reader.GetSafeInt32(startingIndex++);
            attorney.PracticeName = reader.GetSafeString(startingIndex++);
            attorney.Location = _locationService.MapSingleLocation(reader, ref startingIndex);
            attorney.Bio = reader.GetSafeString(startingIndex++);
            attorney.Phone = reader.GetSafeString(startingIndex++);
            attorney.Email = reader.GetSafeString(startingIndex++);
            attorney.Website = reader.GetSafeString(startingIndex++);
            attorney.Languages = reader.DeserializeObject<List<LookUp3Col>>(startingIndex++);
            attorney.DateCreated = reader.GetSafeUtcDateTime(startingIndex++);
            attorney.DateModified = reader.GetSafeUtcDateTime(startingIndex++);
            return attorney;
        }
    }
}
