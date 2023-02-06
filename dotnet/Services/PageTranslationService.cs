using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.PageTranslation;
using Sabio.Models.Requests.PageTranslation;
using Sabio.Services.Interfaces;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Sabio.Models.Domain.Languages;
using Sabio.Models.Domain.PageSection;
using System;

namespace Sabio.Services
   
{
    public class PageTranslationService : IPageTranslationService
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;

        public PageTranslationService(IAuthenticationService<int> authenticationService, IDataProvider dataProvider)
        {
            _authenticationService = authenticationService;
            _dataProvider = dataProvider;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[PageTranslations_Delete]";
            _dataProvider.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            });
        }
        public PageTranslation GetByLanguage(string link, int languageId)
        {
            int index = 0;
            PageTranslation pageTranslation = null;

            string procName = "[dbo].[PageTranslations_Select_PageByLanguage]";
            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Link", link);
                col.AddWithValue("@LanguageId", languageId);
            }
            , delegate (IDataReader reader, short set)
            {
                pageTranslation = new PageTranslation();
                pageTranslation = MapSinglePageTranslation(reader, ref index);
            });

            return pageTranslation;
        }

        public List<PageTranslationV2> GetByLanguageV2(int languageId)
        {
            
            List<PageTranslationV2> pageTranslations = null;

            string procName = "[dbo].[PageTranslations_Select_PageByLanguageV2]";
            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@LanguageId", languageId);
            }
            , delegate (IDataReader reader, short set)
            {

                PageTranslationV2 pageTranslation = MapSinglePageTranslationV2(reader);

                if (pageTranslations == null)
                {
                    pageTranslations = new List<PageTranslationV2>();
                }
                pageTranslations.Add(pageTranslation);
            });

            return pageTranslations;
        }

        public Paged<PageTranslation> GetAll(int pageIndex, int pageSize)
        {
            Paged<PageTranslation> pagedList = null;
            List<PageTranslation> list = null;
            int totalCount = 0;
            _dataProvider.ExecuteCmd(
                "[dbo].[PageTranslations_SelectAll]",
                (param) =>

                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {

                    int index = 0;
                    PageTranslation pageTranslation = MapSinglePageTranslation(reader, ref index);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index++);
                    }
                    if (list == null)
                    {
                        list = new List<PageTranslation>();
                    }

                    list.Add(pageTranslation);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<PageTranslation>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<PageTranslationV2> GetAllV2Paged(int pageIndex, int pageSize)
        {
            Paged<PageTranslationV2> pagedList = null;
            List<PageTranslationV2> list = null;
            int totalCount = 0;
            _dataProvider.ExecuteCmd(
                "[dbo].[PageTranslations_SelectAllV2]",
                (param) =>

                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {

                    int index = 0;
                    PageTranslationV2 pageTranslation = MapSinglePageTranslationV2Paged(reader, ref index);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index++);
                    }
                    if (list == null)
                    {
                        list = new List<PageTranslationV2>();
                    }

                    list.Add(pageTranslation);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<PageTranslationV2>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public int Add(PageTranslationAddRequest model)
        {
            int id = 0;

            string procName = "[dbo].[PageTranslations_Insert]";

            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);

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

        public int AddV2(PageTranslationAddRequestV2 model)
        {
            int id = 0;

            string procName = "[dbo].[PageTranslations_InsertV2]";

            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParamsV2(model, col);

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

        public void Update(PageTranslationUpdateRequest model)
        {
            string procName = "[dbo].[PageTranslations_Update]";
            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@LanguageId", model.LanguageId);
                col.AddWithValue("@Link", model.Link);
                col.AddWithValue("@Name", model.Name);
                col.AddWithValue("@Id", model.Id);


            }, returnParameters: null);
        }

        private static PageTranslation MapSinglePageTranslation(IDataReader reader, ref int index)
        {
            PageTranslation aPageTranslation = new PageTranslation();

            aPageTranslation.Id = reader.GetSafeInt32(index++);
            aPageTranslation.LanguageId = reader.GetSafeInt32(index++);
            aPageTranslation.Link = reader.GetSafeString(index++);
            aPageTranslation.Name = reader.GetSafeString(index++);
            aPageTranslation.DateCreated = reader.GetSafeDateTime(index++);
            aPageTranslation.DateModified = reader.GetSafeDateTime(index++);
            aPageTranslation.CreatedBy = reader.GetSafeInt32(index++);
            aPageTranslation.IsActive = reader.GetSafeBool(index++);

            return aPageTranslation;
        }

        private static PageTranslationV2 MapSinglePageTranslationV2(IDataReader reader)
        {
            PageTranslationV2 aPageTranslation = new PageTranslationV2();
            int index = 0;

            aPageTranslation.Id = reader.GetSafeInt32(index++);
            aPageTranslation.Link = reader.GetSafeString(index++);
            aPageTranslation.Language = reader.DeserializeObject<List<Language>>(index++);
            aPageTranslation.PageSection = reader.DeserializeObject<List<PageSectionV2>>(index++);

            return aPageTranslation;
        }

        private static PageTranslationV2 MapSinglePageTranslationV2Paged(IDataReader reader, ref int index)
        {
            PageTranslationV2 aPageTranslation = new PageTranslationV2();

            aPageTranslation.Id = reader.GetSafeInt32(index++);
            aPageTranslation.Link = reader.GetSafeString(index++);
            aPageTranslation.Language = reader.DeserializeObject<List<Language>>(index++);
            aPageTranslation.PageSection = reader.DeserializeObject<List<PageSectionV2>>(index++);

            return aPageTranslation;
        }

        private static void AddCommonParams(PageTranslationAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@LanguageId", model.LanguageId);
            col.AddWithValue("@Link", model.Link);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@CreatedBy", model.CreatedBy);
        }

        private static void AddCommonParamsV2(PageTranslationAddRequestV2 model, SqlParameterCollection col)
        {
            col.AddWithValue("@LanguageId", model.LanguageId);
            col.AddWithValue("@Link", model.Link);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@CreatedBy", model.CreatedBy);
            col.AddWithValue("@Section", model.Section);
            col.AddWithValue("@Component", model.Component);
            col.AddWithValue("@PageSectionId", model.PageSectionId);
            col.AddWithValue("@KeyName", model.KeyName);
            col.AddWithValue("@Text", model.Text);
            col.AddWithValue("@PageSectionKeyId", model.PageSectionKeyId);
        }
    }
}

