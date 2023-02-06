using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Utilities;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.NewsletterSubscriptions;
using Sabio.Models.Requests.NewsletterSubscriptions;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Drawing.Printing;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/newsletterSubscription")]
    [ApiController]
    public class NewsletterSubscriptionApiController : BaseApiController
    {
        private INewsletterSubscriptionService _service = null;
        private IAuthenticationService<int> _authService = null;

        public NewsletterSubscriptionApiController(INewsletterSubscriptionService service
            , ILogger<NewsletterSubscriptionApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;

        }

        [HttpPost]
        public ActionResult<ItemResponse<string>> Create(NewsletterSubscriptionAddRequest model)
        {

            ObjectResult result = null;

            try
            {
                string email = _service.Add(model);
                ItemResponse<string> response = new ItemResponse<string>() { Item = email };

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

        [HttpPut("email")]
        public ActionResult<SuccessResponse> Update(NewsletterSubscriptionAddRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateSubscription(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("email")]
        public ActionResult<ItemResponse<Paged<NewsletterSubscription>>> GetAllPageinate(int pageIndex, int pageSize, string email)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<NewsletterSubscription> page = _service.GetByCreatedBy(pageIndex, pageSize, email);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<NewsletterSubscription>> { Item = page };
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
        public ActionResult<ItemResponse<Paged<NewsletterSubscription>>> GetAllPageinate(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<NewsletterSubscription> page = _service.GetAllPaginated(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<NewsletterSubscription>> { Item = page };
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

        [HttpGet]
        public ActionResult<ItemResponse<Paged<NewsletterSubscription>>> GetAll(int pageIndex, int pageSize)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<NewsletterSubscription> page = _service.GetAllSubscribed(pageIndex, pageSize);

                if (page == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App Resource Not Found.");
                }
                else
                {
                    response = new ItemResponse<Paged<NewsletterSubscription>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }
    }
}

