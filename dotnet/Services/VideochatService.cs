using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Config;
using Sabio.Models.Domain.Videochat;
using Sabio.Models.Requests.Videochat;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing.Printing;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class VideochatService : IVideochatService
    {
        IDataProvider _data = null;
        private DailyConfig _daily = null;

        public VideochatService(IDataProvider data, IOptions<DailyConfig> daily)
        {
            _data = data;
            _daily = daily.Value;
        }

        public decimal GetTime()
        {
            var time = (DateTime.Now.ToUniversalTime() - new DateTime(1970, 1, 1));
            return (decimal)(time.TotalMilliseconds + 0.5);
        }
        public async Task<DailyResponse> CreateRoom()
        {
            string apiKey = _daily.DailyApiKey;

            DailyResponse dailyResponse = null;

            var url = "https://api.daily.co/v1/rooms/";

            using var client = new HttpClient();

            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

            var body = new
            {
                properties = new
                {
                    enable_chat = true,
                    start_audio_off = true,
                    exp = (int)Math.Round(GetTime() / 1000) + 3600
                }
            };
        
            var response = await client.PostAsJsonAsync(url, body);

            var result = await response.Content.ReadAsStringAsync();

            if (result != null)
            {
                dailyResponse = JsonConvert.DeserializeObject<DailyResponse>(result);
            }
            return dailyResponse;
        }

        public async Task<DailyResponse> GetRoomByName(string name)
        {
            string apiKey = _daily.DailyApiKey;

            DailyResponse dailyResponse = null;

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, $"https://api.daily.co/v1/rooms/" + name);

            using var client = new HttpClient();

            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

            var response = await client.SendAsync(request);

            var result = await response.Content.ReadAsStringAsync();

            if (result != null)
            {
                dailyResponse = JsonConvert.DeserializeObject<DailyResponse>(result);
            }
            return dailyResponse;
        }

        public async Task<DailyRoomMeetingsResponse> GetRoomMeetingInformation(string name)
        {
            string apiKey = _daily.DailyApiKey;

            DailyRoomMeetingsResponse meetingResponse = null;

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, $"https://api.daily.co/v1/meetings?room=" + name);

            using var client = new HttpClient();

            request.Headers.Add("Authorization", $"Bearer {apiKey}");
            request.Content = new StringContent("");
            request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            HttpResponseMessage response = await client.SendAsync(request);
            response.EnsureSuccessStatusCode();

            string result = await response.Content.ReadAsStringAsync();

            if (result != null)
            {
                meetingResponse = JsonConvert.DeserializeObject<DailyRoomMeetingsResponse>(result);
            }
            return meetingResponse;
        }

        public List<DailyMeeting> GetAllMeetings()
        {
            string procName = "[dbo].[DailyMeetings_SelectAll]";
            List<DailyMeeting> list = null;

            _data.ExecuteCmd(procName, inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    DailyMeeting meeting = MapSingleDailyMeeting(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<DailyMeeting>();
                    }
                    list.Add(meeting);
                });
            return list;
        }

        public List<DailyMeeting> GetAllMeetingsByHostId(int hostId)
        {
            string procName = "[dbo].[DailyMeetings_SelectByHostId]";
            List<DailyMeeting> list = null;

            _data.ExecuteCmd(procName, 
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@HostId", hostId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    DailyMeeting meeting = MapSingleDailyMeeting(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<DailyMeeting>();
                    }
                    list.Add(meeting);
                });
            return list;
        }

        public int AddMeeting(DailyMeetingAddRequest model)
        {
            int id = 0;
            string procName = "[dbo].[DailyMeetings_Insert]";

            _data.ExecuteNonQuery(procName, 
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@HostId", model.HostId);
                    col.AddWithValue("@DailyRoomName", model.DailyRoomName);
                    col.AddWithValue("@Duration", model.Duration);
                    col.AddWithValue("@StartTime", model.StartTime);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);

                }, returnParameters: delegate (SqlParameterCollection returnCollection)
                {

                    object old = returnCollection["@Id"].Value;

                    int.TryParse(old.ToString(), out id);

                });
            return id;
        }

        public Paged<DailyMeeting> GetAllMeetingsPaginated(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[DailyMeetings_SelectAllPaginated]";
            Paged<DailyMeeting> pagedList = null;
            List<DailyMeeting> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    DailyMeeting meeting = MapSingleDailyMeeting(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<DailyMeeting>();
                    }
                    list.Add(meeting);
                });
            if (list != null)
            {
                pagedList = new Paged<DailyMeeting>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public int AddParticipant(ParticipantAddRequest model)
        {
            int id = 0;
            string procName = "[dbo].[DailyParticipants_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@UserId", model.UserId);
                    col.AddWithValue("@DailyRoomName", model.DailyRoomName);
                    col.AddWithValue("@Duration", model.Duration);
                    col.AddWithValue("@TimeJoined", model.TimeJoined);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);

                }, returnParameters: delegate (SqlParameterCollection returnCollection)
                {

                    object old = returnCollection["@Id"].Value;

                    int.TryParse(old.ToString(), out id);

                });
            return id;
        }
        private static DailyMeeting MapSingleDailyMeeting(IDataReader reader, ref int startingIndex)
        {
            DailyMeeting meeting = new DailyMeeting();

            meeting.Id = reader.GetSafeInt32(startingIndex++);
            meeting.HostId = reader.GetSafeInt32(startingIndex++);
            meeting.HostFirstName = reader.GetSafeString(startingIndex++);
            meeting.HostLastName = reader.GetSafeString(startingIndex++);
            meeting.DailyRoomName = reader.GetSafeString(startingIndex++);
            meeting.Duration = reader.GetSafeInt32(startingIndex++);
            meeting.StartTime = reader.GetSafeInt32(startingIndex++);
            meeting.Participants = reader.DeserializeObject<List<Participant>>(startingIndex++);
            return meeting;
        }

    }
}
