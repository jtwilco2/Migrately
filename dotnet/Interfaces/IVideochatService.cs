﻿using Sabio.Models;
using Sabio.Models.Domain.Videochat;
using Sabio.Models.Requests.Videochat;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IVideochatService
    {
        Task<DailyResponse> CreateRoom();
        decimal GetTime();
        Task<DailyResponse> GetRoomByName(string name);
        Task<DailyRoomMeetingsResponse> GetRoomMeetingInformation(string name);
        List<DailyMeeting> GetAllMeetings();
        int AddMeeting(DailyMeetingAddRequest model);
        int AddParticipant(ParticipantAddRequest model);
        Paged<DailyMeeting> GetAllMeetingsPaginated(int pageIndex, int pageSize);
        List<DailyMeeting> GetAllMeetingsByHostId(int hostId);
    }
}