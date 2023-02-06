using Sabio.Models.Domain.Languages;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Advertisements
{
    public class AdvertisementAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int AdTierId { get; set; }

        [Required]
        [MinLength(1), MaxLength(100)]
        public string Title { get; set; }

        [AllowNull]
        public string AdMainImage { get; set; }

        [AllowNull]
        public string Details { get; set; }

        [Required]
        public DateTime DateStart { get; set; }

        [Required]
        public DateTime DateEnd { get; set; }
    }
}
