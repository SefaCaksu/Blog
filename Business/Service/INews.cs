using Dto;
using System.Collections.Generic;

namespace  Business.Service
{
    public interface INews
    {
        List<DtoNews> NewsList();
        int Add(string email);
    }
}