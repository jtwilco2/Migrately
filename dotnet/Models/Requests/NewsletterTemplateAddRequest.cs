using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Newsletters
{
    public class NewsletterTemplateAddRequest
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [MaxLength(200)]
        public string Description { get; set; }
        [Required]
        [MaxLength(255)]
        public string PrimaryImage { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int CreatedBy { get; set; }
    }
}
