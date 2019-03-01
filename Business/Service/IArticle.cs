using System.Collections.Generic;
using Dto;

namespace Business.Service
{
    public interface IArticle
    {
        void Add(DtoArticleParams param);
        void Update(DtoArticleParams param);
        void Delete(int id);
        DtoArticle GetById(int id);
        List<DtoArticleShort> List(string name, int? categoryId, int tagId);
    }
}