using Microsoft.AspNetCore.Http;
using Sabio.Models.Domain.Files;
using Sabio.Models.Requests;
using Sabio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain.Newsletters;
using Sabio.Models.Requests.Newsletters;

namespace Sabio.Services.Interfaces
{
    public interface INewsletterService
    {
        Paged<Newsletter> PagedAll(int pageIndex, int pageSize);
        Paged<Newsletter> QueryPaged(int pageIndex, int pageSize, string query); 
        void Delete(int Id);
        void DeleteComposite(int Id);
        int Insert(NewsletterAddRequest model);
        int InsertComposite(NewsletterAddRequest model);
        void Update(NewsletterUpdateRequest model);
        void UpdateComposite(NewsletterUpdateRequest model);

    }
}
