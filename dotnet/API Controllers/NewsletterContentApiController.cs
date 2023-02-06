using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain.Newsletters;
using Sabio.Models.Requests.Newsletters;
using Sabio.Models;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Files;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace Sabio.Web.Api.Controllers
{


    [Route("api/newslettercontent")]
    [ApiController]
    public class NewsletterContentApiController : BaseApiController
    {
        private INewsletterContentService _service = null;
        private IAuthenticationService<int> _authService = null;
        public NewsletterContentApiController(INewsletterContentService service
            , ILogger<NewsletterContentApiController> logger
            , IAuthenticationService<int> authService) : base(logger)

        {
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<ItemsResponse<Paged<NewsletterContent>>> PagedAll(int pageIndex, int pageSize)
        {
            int code = 200;
            ActionResult result = null;
            try
            {
                Paged<NewsletterContent> paged = _service.PagedAll(pageIndex, pageSize);

                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {
                    ItemResponse<Paged<NewsletterContent>> response = new ItemResponse<Paged<NewsletterContent>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }

            return StatusCode(code, result);
        }

        [HttpGet("createdBy")]
        [AllowAnonymous]
        public ActionResult<ItemsResponse<Paged<NewsletterContent>>> CreatedByPaged(int pageIndex, int pageSize, int createdBy)
        {
            int code = 200;
            ActionResult result = null;
            try
            {
                Paged<NewsletterContent> paged = _service.CreatedByPaged(pageIndex, pageSize, createdBy);

                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {
                    ItemResponse<Paged<NewsletterContent>> response = new ItemResponse<Paged<NewsletterContent>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }

            return StatusCode(code, result);
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public ActionResult<ItemsResponse<NewsletterContent>> GetByNewsletterId(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<NewsletterContent> list = _service.GetByNewsletterId(id);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("No records found.");
                }
                else
                {
                    response = new ItemsResponse<NewsletterContent> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;

                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


        [HttpDelete("delete/{id:int}")]
        [Authorize(Roles = "Admin, SysAdmin")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {

                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);

        }

        [HttpPost]
        [Authorize(Roles = "Admin, SysAdmin")]
        public ActionResult<ItemResponse<int>> Insert(NewsletterContentAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int id = _service.Insert(model);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

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
        [Authorize(Roles = "Admin, SysAdmin")]
        public ActionResult<ItemResponse<int>> Update(NewsletterContentUpdateRequest model)
        {

            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

    }
}
