using System.Collections.Generic;
using Dto;

namespace Business.Service
{
    public interface IArticle
    {
        int Add(DtoArticleParams param);
        void Update(DtoArticleParams param);
        void Delete(int id);
        DtoArticle GetById(int id);
        List<DtoArticleShort> List(string title, int categoryId, int tagId, int page, int rowCount, byte type);
        int Count(string title, int categoryId, int tagId, byte type);
        DtoTypeCount GetTypeCount();
    }
}