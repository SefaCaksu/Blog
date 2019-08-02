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

        readonly IArticle _Article;
        public BlogController(ITag Tag, ICategory Category, IProfile Profile, IArticle Article)
        {
            _Tag = Tag;
            _Category = Category;
            _Profile = Profile;
            _Article = Article;
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

        [Route("ArticleTypeCount")]
        [HttpGet]
        public object ArticleTypeCount()
        {
            return _Article.GetTypeCount();
        }

        [Route("ArticleCount")]
        [HttpGet]
        public object ArticleCount(string title, int categoryId, int tagId, byte type)
        {
            return _Article.Count(title, categoryId, tagId, type);
        }

        [Route("Article")]
        [HttpGet]
        public object ArticleList(string title, int page, int rowCount, int categoryId, int tagId, byte type)
        {
            return _Article.List(title, categoryId, tagId, page, rowCount, type);
        }

    }
}
