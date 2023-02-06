using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.PageSection
{
    public class PageSectionAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int PageTranslationId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [MaxLength(100)]
        public string Component { get; set; }
    }
}
