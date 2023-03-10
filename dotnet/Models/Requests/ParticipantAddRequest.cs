using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Videochat
{
    public class ParticipantAddRequest
    {
        [Required]
        [Range(minimum: 1, int.MaxValue)]
        public int UserId { get; set; }
        [Required]
        public string DailyRoomName { get; set; }
        [Required]
        public int Duration { get; set; }
        [Required]
        public int TimeJoined { get; set; }
    }
}
