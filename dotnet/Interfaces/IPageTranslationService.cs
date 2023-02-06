using Sabio.Models;
using Sabio.Models.Domain.PageTranslation;
using Sabio.Models.Requests.PageTranslation;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IPageTranslationService
    {
        int Add(PageTranslationAddRequest model);
        int AddV2(PageTranslationAddRequestV2 model);
        void Delete(int id);
        Paged<PageTranslation> GetAll(int pageIndex, int pageSize);
        Paged<PageTranslationV2> GetAllV2Paged(int pageIndex, int pageSize);

        PageTranslation GetByLanguage(string link, int languageId);
        void Update(PageTranslationUpdateRequest model);

        List<PageTranslationV2> GetByLanguageV2(int languageId);
    }
}