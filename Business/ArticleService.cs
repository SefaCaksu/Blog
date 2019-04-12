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

        public void Add(DtoArticleParams param)
        {
            Article article = new Article();
            article.CategoryId = param.CategoryId;
            article.Title = param.Title;
            article.Body = param.Body;
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
        }

        public void Update(DtoArticleParams param)
        {
            var article = base.Get(param.Id);
            article.CategoryId = param.CategoryId;
            article.Title = param.Title;
            article.Body = param.Body;
            article.CreatedDate = DateTime.Now;
            article.Img = param.Img;

            dc.ArticleTags.RemoveRange(article.ArticleTags);

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
            dc.RemoveRange(article.ArticleTags);
            dc.Remove(article);
            dc.SaveChanges();
        }

        public DtoArticle GetById(int id)
        {
            var data = base.Get(id);

            DtoArticle article = new DtoArticle();

            if (data != null)
            {
                article.Id = data.Id;
                article.CategoryId = data.CategoryId;
                article.CategoryName = data.Category.Name;
                article.Title = data.Title;
                article.Body = data.Body;
                article.Img = Convert.ToBase64String(data.Img);
                article.Tags = dc.Tags.Where(c => data.ArticleTags.Any(t => t.TagId == c.Id)).Select(c => new DtoTag()
                {
                    Id = c.Id,
                    Name = c.Name
                }).ToList();
            }

            return article;
        }

        public List<DtoArticleShort> List(string title, int? categoryId, int? tagId, int page, int rowCount)
        {
            var articles = dc.Articles.Where(c => true);

            if (!String.IsNullOrEmpty(title))
            {
                articles = articles.Where(c => c.Title.ToUpper().Contains(title.ToUpper()));
            }

            if (categoryId.HasValue)
            {
                articles = articles.Where(c => c.CategoryId == categoryId);
            }

            if (tagId.HasValue)
            {
                articles = articles.Where(c => c.ArticleTags.Any(t => t.TagId == tagId));
            }

            if (articles.Count() <= 0)
            {
                return new List<DtoArticleShort>();
            }

            return articles.Select(c => new DtoArticleShort()
            {
                Id = c.Id,
                CategoryId = c.CategoryId,
                CategoryName = c.Category.Name,
                Title = c.Title,
                Img = Convert.ToBase64String(c.Img),
                CreatedDate = c.CreatedDate
            }).OrderBy(c => c.CreatedDate).Skip((page - 1) * rowCount).Take(rowCount).ToList();
        }

        public int Count(string title, int? categoryId, int? tagId)
        {
            var articles = dc.Articles.Where(c => true);

            if (!String.IsNullOrEmpty(title))
            {
                articles = articles.Where(c => c.Title.ToUpper().Contains(title.ToUpper()));
            }

            if (categoryId.HasValue)
            {
                articles = articles.Where(c => c.CategoryId == categoryId);
            }

            if (tagId.HasValue)
            {
                articles = articles.Where(c => c.ArticleTags.Any(t => t.TagId == tagId));
            }

            return articles.Count();
        }
    }
}