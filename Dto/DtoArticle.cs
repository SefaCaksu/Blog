using System;
using System.Collections.Generic;

namespace Dto {
    public class DtoArticle {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryLinkName { get; set; }
        public string Introduction { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Img { get; set; }
        public byte Type { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<DtoTag> Tags { get; set; }
        public int NextId { get; set; }
        public string NextTitle { get; set; }
        public int PreviousId { get; set; }
        public string PreviousTitle { get; set; }
    }
}