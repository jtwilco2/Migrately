using Sabio.Models.Domain.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Licenses
{
    public class License
    {
        public int Id { get; set; }
        public State LicenseState { get; set; }
        public string LicenseNumber { get; set; }
        public DateTime DateAdmitted { get; set; }
        public int CreatedBy { get; set; }
        public User User { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsActive { get; set; }

    }
}
