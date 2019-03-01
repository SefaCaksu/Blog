using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Entity
{
    [Table("NEWS")]
    public class News : DbContext
    {
        [Column("ID")]
        [Key]
        public int Id {get;set;}

        [Column("EMAIL")]
        [StringLength(100)]
        [Required(ErrorMessage="Email is not empty.")]
        public string Email {get;set;}
    }
}