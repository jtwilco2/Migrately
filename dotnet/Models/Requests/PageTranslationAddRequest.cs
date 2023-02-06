using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.PageTranslation
{
    public class PageTranslationAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int LanguageId { get; set; }
        [Required]
        [MaxLength(255)]
        public string Link { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        public int CreatedBy { get; set; }
    }
}
