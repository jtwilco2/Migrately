using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Licenses
{
    public class LicenseAddRequest
    {
        [Required]
        public int LicenseState { get; set; }

        [Required]
        public string LicenseNumber { get; set; }

        public DateTime? DateAdmitted { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        [Required]
        public bool IsActive { get; set; }
    }
}
