using Sabio.Models.Domain.NewsletterSubscriptions;
using Sabio.Models;
using Sabio.Models.Requests.NewsletterSubscriptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface INewsletterSubscriptionService
    {
        string Add(NewsletterSubscriptionAddRequest model);
        void UpdateSubscription(NewsletterSubscriptionAddRequest model);
        Paged<NewsletterSubscription> GetAllPaginated(int pageIndex, int pageSize);
        Paged<NewsletterSubscription> GetByCreatedBy(int pageIndex, int pageSize, string email);
        Paged<NewsletterSubscription> GetAllSubscribed(int pageIndex, int pageSize);
    }
}
