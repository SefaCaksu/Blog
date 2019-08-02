using System;
using System.Linq;
using Dto;
using Business.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.IO;

namespace WebApi.Controllers
{
    [Authorize()]
    [ApiController]
    public class AdminController : ControllerBase
    {
        readonly ICategory _Category;
        readonly IProfile _Profile;
        readonly IArticle _Article;
        readonly ITag _Tag;

        public AdminController(ICategory Category, IProfile Profile, IArticle Article, ITag Tag)
        {
            _Category = Category;
            _Profile = Profile;
            _Article = Article;
            _Tag = Tag;
        }

        #region Category

        [Route("Admin/Category")]
        [HttpPost]
        public object CategoryAdd([FromBody]string name)
        {
            _Category.Add(name);
            return name;
        }

        [Route("Admin/Category")]
        [HttpPut]
        public object CategoryEdit([FromBody] DtoCategory category)
        {
            _Category.Edit(category);
            return category.Id;
        }

        [Route("Admin/Category")]
        [HttpGet]
        public object CategoryList(string name, bool active)
        {
            return _Category.List(name, active);
        }

        [Route("Admin/Category/{id:int}")]
        [HttpGet]
        public DtoCategory CategoryGetById(int id)
        {
            return _Category.GetById(id);
        }

        [Route("Admin/Category/{id:int}")]
        [HttpDelete]
        public object CategoryDelete(int id)
        {
            _Category.Delete(id);
            return id;
        }

        #endregion

        #region  Profile

        [Route("Admin/Profile")]
        [HttpGet]
        public object ProfileGet()
        {
            var profile = _Profile.GetById();
            return profile;
        }

        [Route("Admin/Profile")]
        [HttpPost]
        public object ProfileUpsert([FromBody]DtoProfile profile)
        {
            _Profile.Upsert(profile);
            return profile.Id;
        }

        #endregion

        #region  Article

        [Route("Admin/Article")]
        [HttpGet]
        public object ArticleList(string title, int page, int rowCount, int categoryId, int tagId)
        {
            return _Article.List(title, categoryId, tagId, page, rowCount, 0);
        }

        [Route("Admin/Article/{id:int}")]
        [HttpGet]
        public object ArticleGet(int id)
        {
            return _Article.GetById(id);
        }

        [Route("Admin/Article")]
        [HttpPost]
        public object ArticleAdd()
        {
            var value = Request.Form.FirstOrDefault(c => c.Key == "DtoArticleParams").Value;

            if (String.IsNullOrEmpty(value))
            {
                return "";
            }

            var article = Newtonsoft.Json.JsonConvert.DeserializeObject<DtoArticleParams>(value);
            var file = Request.Form.Files[0];

            if (file == null)
            {
                return "";
            }

            using (var target = new MemoryStream())
            {
                file.CopyToAsync(target);
                article.Img = target.ToArray();
            }

            return _Article.Add(article);
        }

        [Route("Admin/Article")]
        [HttpPut]
        public object ArticleEdit()
        {
            var value = Request.Form.FirstOrDefault(c => c.Key == "DtoArticleParams").Value;

            if (String.IsNullOrEmpty(value))
            {
                return "";
            }

            var article = Newtonsoft.Json.JsonConvert.DeserializeObject<DtoArticleParams>(value);

            if (Request.Form.Files.Count <= 0)
            {
                article.Img = null;
            }
            else
            {
                var file = Request.Form.Files[0];
                using (var target = new MemoryStream())
                {
                    file.CopyToAsync(target);
                    article.Img = target.ToArray();
                }
            }

            _Article.Update(article);

            return article.Title;
        }

        [Route("Admin/Article/{id:int}")]
        [HttpDelete]
        public object ArticleDelete(int id)
        {
            _Article.Delete(id);
            return id;
        }

        [Route("Admin/ArticleCount")]
        [HttpGet]
        public object ArticleCount(string title, int categoryId, int tagId)
        {
            return _Article.Count(title, categoryId, tagId, 0);
        }

        #endregion

        #region  Tag

        [Route("Admin/Tag")]
        [HttpGet]
        public object TagList(string name, bool active)
        {
            return _Tag.List(name, active);
        }

        [Route("Admin/Tag/{id:int}")]
        [HttpGet]
        public DtoTag TagGetById(int id)
        {
            return _Tag.GetById(id);
        }


        [Route("Admin/Tag")]
        [HttpPost]
        public object TagAdd([FromBody]string name)
        {
            _Tag.Add(name);
            return name;
        }


        [Route("Admin/Tag")]
        [HttpPut]
        public object TagEdit([FromBody] DtoTag tag)
        {
            _Tag.Edit(tag);
            return tag.Id;
        }

        [Route("Admin/Tag/{id:int}")]
        [HttpDelete]
        public object TagDelete(int id)
        {
            _Tag.Delete(id);
            return id;
        }

        #endregion
    }
}
