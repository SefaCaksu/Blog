using System;

namespace Dto
{
    public class DtoArticleShort
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Title { get; set; }
        public string LinkTitle {get;set;}
        public string Introduction { get; set; }
        public string Img { get; set; }
        public byte Type { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}