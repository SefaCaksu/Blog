using System;
using Microsoft.EntityFrameworkCore;

namespace Entity
{
    public class BgContext : DbContext
    {
        public BgContext(DbContextOptions<BgContext> options) : base(options)
        {

        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Profile> Profile { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<ArticleTag> ArticleTags { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ArticleTag>()
                .HasKey(c => new { c.ArticleId, c.TagId });
        }
    }
}
