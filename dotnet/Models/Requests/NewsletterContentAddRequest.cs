using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Newsletters
{
    public class NewsletterContentAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int NewsletterId { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int TemplateKeyId { get; set; }
        [Required]
        [Range(0, 10000)]
        public int ContentOrder { get; set; }
        [Required]
        [MaxLength(4000)]
        public string Value { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int CreatedBy { get; set; }
    }
}
