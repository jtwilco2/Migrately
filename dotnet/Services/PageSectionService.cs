using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain.PageSection;
using Sabio.Models.Requests.PageSection;
using Sabio.Services.Interfaces;
using System.Data;
using System.Data.SqlClient;


namespace Sabio.Services
{
    public class PageSectionService : IPageSectionService
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;

        public PageSectionService(IAuthenticationService<int> authenticationService, IDataProvider dataProvider)
        {
            _authenticationService = authenticationService;
            _dataProvider = dataProvider;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[PageSection_Delete]";
            _dataProvider.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            });
        }
        public PageSection GetById(int id)
        {

            string procName = "[dbo].[PageSection_SelectById]";
            PageSection pageSection = null;

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {

                pageSection = MapSinglePageSection(reader);

            }
            );

            return pageSection;
        }
        public int Add(PageSectionAddRequest model)
        {
            int id = 0;

            string procName = "[dbo].[PageSection_Insert]";

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
        public void Update(PageSectionUpdateRequest model)
        {
            string procName = "[dbo].[PageSection_Update]";
            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);


            }, returnParameters: null);
        }
        private static PageSection MapSinglePageSection(IDataReader reader)
        {
            PageSection aPageSection = new PageSection();
            int startingIndex = 0;

            aPageSection.Id = reader.GetSafeInt32(startingIndex++);
            aPageSection.PageTranslationId = reader.GetSafeInt32(startingIndex++);
            aPageSection.Name = reader.GetSafeString(startingIndex++);
            aPageSection.Component = reader.GetSafeString(startingIndex++);

            return aPageSection;
        }
        private static void AddCommonParams(PageSectionAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@PageTranslationId", model.PageTranslationId);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Component", model.Component);
        }
    }
}
