using Sabio.Models.Domain.Newsletters;
using Sabio.Models.Requests.Newsletters;
using Sabio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface INewsletterTemplateService
    {
        Paged<NewsletterTemplate> PagedAll(int pageIndex, int pageSize);
        public NewsletterTemplate GetById(int id);
        void Delete(int Id);
        int Insert(NewsletterTemplateAddRequest model);
        void Update(NewsletterTemplateUpdateRequest model);
    }
}
