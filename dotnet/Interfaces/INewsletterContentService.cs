using Sabio.Models.Domain.Newsletters;
using Sabio.Models.Requests.Newsletters;
using Sabio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Files;

namespace Sabio.Services.Interfaces
{
    public interface INewsletterContentService
    {
        Paged<NewsletterContent> PagedAll(int pageIndex, int pageSize);
        Paged<NewsletterContent> CreatedByPaged(int pageIndex, int pageSize, int createdBy);
        List<NewsletterContent> GetByNewsletterId(int id);
        void Delete(int Id);
        int Insert(NewsletterContentAddRequest model);
        void Update(NewsletterContentUpdateRequest model);

    }
}
