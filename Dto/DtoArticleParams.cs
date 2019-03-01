using System.Collections.Generic;

namespace Dto
{
    public class DtoArticleParams
    {
        public int CategoryId{get;set;}
        public string Title {get;set;}
        public string Body {get;set;}
        public byte[] Img{get;set;}
        public List<int> TagIds {get;set;}
    }
}