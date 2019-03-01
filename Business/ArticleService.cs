using System.Collections.Generic;
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
            throw new System.NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new System.NotImplementedException();
        }

        public DtoArticle GetById(int id)
        {
            throw new System.NotImplementedException();
        }

        public List<DtoArticleShort> List(string name, int? categoryId, int tagId)
        {
            throw new System.NotImplementedException();
        }

        public void Update(DtoArticleParams param)
        {
            throw new System.NotImplementedException();
        }
    }
}