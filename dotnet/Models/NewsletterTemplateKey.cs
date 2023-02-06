using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Newsletters
{
    public class NewsletterTemplateKey
    {
        public int Id { get; set; }
        public LookUp KeyTypeId { get; set; }
        public NewsletterTemplate NewsletterTemplate { get; set; }
        public string KeyName { get; set; }
    }
}
