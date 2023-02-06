using Sabio.Models.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Newsletters
{
    public class NewsletterContent
    {
        public int Id { get; set; }
        public Newsletter Newsletter { get; set; }
        public NewsletterTemplateKey NewsletterTemplateKey { get; set; }
        public NewsletterTemplate NewsletterTemplate { get; set; }
        public int ContentOrder { get; set; }
        public string Value { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public User User { get; set; }
    }
}
