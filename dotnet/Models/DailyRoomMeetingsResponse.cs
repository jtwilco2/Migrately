﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Videochat
{
    public class DailyRoomMeetingsResponse
    {  
       public int Total_Count { get; set; }
       public List<DailyRoomMeetingInfo> Data { get; set; }
        
    }
}
