using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Models.Requests;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models.Domain.Videochat;
using System.Threading.Tasks;
using SendGrid;
using Sabio.Models.Domain.Comments;
using System.Collections.Generic;
using Sabio.Models.Requests.Videochat;
using Sabio.Models;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/videochat")]
    [ApiController]
    public class VideochatApiController : BaseApiController
    {
        private IVideochatService _service = null;
        private IAuthenticationService<int> _authService = null;
        public VideochatApiController(IVideochatService service
            , ILogger<VideochatApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<DailyResponse> CreateRoom()
        {
            ObjectResult result = null;

            try
            {
                DailyResponse room = _service.CreateRoom().Result;
                ItemResponse<DailyResponse> response = new ItemResponse<DailyResponse>() { Item = room };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;

        }

        [HttpGet("room")]
        public ActionResult<DailyResponse> GetRoomByName(string name)
        {
            ObjectResult result = null;

            try
            {
                DailyResponse room = _service.GetRoomByName(name).Result;
                ItemResponse<DailyResponse> response = new ItemResponse<DailyResponse>() { Item = room };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;

        }

        [HttpGet("meeting")]
        public ActionResult<DailyRoomMeetingsResponse> GetRoomMeetingInformation(string name)
        {
            ObjectResult result = null;

            try
            {
                DailyRoomMeetingsResponse room = _service.GetRoomMeetingInformation(name).Result;
                ItemResponse<DailyRoomMeetingsResponse> response = new ItemResponse<DailyRoomMeetingsResponse>() { Item = room };

                if (response == null)
                {
                    result = StatusCode(500, "Error getting Room Information");
                }
                else
                {
                    result = Created201(response);
                }

            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;

        }

        [HttpGet("meetings")]
        public ActionResult<ItemsResponse<DailyMeeting>> GetAllRooms()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<DailyMeeting> list = _service.GetAllMeetings();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    response = new ItemsResponse<DailyMeeting> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("meetingsby")]
        public ActionResult<ItemsResponse<DailyMeeting>> GetAllRoomsByHostId(int hostId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<DailyMeeting> list = _service.GetAllMeetingsByHostId(hostId);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    response = new ItemsResponse<DailyMeeting> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPost("meetings")]
        public ActionResult<ItemResponse<int>> AddRoom(DailyMeetingAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int id = _service.AddMeeting(model);

                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPost("participants")]
        public ActionResult<ItemResponse<int>> AddParticipant(ParticipantAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int id = _service.AddParticipant(model);

                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpGet("meetings/paginate")]
        public ActionResult<ItemsResponse<Paged<DailyMeeting>>> GetAllMeetingPaginated(int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<DailyMeeting> paged = _service.GetAllMeetingsPaginated(pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<DailyMeeting>> response = new ItemResponse<Paged<DailyMeeting>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }
    }
}

