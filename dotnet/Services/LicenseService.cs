using Sabio.Data.Providers;
using Sabio.Models.Requests.Locations;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Requests.Licenses;
using Sabio.Models.Requests;
using Sabio.Data;
using Sabio.Models.Domain;
using Sabio.Models;
using Sabio.Models.Domain.Licenses;
using Sabio.Models.Domain.Users;
using Sabio.Models.Domain.PageSection;

namespace Sabio.Services
{
    public class LicenseService : ILicenseService
    {
        IDataProvider _data = null;

        public LicenseService(IDataProvider data)
        {
            _data = data;
        }


        public int AddLicense(LicenseAddRequest model, int userId)
        {
            int Id = 0;
            string procName = "[dbo].[Licenses_Insert]";
            
            _data.ExecuteNonQuery(
                procName, 
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@CreatedBy", userId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                }, 
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out Id);
                }
            );

            return Id;
        }


        public License GetById(int id)
        {

            string procName = "[dbo].[Licenses_SelectById]";
            License license = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
               
                int startingIndex = 0;
                license = MapSingleLicense(reader, ref startingIndex);
            }
            );
            return license;
        }
        public void UpdateLicense(LicenseUpdateRequest model)
        {
            string procName = "[dbo].[Licenses_Update]";
               _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
               {

                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);

            }, returnParameters: null);

        }

        public Paged<License> SelectAll(int pageIndex, int pageSize)
        {
            Paged<License> pagedResult = null;

            List<License> result = null;

            License license = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "dbo.Licenses_SelectAll",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    int startingIndex = 0;
                    license = MapSingleLicense(reader, ref startingIndex);
                if (totalCount == 0)
                    {
                       totalCount = reader.GetSafeInt32(startingIndex++);
                    }


                    if (result == null)
                    {
                        result = new List<License>();
                    }

                    result.Add(license);
                }
            );
            if (result != null)
            {
                pagedResult = new Paged<License>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public Paged<License> LicenseStateQuery(int pageIndex, int pageSize, string query)
        {
            Paged<License> pagedResult = null;

            List<License> result = null;

            License license = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "dbo.Licenses_QuerySelectAll",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@Query", query);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    int startingIndex = 0;
                    license = MapSingleLicense(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }


                    if (result == null)
                    {
                        result = new List<License>();
                    }

                    result.Add(license);
                }
            );
            if (result != null)
            {
                pagedResult = new Paged<License>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public Paged<License> QueryLicenseNumber(int pageIndex, int pageSize, string query)
        {
            Paged<License> pagedResult = null;

            List<License> result = null;

            License license = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "dbo.Licenses_QueryLicenseNumber",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@Query", query);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    int startingIndex = 0;
                    license = MapSingleLicense(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }


                    if (result == null)
                    {
                        result = new List<License>();
                    }

                    result.Add(license);
                }
            );
            if (result != null)
            {
                pagedResult = new Paged<License>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public Paged<License> GetByQueryAndLicense(int pageIndex, int pageSize, string query, string licenseNumber)
        {
            Paged<License> pagedResult = null;

            List<License> result = null;

            License license = null;

            int totalCount = 0;
           
            _data.ExecuteCmd(
                "dbo.Licenses_QueryStateAndNumber",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@Query", query);
                    parameterCollection.AddWithValue("@LicenseNumber", licenseNumber);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    int startingIndex = 0;
                    license = MapSingleLicense(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }


                    if (result == null)
                    {
                        result = new List<License>();
                    }

                    result.Add(license);
                }
            );
            if (result != null)
            {
                pagedResult = new Paged<License>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public List<License> SelectCreatedBy(int createdBy)
        {
            List<License> list = null;

            string procName = "[dbo].[LicensesSelect_ByCreatedBy]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection) { paramCollection.AddWithValue("@CreatedBy", createdBy); }
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                License license = MapSingleLicense(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<License>();
                }

                list.Add(license);
            });
            return list;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Licenses_Delete_ById]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                },
                returnParameters: null
                );
        }

        private static void AddCommonParams(LicenseAddRequest model, SqlParameterCollection col)
        {
            object dateAdmitted;
            if(model.DateAdmitted == null)
            {
                dateAdmitted = DBNull.Value;
            }
            else
            {
                dateAdmitted = model.DateAdmitted;
            }

            col.AddWithValue("@LicenseStateId", model.LicenseState);
            col.AddWithValue("@LicenseNumber", model.LicenseNumber);
            col.AddWithValue("@DateAdmitted", dateAdmitted);        
            col.AddWithValue("@IsActive", model.IsActive);     

        }
    
        private static License MapSingleLicense(IDataReader reader, ref int startingIndex)
        {

            License license = new License();
            license.LicenseState = new State();
            license.User = new User();

            license.Id = reader.GetInt32(startingIndex++);
            license.LicenseState.Id = reader.GetSafeInt32(startingIndex++);
            license.LicenseState.Code = reader.GetSafeString(startingIndex++);
            license.LicenseState.Name = reader.GetSafeString(startingIndex++);
            license.LicenseNumber = reader.GetSafeString(startingIndex++);
            license.DateAdmitted = reader.GetSafeDateTime(startingIndex++);
            license.CreatedBy = reader.GetSafeInt32(startingIndex++);
            license.User.FirstName = reader.GetSafeString(startingIndex++);
            license.User.LastName = reader.GetSafeString(startingIndex++);
            license.DateCreated= reader.GetSafeDateTime(startingIndex++);
            license.IsActive= reader.GetBoolean(startingIndex++);
            return license;

        }
    }
}
