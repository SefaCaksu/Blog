using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Entity
{
    [Table("CATEGORY")]
    public class Category : DbContext
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }

        [Column("NAME")]
        [StringLength(50)]
        [Required(ErrorMessage = "Category name is invalid.")]
        public string Name { get; set; }

        [Column("ACTIVE")]
        [Required(ErrorMessage = "Category active is invalid.")]
        public bool Active { get; set; }

        public ICollection<Article> Articles {get;set;}
    }
}