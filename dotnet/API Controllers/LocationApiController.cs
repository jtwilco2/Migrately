using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Locations;
using Sabio.Models.Requests.Locations;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/locations")]
    [ApiController]
    public class LocationApiController : BaseApiController
    {
        private ILocationService _service = null;
        private IAuthenticationService<int> _authService = null;
        public LocationApiController(ILocationService service, ILogger<LocationApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> CreateLocation(LocationAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddLocation(model,userId);
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

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> DeleteLocation(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteLocation(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> UpdateLocation(LocationUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateLocation(model,userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
        
        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Location>>> LocationPaginatedCreatedBy(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try

            {
                int userId = _authService.GetCurrentUserId();
                Paged<Location> page = _service.LocationPaginatedCreatedBy(pageIndex, pageSize, userId);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Location>> { Item = page };
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

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Location>>> LocationSearchDetails(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try

            {
                int userId = _authService.GetCurrentUserId();
                Paged<Location> page = _service.LocationSearchDetails(pageIndex, pageSize, query,userId);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Location>> { Item = page };
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

    }
}
