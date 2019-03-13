using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dto;
using Business.Service;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[Controller]/[Action]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        readonly ICategory _Category;

        public AdminController(ICategory Category)
        {
            _Category = Category;
        }

        [HttpPost]
        public IActionResult Category([FromBody]string name)
        {
                _Category.Add(name);
                return Ok();
        }

        [HttpGet]
        public IActionResult Category()
        {
            try
            {
                return Ok(_Category.List(null, true));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
