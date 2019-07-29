using System;
using System.Collections.Generic;
using System.Linq;
using Business.Generic;
using Business.Service;
using Dto;
using Entity;

namespace Business
{
    public class ArticleService : GenericRepository<Article>, IArticle
    {
        private BgContext dc;
        public ArticleService(BgContext context) : base(context)
        {
            dc = context;
        }

        public int Add(DtoArticleParams param)
        {
            Article article = new Article();
            article.CategoryId = param.CategoryId;
            article.Title = param.Title;
            article.Body = param.Body;
            article.Introduction = param.Introduction;
            article.CreatedDate = DateTime.Now;
            article.Img = param.Img;

            dc.Articles.Add(article);

            List<ArticleTag> tags = new List<ArticleTag>();
            foreach (var item in param.TagIds)
            {
                var articleTag = new ArticleTag();
                articleTag.TagId = item;
                articleTag.ArticleId = article.Id;
                tags.Add(articleTag);
            }

            dc.ArticleTags.AddRange(tags);
            dc.SaveChanges();

            return article.Id;
        }

        public void Update(DtoArticleParams param)
        {
            var article = base.Get(param.Id);
            article.CategoryId = param.CategoryId;
            article.Title = param.Title;
            article.Body = param.Body;
            article.Introduction = param.Introduction;
            article.CreatedDate = DateTime.Now;

            if (param.Img != null)
            {
                article.Img = param.Img;
            }

            dc.ArticleTags.RemoveRange(dc.ArticleTags.Where(c => c.ArticleId == article.Id));

            List<ArticleTag> tags = new List<ArticleTag>();
            foreach (var item in param.TagIds)
            {
                var articleTag = new ArticleTag();
                articleTag.TagId = item;
                articleTag.ArticleId = article.Id;
                tags.Add(articleTag);
            }

            dc.ArticleTags.AddRange(tags);
            dc.SaveChanges();
        }

        public void Delete(int id)
        {
            var article = base.Get(id);
            dc.RemoveRange(dc.ArticleTags.Where(c=> c.ArticleId == id));
            dc.Remove(article);
            dc.SaveChanges();
        }
        public DtoArticle GetById(int id)
        {
            var data = dc.Articles.FirstOrDefault(c => c.Id == id);

            var article = new DtoArticle();

            if (article != null)
            {
                var category = dc.Categories.FirstOrDefault(c => c.Id == data.CategoryId);
                var articleTags = dc.ArticleTags.Where(c => c.ArticleId == data.Id).ToList();

                article.Id = data.Id;
                article.CategoryId = data.CategoryId;
                article.CategoryName = category.Name;
                article.Introduction = data.Introduction;
                article.Title = data.Title;
                article.Img = "data:image/png;base64," + Convert.ToBase64String(data.Img);
                article.Body = data.Body;
                article.Tags = dc.Tags.Where(c => articleTags.Any(t => t.TagId == c.Id) && c.Active == true).Select(c => new DtoTag
                {
                    Id = c.Id,
                    Name = c.Name,
                    Active = c.Active
                }).ToList();
            }

            return article;
        }

        public List<DtoArticleShort> List(string title, int categoryId, int tagId, int page, int rowCount)
        {
            var articles = dc.Articles.Where(c => true);

            if (!String.IsNullOrEmpty(title))
            {
                articles = articles.Where(c => c.Title.ToUpper().Contains(title.ToUpper()));
            }

            if (categoryId > 0)
            {
                articles = articles.Where(c => c.CategoryId == categoryId);
            }

            if (tagId > 0)
            {
                articles = articles.Where(c => c.ArticleTags.Any(t => t.TagId == tagId));
            }

            if (articles.Count() <= 0)
            {
                return new List<DtoArticleShort>();
            }

            var list = (from a in articles
                        join c in dc.Categories on a.CategoryId equals c.Id
                        orderby a.CreatedDate descending
                        select new DtoArticleShort()
                        {
                            Id = a.Id,
                            CategoryId = a.CategoryId,
                            CategoryName = c.Name,
                            Title = a.Title,
                            Introduction = a.Introduction,
                            CreatedDate = a.CreatedDate
                        }).Skip((page - 1) * rowCount).Take(rowCount).ToList();

            return list;
        }

        public int Count(string title, int categoryId, int tagId)
        {
            var articles = dc.Articles.Where(c => true);

            if (!String.IsNullOrEmpty(title))
            {
                articles = articles.Where(c => c.Title.ToUpper().Contains(title.ToUpper()));
            }

            if (categoryId > 0)
            {
                articles = articles.Where(c => c.CategoryId == categoryId);
            }

            if (tagId > 0)
            {
                articles = articles.Where(c => c.ArticleTags.Any(t => t.TagId == tagId));
            }

            return articles.Count();
        }
    }
}