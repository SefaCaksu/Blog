using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Entity
{
    [Table("ARTICLE_TAG")]
    public class ArticleTag : DbContext
    {
        [Column("ARTICLE_ID")]
        [Key]
        [ForeignKey("Articles")]
        public int ArticleId { get; set; }

        [Column("TAG_ID")]
        [Key]
        [ForeignKey("Tags")]
        public int TagId { get; set; }

        ICollection<Article> Articles {get;set;}
        ICollection<Tag> Tags {get;set;}
    }
}