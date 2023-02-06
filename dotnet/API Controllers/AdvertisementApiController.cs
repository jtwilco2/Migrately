﻿using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models.Domain.Advertisements;
using System.Collections.Generic;
using Sabio.Models.Requests.Advertisements;
using Sabio.Models.Domain.Attorneys;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/advertisements")]
    [ApiController]
    public class AdvertisementApiController : BaseApiController
    {
        private IAdvertisementService _service = null;
        private IAuthenticationService <int> _authService = null;
        private static IAttorneyService _attorneyService;

        public AdvertisementApiController(IAdvertisementService service
        , IAttorneyService attorneyService, ILogger<AdvertisementApiController> logger
        , IAuthenticationService<int> authService) : base(logger)

        {

            _service = service;
            _authService = authService;
            _attorneyService = attorneyService;

        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemsResponse<Advertisement>> SelectById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List<Advertisement> advertisements = _service.SelectById(id);

                if (advertisements == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemsResponse<Advertisement> { Items = advertisements };
                }
            }

            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error {ex.Message}");
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("createdby/{createdby:int}")]
        public ActionResult<ItemResponse<Paged<Advertisement>>> GetAllByCreatedBy(int createdBy, int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<Advertisement> paged = _service.SelectByCreatedBy(createdBy, pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<Advertisement>> response = new ItemResponse<Paged<Advertisement>>();
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

        [HttpGet("adtierid/{adtierid:int}")]
        public ActionResult<ItemsResponse<Advertisement>> SelectByTierId(int adTierId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List<Advertisement> advertisements = _service.SelectByTierId(adTierId);

                if (advertisements == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemsResponse<Advertisement> { Items = advertisements };
                }
            }

            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error {ex.Message}");
            }

            return StatusCode(iCode, response);
        }

        [HttpDelete("{id:int}")]
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
                code = 500;
                response = new ErrorResponse(ex.Message);

            }

            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<int> Add(AdvertisementAddRequest model)
        {

            ObjectResult result = null;
            int currentUserId = 0;
            try
            {
                currentUserId = _authService.GetCurrentUserId();
                Attorney attorney = _attorneyService.SelectByUserId(currentUserId);

                int id = _service.Add(model, attorney.Id);

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
        public ActionResult<SuccessResponse> Update(AdvertisementUpdateRequest model)
        {

            int iCode = 200;

            BaseResponse response = null;
            int currentUserId = 0;
            try
            {
                currentUserId = _authService.GetCurrentUserId();
                Attorney attorney = _attorneyService.SelectByUserId(currentUserId);

                _service.Update(model, attorney.Id);

                response = new SuccessResponse();

            }
            catch (Exception ex)
            {

                iCode = 500;
                response = new ErrorResponse(ex.Message);

            }

            return StatusCode(iCode, response);
        }
    }
}
