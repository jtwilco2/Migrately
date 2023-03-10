using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Videochat
{
    public class DailyMeeting
    {
        public int Id { get; set; }
        public int HostId { get; set; }
        public string HostFirstName { get; set; }
        public string HostLastName { get; set; }
        public string DailyRoomName { get; set; }
        public int Duration { get; set; }
        public int StartTime { get; set; }
        public List<Participant> Participants { get; set; }
    }
}
