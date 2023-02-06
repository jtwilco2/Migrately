using Sabio.Models.Domain.PageSection;
using Sabio.Models.Requests.PageSection;

namespace Sabio.Services.Interfaces
{
    public interface IPageSectionService
    {
        int Add(PageSectionAddRequest model);
        void Delete(int id);
        PageSection GetById(int id);
        void Update(PageSectionUpdateRequest model);
    }
}