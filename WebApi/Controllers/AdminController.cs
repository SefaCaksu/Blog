using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dto;
using Business.Service;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("[Controller]/[Action]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        readonly ICategory _Category;

        public AdminController(ICategory Category)
        {
            _Category = Category;
        }

        [HttpPost]
        public string Category([FromBody]string name)
        {
            _Category.Add(name);
            return name;
        }

        [HttpGet]
        public object Category()
        {
           return _Category.List(null, true);
        }
    }
}
