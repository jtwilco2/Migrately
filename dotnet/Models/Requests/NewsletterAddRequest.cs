using Sabio.Models.Domain.Newsletters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Newsletters
{
    public class NewsletterAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int TemplateId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [MaxLength(255)]
        public string CoverPhoto { get; set; }
        [Required]
        public DateTime DateToPublish { get; set; }
        [Required]
        public DateTime DateToExpire { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int CreatedBy { get; set; }
        public List<NewsletterContent> Content { get; set; }

    }
}
