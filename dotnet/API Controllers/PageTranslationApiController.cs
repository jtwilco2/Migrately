using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models.Requests.PageTranslation;
using Sabio.Models.Domain.PageTranslation;
using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/pagetranslations")]
    [ApiController]
    public class PageTranslationApiController : BaseApiController
    {
        private IPageTranslationService _pageTranslationService;
        private IAuthenticationService<int> _authenticationService;
    

    public PageTranslationApiController(IPageTranslationService service, ILogger<PageTranslationApiController> logger, IAuthenticationService<int> authService) : base(logger)
    {
        _pageTranslationService = service;
        _authenticationService = authService;
    }

    [HttpGet()]
    public ActionResult<ItemResponse<PageTranslation>> GetByLanguage(string link, int languageId)
    {
        int sCode = 200;
        BaseResponse response = null;

        try
        {
            PageTranslation pageTranslation = _pageTranslationService.GetByLanguage(link, languageId);

            if (pageTranslation == null)
            {
                sCode = 404;
                response = new ErrorResponse("Application Resource not found.");
            }
            else
            {
                response = new ItemResponse<PageTranslation> { Item = pageTranslation };
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

        [AllowAnonymous]
        [HttpGet("v2/{languageId:int}")]
        public ActionResult<ItemResponse<PageTranslationV2>> GetByLanguageV2(int languageId)
        {
            int sCode = 200;
            BaseResponse response = null;

            try
            {
                List<PageTranslationV2> pageTranslations = _pageTranslationService.GetByLanguageV2(languageId);

                if (pageTranslations == null)
                {
                    sCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<List<PageTranslationV2>> { Item = pageTranslations };
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

        [HttpGet("paginate")]
    public ActionResult<ItemResponse<Paged<PageTranslation>>>GetAll(int pageIndex, int pageSize)
    {
        ActionResult result = null;

        try
        {
            Paged<PageTranslation> paged = _pageTranslationService.GetAll(pageIndex, pageSize);
            if (paged == null)
            {
                result = NotFound404(new ErrorResponse("Records Not Found"));
            }
            else
            {
                ItemResponse<Paged<PageTranslation>> response = new ItemResponse<Paged<PageTranslation>>();
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
        [AllowAnonymous]
        [HttpGet("V2/paginate")]
        public ActionResult<ItemResponse<Paged<PageTranslationV2>>> GetAllV2Paged(int pageIndex, int pageSize)
        {
            ActionResult result = null;

            try
            {
                Paged<PageTranslationV2> paged = _pageTranslationService.GetAllV2Paged(pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<PageTranslationV2>> response = new ItemResponse<Paged<PageTranslationV2>>();
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

        [HttpPost]
    public ActionResult<ItemResponse<int>> Create(PageTranslationAddRequest model)
    {
        ObjectResult result = null;

        try
        {
            model.CreatedBy = _authenticationService.GetCurrentUserId();

            int id = _pageTranslationService.Add(model);

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

        [HttpPost("v2")]
        public ActionResult<ItemResponse<int>> CreateV2(PageTranslationAddRequestV2 model)
        {
            ObjectResult result = null;

            try
            {
                model.CreatedBy = _authenticationService.GetCurrentUserId();

                int id = _pageTranslationService.AddV2(model);

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
    public ActionResult<SuccessResponse> Update(PageTranslationUpdateRequest model)
        {
            int sCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authenticationService.GetCurrentUserId();

                _pageTranslationService.Update(model);

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
                _pageTranslationService.Delete(id);

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