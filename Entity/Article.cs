using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace Entity
{
    [Table("ARTICLE")]
    public class Article : DbContext
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }

        [ForeignKey("Category")]
        [Column("CATEGORY_ID")]
        public int CategoryId { get; set; }

        [Column("TITLE")]
        [StringLength(50)]
        [Required(ErrorMessage = "Article title is invalid.")]
        public string Title { get; set; }

        [Column("BODY")]
        [Required(ErrorMessage = "Article content is invalid.")]
        public string Body { get; set; }

        [Column("IMG")]
        public byte[] Img {get;set;}

        [Column("CREATED_DATE")]
        [Required]
        public DateTime CreatedDate { get; set; }

        public Category Category { get; set; }
        public ICollection<ArticleTag> ArticleTags { get; set; }
    }
}