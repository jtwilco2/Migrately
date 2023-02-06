using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sabio.Models;
using Sabio.Models.Domain.Files;
using Sabio.Models.Requests;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IFilesService
    {
        Paged<File> GetAll(int pageIndex, int pageSize);
        List<ExpiredFile> GetAllExpired();
        Paged<File> GetAllSorted(string sortBy, int pageIndex, int pageSize, bool deleted);
        Paged<File> GetByIdWithDeleteStatus(int id, int pageIndex, int pageSize, bool deleted);
        Paged<File> GetAllByDeleteStatus(int pageIndex, int pageSize, bool deleted);
        Paged<File> QueryWithDeleteStatus(int pageIndex, int pageSize, string query, bool deleted);
        Paged<File> GetByCreatedBy(int Id, int pageIndex, int pageSize);
        Paged<File> GetByCreatorNameWithDeleteStatus(string creatorName, int pageIndex, int pageSize, bool deleted);
        Paged<File> GetByCreatedByWithDeleteStatus(int createdById, int pageIndex, int pageSize, bool deleted);
        Paged<File> GetByFileTypeId(int Id, int pageIndex, int pageSize);
        Paged<File> GetByFileTypeIdWithDeleteStatus(int fileTypeId, int pageIndex, int pageSize, bool deleted);
        void Delete(int Id);
        void PermanentDelete(int Id);
        int Insert(FileAddRequest model);
        void Update(FileUpdateRequest model);
        Task<FileUpload> AwsFileUpload(IFormFile file, int userId);
    }
}
