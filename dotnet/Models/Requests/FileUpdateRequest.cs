using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class FileUpdateRequest
    {
        [Required]
        public bool IsDeleted { get; set; }
        public int Id { get; set; }
    }
}
