using Business.Service;
using Microsoft.AspNetCore.Mvc;


namespace WebApi.Controllers
{
    [ApiController]
    public class BlogController : ControllerBase
    {
        readonly ITag _Tag;
        readonly ICategory _Category;
        readonly IProfile _Profile;
        public BlogController(ITag Tag, ICategory category, IProfile Profile)
        {
            _Tag = Tag;
            _Category = category;
            _Profile = Profile;
        }

        [Route("Tag")]
        [HttpGet]
        public object TagList()
        {
            return _Tag.List("", true);
        }

        [Route("Category")]
        [HttpGet]
        public object CategoryList()
        {
            return _Category.List();
        }

        [Route("Profile")]
        [HttpGet]
        public object ProfileGet()
        {
            return _Profile.GetById();
        }
    }
}
