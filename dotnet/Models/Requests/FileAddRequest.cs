using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Sabio.Models.Requests
{
    public class FileAddRequest 
    {
		[Required]
		[MaxLength(255)]
		public string Name { get; set; }
        [Required]
        [MaxLength(255)]
        public string Url { get; set; }
        [Required]
        [MaxLength(50)]
        public int FileTypeName { get; set; }
        [Required]
        public bool IsDeleted { get; set; }
        [Required]
        [Range(minimum: 1, int.MaxValue)]
        public int CreatedBy { get; set; }
		public int Id { get; set; }
    }
}
