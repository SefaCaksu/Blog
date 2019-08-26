using System;

namespace Dto
{
    public class DtoCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LinkName{get;set;}
        public bool Active { get; set; }
        public int ArticleCount { get; set; }
    }
}
