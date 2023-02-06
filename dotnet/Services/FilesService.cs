using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.AppSettings;
using Sabio.Models.Domain.Files;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using Sabio.Web.Models.Responses;
using Stripe.Terminal;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing.Printing;
using System.Drawing.Text;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Sabio.Services
{
    public class FilesService : IFilesService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;
        private AwsCredentials _awsCreds;

        private static readonly RegionEndpoint bucketRegion = RegionEndpoint.USWest2;
        public FilesService(IDataProvider data, ILookUpService lookUpService, IOptions<AwsCredentials> awsCreds)
        {
            _data = data;
            _lookUpService = lookUpService;
            _awsCreds = awsCreds.Value;
        }

        public Paged<File> GetAll(int pageIndex, int pageSize)
        {
            Paged<File> pagedList = null;
            List<File> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Files_SelectAll]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    File file = MapSingleFile(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<File>();
                    }
                    list.Add(file);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<ExpiredFile> GetAllExpired()
        {
            List<ExpiredFile> list = null;
            string procName = "[dbo].[Files_SelectAllExpired]";

            _data.ExecuteCmd(procName, inputParamMapper: null
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    ExpiredFile anExpiredFile = MapSingleExpiredFile(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<ExpiredFile>();
                    }
                    list.Add(anExpiredFile);
                }
            );
            return list;
        }

        public Paged<File> GetAllSorted(string sortBy, int pageIndex, int pageSize, bool deleted)
        {
            Paged<File> pagedList = null;
            List<File> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Files_SortAll_DeleteStatus]",
                (param) =>
                {
                    param.AddWithValue("@SortBy", sortBy);
                    AddCommonGetParams(param, pageIndex, pageSize, deleted);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    File file = MapSingleFileWithUsername(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);

                    }
                    if (list == null)
                    {
                        list = new List<File>();
                    }
                    list.Add(file);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }


        public Paged<File> GetByIdWithDeleteStatus(int id, int pageIndex, int pageSize, bool deleted)
        {
            Paged<File> pagedList = null;
            List<File> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Files_Select_ById_DeleteStatus]",
                (param) =>
                {
                    param.AddWithValue("@Id", id);
                    AddCommonGetParams(param, pageIndex, pageSize, deleted);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    File file = MapSingleFileWithUsername(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);

                    }
                    if (list == null)
                    {
                        list = new List<File>();
                    }
                    list.Add(file);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<File> GetAllByDeleteStatus(int pageIndex, int pageSize, bool deleted)
        {
            Paged<File> pagedList = null;
            List<File> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Files_SelectAll_DeleteStatus]",
                (param) =>
                {
                    AddCommonGetParams(param, pageIndex, pageSize, deleted);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    File file = MapSingleFileWithUsername(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<File>();
                    }
                    list.Add(file);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<File> QueryWithDeleteStatus(int pageIndex, int pageSize, string query, bool deleted)
        {
            Paged<File> pagedList = null;
            List<File> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Files_Query_WithDeleteStatus]",
                (param) =>
                {
                    param.AddWithValue("@Query", query);
                    AddCommonGetParams(param, pageIndex, pageSize, deleted);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    File file = MapSingleFileWithUsername(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<File>();
                    }
                    list.Add(file);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }



        public Paged<File> GetByCreatedBy(int createdById, int pageIndex, int pageSize)
        {
            Paged<File> pagedList = null;
            List<File> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Files_Select_ByCreatedBy]",
                (param) =>
                {
                    param.AddWithValue("@CreatedBy", createdById);
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    File file = MapSingleFile(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);

                    }
                    if (list == null)
                    {
                        list = new List<File>();
                    }
                    list.Add(file);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<File> GetByCreatedByWithDeleteStatus(int createdById, int pageIndex, int pageSize, bool deleted)
        {
            Paged<File> pagedList = null;
            List<File> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Files_Select_ByCreatedBy_DeleteStatus]",
                (param) =>
                {
                    param.AddWithValue("@CreatedBy", createdById);
                    AddCommonGetParams(param, pageIndex, pageSize, deleted);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    File file = MapSingleFileWithUsername(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);

                    }
                    if (list == null)
                    {
                        list = new List<File>();
                    }
                    list.Add(file);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<File> GetByCreatorNameWithDeleteStatus(string creatorName, int pageIndex, int pageSize, bool deleted)
        {
            Paged<File> pagedList = null;
            List<File> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Files_Select_ByCreatorName_DeleteStatus]",
                (param) =>
                {
                    param.AddWithValue("@CreatorName", creatorName);
                    AddCommonGetParams(param, pageIndex, pageSize, deleted);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    File file = MapSingleFileWithUsername(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);

                    }
                    if (list == null)
                    {
                        list = new List<File>();
                    }
                    list.Add(file);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<File> GetByFileTypeId(int fileTypeId, int pageIndex, int pageSize)
        {
            Paged<File> pagedList = null;
            List<File> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Files_Select_ByFileTypeId]",
                (param) =>
                {
                    param.AddWithValue("@FileTypeId", fileTypeId);
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    File file = MapSingleFile(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);

                    }
                    if (list == null)
                    {
                        list = new List<File>();
                    }
                    list.Add(file);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<File> GetByFileTypeIdWithDeleteStatus(int fileTypeId, int pageIndex, int pageSize, bool deleted)
        {
            Paged<File> pagedList = null;
            List<File> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Files_Select_ByFileTypeId_DeleteStatus]",
                (param) =>
                {
                    param.AddWithValue("@FileTypeId", fileTypeId);
                    AddCommonGetParams(param, pageIndex, pageSize, deleted);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    File file = MapSingleFileWithUsername(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);

                    }
                    if (list == null)
                    {
                        list = new List<File>();
                    }
                    list.Add(file);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public void Delete(int Id)
        {
            string procName = "[dbo].[Files_Delete]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", Id);

            }, returnParameters: null);
        }

        public void PermanentDelete(int id)
        {
            string procName = "[dbo].[Files_PermanentDelete]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                },
                returnParameters: null);
        }

        public int Insert(FileAddRequest model)
        {
            int Id = 0;

            string procName = "[dbo].[Files_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);


                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out Id);

                Console.WriteLine("");
            });

            return Id;
        }

        public void Update(FileUpdateRequest model)
        {
            string procName = "[dbo].[Files_UpdateDeleteStatus]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@IsDeleted", model.IsDeleted);
                    col.AddWithValue("@Id", model.Id);
                },
            returnParameters: null);
        }


        public async Task<FileUpload> AwsFileUpload(IFormFile file, int userId) 
        {

            FileUpload thisFile = new FileUpload();
            int Id = 0;
            string url = null;
            string accessKey =  _awsCreds.AccessKey;
            string secretKey = _awsCreds.Secret;
            string keyName =  Guid.NewGuid() + "/" + file.FileName.Replace(" ", String.Empty);


            var s3Client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.USWest2);

            var fileTransferUtility = new TransferUtility(s3Client);

            var fileTransferUtilityRequest = new TransferUtilityUploadRequest
            {
                BucketName = "sabio-training",
                Key = keyName,
                InputStream = file.OpenReadStream()
            };

            url = "https://sabio-training.s3-us-west-2.amazonaws.com/" + keyName;

            await fileTransferUtility.UploadAsync(fileTransferUtilityRequest);

            //*********************SQL INSERT*********************

            string procName = "[dbo].[Files_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {

                col.AddWithValue("@Name", file.FileName);
                col.AddWithValue("@Url", url);
                col.AddWithValue("@FileTypeName", file.ContentType);
                col.AddWithValue("@IsDeleted", false);
                col.AddWithValue("@CreatedBy", userId); 

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out Id);
            });

            thisFile.Url = url;
            thisFile.Id = Id;
            FileUpload response = thisFile;


            return response;
        }

        private static void AddCommonParams(FileAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Url", model.Url);
            col.AddWithValue("@FileTypeName", model.FileTypeName);
            col.AddWithValue("@IsDeleted", model.IsDeleted);
            col.AddWithValue("@CreatedBy", model.CreatedBy);
        }

        private static void AddCommonGetParams( SqlParameterCollection col, int pageIndex, int pageSize, bool deleted)
        {
            col.AddWithValue("@PageIndex", pageIndex);
            col.AddWithValue("@PageSize", pageSize);
            col.AddWithValue("@Deleted", deleted);
        }

        private File MapSingleFile(IDataReader reader, ref int startingIndex)
        {
            File aFile = new File();

            aFile.Id = reader.GetSafeInt32(startingIndex++);
            aFile.Name = reader.GetSafeString(startingIndex++);
            aFile.Url = reader.GetSafeString(startingIndex++);
            aFile.FileType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            aFile.IsDeleted = reader.GetSafeBool(startingIndex++);
            aFile.CreatedBy = reader.GetSafeInt32(startingIndex++);
            aFile.DateCreated = reader.GetSafeDateTime(startingIndex++);

            return aFile;
        }

        private ExpiredFile MapSingleExpiredFile(IDataReader reader, ref int startingIndex)
        {
            ExpiredFile expiredFile = new ExpiredFile();

            expiredFile.Id = reader.GetSafeInt32(startingIndex++);
            expiredFile.IsDeleted = reader.GetSafeBool(startingIndex++);
            expiredFile.DateCreated = reader.GetSafeDateTime(startingIndex++);

            return expiredFile;
        }

        private File MapSingleFileWithUsername(IDataReader reader, ref int startingIndex)
        {
            File aFile = new File();
            aFile.User = new User();

            aFile.Id = reader.GetSafeInt32(startingIndex++);
            aFile.Name = reader.GetSafeString(startingIndex++);
            aFile.Url = reader.GetSafeString(startingIndex++);
            aFile.FileType = _lookUpService.MapSingleLookUp(reader, ref startingIndex); 
            aFile.IsDeleted = reader.GetSafeBool(startingIndex++);
            aFile.CreatedBy = reader.GetSafeInt32(startingIndex++);
            aFile.User.FirstName = reader.GetSafeString(startingIndex++);
            aFile.User.LastName = reader.GetSafeString(startingIndex++);
            aFile.DateCreated = reader.GetSafeDateTime(startingIndex++);

            return aFile;
        }
    }
}

