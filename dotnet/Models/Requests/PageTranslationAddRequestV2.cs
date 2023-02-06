using System;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.PageTranslation
{
    public class PageTranslationAddRequestV2
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

        [Required]
        [MaxLength(100)]
        public string Section { get; set; }
        [Required]
        [MaxLength(100)]
        public string Component { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int PageSectionId { get; set; }

        [Required]
        [MaxLength(50)]
        public string KeyName { get; set; }

        [Required]
        [MaxLength(4000)]
        public string Text { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int PageSectionKeyId { get; set; }

    }
}
