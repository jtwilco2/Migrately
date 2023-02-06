using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Locations
{
    public class LocationAddRequest
    {
        [Required]
        public int LocationTypeId { get; set; }
        [Required]
        public string LineOne { get; set; }
        public string LineTwo { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Zip { get; set; }
        [Required]
        public int StateId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        [Required]
        public int CreatedBy { get; set; }
        [Required]
        public int ModifiedBy { get; set; }
    }
}
