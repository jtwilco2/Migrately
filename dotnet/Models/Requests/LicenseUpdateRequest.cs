﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Licenses
{
    public class LicenseUpdateRequest : LicenseAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
