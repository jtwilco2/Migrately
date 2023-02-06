using Microsoft.AspNetCore.Mvc;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Microsoft.Extensions.Logging;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models.Domain.PageSection;
using Sabio.Models.Requests.PageSection;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/pagesection")]
    [ApiController]
    public class PageSectionApiController : BaseApiController
    {
        private IPageSectionService _pageSectionService;
        private IAuthenticationService<int> _authenticationService;

        public PageSectionApiController(IPageSectionService service, ILogger<PageTranslationApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _pageSectionService = service;
            _authenticationService = authService;
        }
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<PageSection>> GetById(int id)
        {
            int sCode = 200;
            BaseResponse response = null;

            try
            {
                PageSection pageSection = _pageSectionService.GetById(id);

                if (pageSection == null)
                {
                    sCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<PageSection> { Item = pageSection };
                }
            }
            catch (Exception ex)
            {
                sCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(sCode, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(PageSectionAddRequest model)
        {
            ObjectResult result = null;

            try
            {

                int id = _pageSectionService.Add(model);

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

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(PageSectionUpdateRequest model)
        {
            int sCode = 200;
            BaseResponse response = null;

            try
            {

                _pageSectionService.Update(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                sCode = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(sCode, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> DeleteById(int id)
        {
            int sCode = 200;
            BaseResponse response = null; //do not declare an instance.

            try
            {
                _pageSectionService.Delete(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                sCode = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(sCode, response);
        }
    }
}
