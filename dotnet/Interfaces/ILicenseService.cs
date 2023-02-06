using Sabio.Models.Domain;
using Sabio.Models;
using Sabio.Models.Requests.Licenses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain.Licenses;
using System.Drawing;

namespace Sabio.Services.Interfaces
{
    public interface ILicenseService
    {
        int AddLicense(LicenseAddRequest model, int userId);
        void UpdateLicense(LicenseUpdateRequest model);
        Paged<License> SelectAll(int pageIndex, int pageSize);
        Paged<License> LicenseStateQuery(int pageIndex, int pageSize, string query);
        Paged<License> QueryLicenseNumber(int pageIndex, int pageSize, string query);
        void Delete(int id);
        List <License> SelectCreatedBy(int createdBy);
        License GetById(int id);

        Paged<License> GetByQueryAndLicense(int pageIndex, int pageSize, string query, string licenseNumber);
    }
}
