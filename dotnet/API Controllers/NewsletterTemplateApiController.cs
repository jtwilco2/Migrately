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
using Microsoft.AspNetCore.Authorization;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/newslettertemplates")]
    [ApiController]
    public class NewsletterTemplateApiController : BaseApiController
    {
        private INewsletterTemplateService _service = null;
        private IAuthenticationService<int> _authService = null;
        public NewsletterTemplateApiController(INewsletterTemplateService service
            , ILogger<NewsletterTemplateApiController> logger
            , IAuthenticationService<int> authService) : base(logger)

        {
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<ItemsResponse<Paged<NewsletterTemplate>>> PagedAll(int pageIndex, int pageSize)
        {
            int code = 200;
            ActionResult result = null;
            try
            {
                Paged<NewsletterTemplate> paged = _service.PagedAll(pageIndex, pageSize);

                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {
                    ItemResponse<Paged<NewsletterTemplate>> response = new ItemResponse<Paged<NewsletterTemplate>>();
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
        public ActionResult<ItemResponse<NewsletterTemplate>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                NewsletterTemplate newsletterTemplate = _service.GetById(id);
                if (newsletterTemplate == null)
                {
                    code = 404;
                    response = new ErrorResponse("External Link not Found");
                }
                else
                {
                    response = new ItemResponse<NewsletterTemplate> { Item = newsletterTemplate };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: ${ex.Message}");
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
        public ActionResult<ItemResponse<int>> Insert(NewsletterTemplateAddRequest model)
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
        public ActionResult<ItemResponse<int>> Update(NewsletterTemplateUpdateRequest model)
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
