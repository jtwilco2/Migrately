using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Models;
using Sabio.Web.Models.Responses;
using Stripe;
using System;
using Sabio.Models.Domain.Attorneys;
using Sabio.Models.Requests.Attorneys;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/attorneys")]
    [ApiController]
    public class AttorneyApiController : BaseApiController
    {
        private IAttorneyService _attorneyService = null;
        private IAuthenticationService<int> _authService = null;

        public AttorneyApiController(IAttorneyService attorneyService
            , ILogger<AttorneyApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _attorneyService = attorneyService;
            _authService = authService;
        }

        [Authorize(Roles="Attorney")]
        [HttpGet("attorney/current")]
        public ActionResult<ItemResponse<Attorney>> GetByUserId()
        {
            int iCode = 200;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();

            try
            {
                Attorney attorney = _attorneyService.SelectByUserId(userId);

                if (attorney == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Attorney profile not found.");
                }
                else
                {
                    response = new ItemResponse<Attorney> { Item = attorney };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);
        }


        [HttpGet]
        public ActionResult<ItemsResponse<Attorney>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Attorney> list = _attorneyService.SelectAll();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Attorney profiles not found.");
                }
                else
                {
                    response = new ItemsResponse<Attorney> { Items = list };
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

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Attorney>>> SelectAllPaginate(int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<Attorney> paged = _attorneyService.SelectByPage(pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<Attorney>> response = new ItemResponse<Paged<Attorney>>();
                    response.Item = paged;
                    result = Ok(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Attorney>>> Select_ByLanguage(int pageIndex, int pageSize, string language)
        {
            ActionResult result = null;
            try
            {
                Paged<Attorney> paged = _attorneyService.SelectByLanguage(pageIndex, pageSize, language);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<Attorney>> response = new ItemResponse<Paged<Attorney>>();
                    response.Item = paged;
                    result = Ok(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        [HttpPut("delete/{id:int}")]
        public ActionResult<SuccessResponse> AttorneyInactive(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _attorneyService.Delete(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }


            return StatusCode(code, response);
        }

        [HttpGet("specialty")]
        public ActionResult<ItemsResponse<Attorney>> GetBySpecialty(string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Attorney> list = _attorneyService.SelectByBioQuery(query);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Attorney profiles not found.");
                }
                else
                {
                    response = new ItemsResponse<Attorney> { Items = list };
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

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(AttorneyAddRequest model)
        {
            int userId = _authService.GetCurrentUserId();
            ObjectResult result = null;

            try
            {
                int id = _attorneyService.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int> { Item = id };
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

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> AttorneyUpdate(AttorneyUpdateRequest model)
        {
            int userId = _authService.GetCurrentUserId();
            int code = 200;
            BaseResponse response = null;

            try
            {
                _attorneyService.Update(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
    }
}
