﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class ValidUser
    {
       public int Id { get; set; }

        public string Email { get; set; }

        public string Token { get; set; }

    }
}
