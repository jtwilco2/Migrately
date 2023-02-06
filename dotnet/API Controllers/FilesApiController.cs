using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sabio.Web.Models.Responses;
using System.Collections.Generic;
using System;
using Microsoft.Extensions.Logging;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Sabio.Models.Requests;
using System.IO;
using System.Diagnostics.CodeAnalysis;
using System.Web;
using Sabio.Models.Domain.Files;
using File = Sabio.Models.Domain.Files.File;
using Amazon.S3;
using Amazon;
using Microsoft.Build.Utilities;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;
using SendGrid;
using Sabio.Models.AppSettings;
using Microsoft.Extensions.Options;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/files")]
    [ApiController]
    public class FilesApiController : BaseApiController
    {
        private IFilesService _service = null;
        private IAuthenticationService<int> _authService = null;
        public FilesApiController(IFilesService service
            , ILogger<FilesApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
            
        {
            _service = service;
            _authService = authService;

        }

        [HttpGet]
        public ActionResult<ItemsResponse<Paged<File>>> GetAll(int pageIndex, int pageSize)
        {
            int code = 200;
            ActionResult result = null;
            try
            {
                Paged<File> paged = _service.GetAll(pageIndex, pageSize);

                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {
                    ItemResponse<Paged<File>> response = new ItemResponse<Paged<File>>();
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

        [HttpGet("expired")]
        public ActionResult<ItemsResponse<ExpiredFile>> GetAllExpired()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<ExpiredFile> list = _service.GetAllExpired();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("No expired records found.");
                }
                else
                {
                    response = new ItemsResponse<ExpiredFile> { Items = list };
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

        [HttpGet("sorted")]
        public ActionResult<ItemsResponse<Paged<File>>> GetAllSorted(string sortBy, int pageIndex, int pageSize, bool deleted)
        {
            int code = 200;
            ActionResult result = null;
            try
            {
                Paged<File> paged = _service.GetAllSorted(sortBy, pageIndex, pageSize, deleted);

                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {
                    ItemResponse<Paged<File>> response = new ItemResponse<Paged<File>>();
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

        [HttpGet("{id:int}/status")]
        public ActionResult<ItemsResponse<File>> GetByIdWithDeleteStatus(int id, int pageIndex, int pageSize, bool deleted)
        {

            ActionResult result = null;

            try
            {

                Paged<File> pagedFiles = _service.GetByIdWithDeleteStatus(id, pageIndex, pageSize, deleted);

                if (pagedFiles == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {

                    ItemResponse<Paged<File>> response = new ItemResponse<Paged<File>>();
                    response.Item = pagedFiles;
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

        [HttpGet("status")]
        public ActionResult<ItemsResponse<Paged<File>>> GetAllByDeleteStatus(int pageIndex, int pageSize, bool deleted)
        {
            int code = 200;
            ActionResult result = null;
            try
            {
                Paged<File> paged = _service.GetAllByDeleteStatus(pageIndex, pageSize, deleted);

                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {
                    ItemResponse<Paged<File>> response = new ItemResponse<Paged<File>>();
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

        [HttpGet("search")]
        public ActionResult<ItemsResponse<Paged<File>>> QueryWithDeleteStatus(int pageIndex, int pageSize, string query, bool deleted)
        {

            ActionResult result = null;
            try
            {
                Paged<File> paged = _service.QueryWithDeleteStatus(pageIndex, pageSize, query, deleted);

                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {
                    ItemResponse<Paged<File>> response = new ItemResponse<Paged<File>>();
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

        [HttpGet("createdby/{id:int}")]
        public ActionResult<ItemsResponse<File>> GetByCreatedBy(int id, int pageIndex, int pageSize)
        {

            ActionResult result = null;

            try
            {

                Paged<File> pagedFiles = _service.GetByCreatedBy(id, pageIndex, pageSize);

                if (pagedFiles == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {

                    ItemResponse<Paged<File>> response = new ItemResponse<Paged<File>>();
                    response.Item = pagedFiles;
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

        [HttpGet("status/createdby")]
        public ActionResult<ItemsResponse<File>> GetByCreatedByWithDeleteStatus(int createdById, int pageIndex, int pageSize, bool deleted)
        {

            ActionResult result = null;

            try
            {

                Paged<File> pagedFiles = _service.GetByCreatedByWithDeleteStatus(createdById, pageIndex, pageSize, deleted);

                if (pagedFiles == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {

                    ItemResponse<Paged<File>> response = new ItemResponse<Paged<File>>();
                    response.Item = pagedFiles;
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

        [HttpGet("status/creatorname")]
        public ActionResult<ItemsResponse<File>> GetByCreatorNameWithDeleteStatus(string creatorName, int pageIndex, int pageSize, bool deleted)
        {

            ActionResult result = null;

            try
            {

                Paged<File> pagedFiles = _service.GetByCreatorNameWithDeleteStatus(creatorName, pageIndex, pageSize, deleted);

                if (pagedFiles == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {

                    ItemResponse<Paged<File>> response = new ItemResponse<Paged<File>>();
                    response.Item = pagedFiles;
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


        [HttpGet("filetypeid/{id:int}")]
        public ActionResult<ItemsResponse<File>> GetByFileTypeId(int id, int pageIndex, int pageSize)
        {

            ActionResult result = null;

            try
            {

                Paged<File> pagedFiles = _service.GetByFileTypeId(id, pageIndex, pageSize);

                if (pagedFiles == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {

                    ItemResponse<Paged<File>> response = new ItemResponse<Paged<File>>();
                    response.Item = pagedFiles;
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
        [HttpGet("status/filetypeid")]
        public ActionResult<ItemsResponse<File>> GetByFileTypeIdWithDeleteStatus(int fileTypeId, int pageIndex, int pageSize, bool deleted)
        {

            ActionResult result = null;

            try
            {

                Paged<File> pagedFiles = _service.GetByFileTypeIdWithDeleteStatus(fileTypeId, pageIndex, pageSize, deleted);

                if (pagedFiles == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {

                    ItemResponse<Paged<File>> response = new ItemResponse<Paged<File>>();
                    response.Item = pagedFiles;
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

        [HttpPut("delete/{id:int}")]
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

        [HttpDelete("permanentdelete/{id:int}")]
        public ActionResult<SuccessResponse> PermanentDelete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.PermanentDelete(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {

                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);

        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Insert(FileAddRequest model)
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
        public ActionResult<ItemResponse<int>> Update(FileUpdateRequest model)
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

        [HttpPost("aws/upload")]
        public async Task<ActionResult<ItemResponse<List<FileUpload>>>> AwsFileUpload(ICollection<IFormFile> file)
        {
             List<FileUpload> ListOfFiles = new List<FileUpload>();

            int userId = _authService.GetCurrentUserId();

            ObjectResult result = null;
            
            if (file.Count > 0) 
            {
                try
                {
                    foreach (IFormFile fileItem in file)
                    {
                        ItemResponse<List<FileUpload>> response = new ItemResponse<List<FileUpload>>();

                        FileUpload fileResponse = await _service.AwsFileUpload(fileItem, userId);

                        ListOfFiles.Add(fileResponse);

                        response.Item = ListOfFiles;

                        result = Ok200(response);
                    }


                }
                catch (Exception ex)
                {
                    Logger.LogError(ex.ToString());
                    result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
                }

            }
            else
            {
                result = NotFound404(new ErrorResponse("No file received."));
            }

            return result;

        }

    }
}

