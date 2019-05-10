using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dto;
using Business.Service;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
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
        public object ArticleList(string title, int? categoryId, int? tagId, int page, int rowCount)
        {
            return _Article.List(title, categoryId, tagId, page, rowCount);
        }

        [Route("Admin/Article/{id:int}")]
        [HttpGet]
        public object ArticleGet(int id)
        {
            return _Article.GetById(id);
        }

        [Route("Admin/Article")]
        [HttpPost]
        public object ArticleAdd([FromBody]DtoArticleParams article)
        {
            _Article.Add(article);
            return article.Title;
        }

        [Route("Admin/Article")]
        [HttpPut]
        public object ArticleEdit([FromBody]DtoArticleParams article)
        {
            _Article.Update(article);
            return article.Title;
        }

        [Route("Admin/Article")]
        [HttpDelete]
        public object ArticleDelete(int id)
        {
            _Article.Delete(id);
            return id;
        }

        [Route("Admin/ArticleCount")]
        [HttpGet]
        public object ArticleCount(string title, int? categoryId, int? tagId)
        {
            return _Article.Count(title, categoryId, tagId);
        }

        #endregion

        #region  Tag

        [Route("Admin/Tag")]
        [HttpGet]
        public object TagList(string name, bool active)
        {
            return _Tag.List(name, active);
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

        [Route("Admin/Tag")]
        [HttpDelete]
        public object TagDelete(int id)
        {
            _Tag.Delete(id);
            return id;
        }

        #endregion
    }
}
