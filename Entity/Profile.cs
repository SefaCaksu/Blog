using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Entity
{
    [Table("PROFILE")]
    public class Profile : DbContext
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }

        [Column("NAME")]
        [StringLength(50)]
        [Required(ErrorMessage = "Profile name is invalid.")]
        public string Name { get; set; }

        [Column("EMAIL")]
        [StringLength(50)]
        [Required(ErrorMessage = "Profile email is invalid.")]
        public string Email { get; set; }

        [Column("TITLE")]
        [StringLength(100)]
        [Required(ErrorMessage = "Profile title is invalid.")]
        public string Title { get; set; }

        [Column("DESCRIPTION")]
        [StringLength(400)]
        [Required(ErrorMessage = "Profile description is invalid.")]
        public string Description { get; set; }

        [Column("LINKEDIN")]
        [StringLength(300)]
        public string LinkEdin { get; set; }

        [Column("GITHUB")]
        [StringLength(300)]
        public string Medium { get; set; }

        [Column("MEDIUM")]
        [StringLength(300)]
        public string GitHub { get; set; }

        [Column("INSTEGRAM")]
        [StringLength(300)]
        public string Instegram { get; set; }

        [Column("FACEBOOK")]
        [StringLength(300)]
        public string Facebook { get; set; }
    }
}