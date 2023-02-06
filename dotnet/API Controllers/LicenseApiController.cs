using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Models.Requests.ImmigrantVisaCategories;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models.Requests.Licenses;
using Sabio.Models.Domain;
using Sabio.Models;
using Sabio.Models.Requests;
using Sabio.Models.Domain.Licenses;
using System.ComponentModel;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Xml.Linq;
using License = Sabio.Models.Domain.Licenses.License;
using Microsoft.AspNetCore.Authorization;
using Sabio.Models.Domain.PageSection;

namespace Sabio.Web.Api.Controllers
{

    [Route("api/licenses")]
    [ApiController]
    public class LicenseApiController : BaseApiController
    {
        private ILicenseService _service = null;
        private IAuthenticationService<int> _authService = null;

        public LicenseApiController(ILicenseService service
            , ILogger<LicenseApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        //[Authorize(Roles ="Attorney")]
        public ActionResult<ItemResponse<int>> Create(LicenseAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddLicense(model, userId);
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

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<License>> GetById(int id)
        {
            int sCode = 200;
            BaseResponse response = null;

            try
            {
                License license = _service.GetById(id);

                if (license == null)
                {
                    sCode = 404;
                    response = new ErrorResponse("License not found.");
                }
                else
                {
                    response = new ItemResponse<License> { Item = license };
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

        [HttpGet]
        public ActionResult<ItemResponse<Paged<License>>> SelectAll(int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<License> paged = _service.SelectAll(pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {
                    ItemResponse<Paged<License>> response = new ItemResponse<Paged<License>>();
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

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<License>>> LicenseStateQuery(int pageIndex, int pageSize, string query)
        {
            ActionResult result = null;
            try
            {
                Paged<License> paged = _service.LicenseStateQuery(pageIndex, pageSize, query);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {
                    ItemResponse<Paged<License>> response = new ItemResponse<Paged<License>>();
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
        [HttpGet("search/licensenumber")]
        public ActionResult<ItemResponse<Paged<License>>> QueryLicenseNumber(int pageIndex, int pageSize, string query)
        {
            ActionResult result = null;
            try
            {
                Paged<License> paged = _service.QueryLicenseNumber(pageIndex, pageSize, query);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {
                    ItemResponse<Paged<License>> response = new ItemResponse<Paged<License>>();
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

        [HttpGet("search/numberandstate")]
        public ActionResult<ItemResponse<Paged<License>>> GetByQueryAndLicense(int pageIndex, int pageSize, string query, string licenseNumber)
        {
            ActionResult result = null;
            try
            {
                Paged<License> paged = _service.GetByQueryAndLicense(pageIndex, pageSize, query, licenseNumber);
                if(paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<License>> response = new ItemResponse<Paged<License>>();
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


        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> UpdateLicense(LicenseUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {

                _service.UpdateLicense(model);

                response = new SuccessResponse();
            }

            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
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


        [HttpGet("createdby/{createdby:int}")]
        public ActionResult<ItemsResponse<License>> SelectCreatedBy(int createdBy)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List <License> licenses = _service.SelectCreatedBy(createdBy);

                if (licenses == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemsResponse<License> { Items = licenses };
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
    }



}
