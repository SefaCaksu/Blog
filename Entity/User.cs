using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Entity
{
    [Table("USER")]
    public class User
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }

        [Column("NAME")]
        [Required(ErrorMessage = "User name is valid")]
        public string Name { get; set; }

        [Column("PASSWORD")]
        [Required(ErrorMessage = "User password is valid")]
        public string Password { get; set; }
    }
}