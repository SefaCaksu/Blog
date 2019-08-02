using System.Collections.Generic;

namespace Dto
{
    public class DtoArticleParams
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Introduction { get; set; }
        public byte[] Img { get; set; }

        public byte Type { get; set; }
        public List<int> TagIds { get; set; }
    }
}