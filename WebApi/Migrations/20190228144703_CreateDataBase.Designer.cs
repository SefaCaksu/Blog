﻿// <auto-generated />
using System;
using Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace WebApi.Migrations
{
    [DbContext(typeof(BgContext))]
    [Migration("20190228144703_CreateDataBase")]
    partial class CreateDataBase
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Entity.Article", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CategoryId")
                        .HasColumnName("CATEGORY_ID");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnName("CONTENT");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnName("CREATED_DATE");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnName("TITLE")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("ARTICLE");
                });

            modelBuilder.Entity("Entity.ArticleTag", b =>
                {
                    b.Property<int>("ArticleId")
                        .HasColumnName("ARTICLE_ID");

                    b.Property<int>("TagId")
                        .HasColumnName("TAG_ID");

                    b.HasKey("ArticleId", "TagId");

                    b.HasIndex("TagId");

                    b.ToTable("ARTICLE_TAG");
                });

            modelBuilder.Entity("Entity.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Active")
                        .HasColumnName("ACTIVE");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnName("NAME")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("CATEGORY");
                });

            modelBuilder.Entity("Entity.News", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnName("EMAIL")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("NEWS");
                });

            modelBuilder.Entity("Entity.Profile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnName("DESCRIPTION")
                        .HasMaxLength(400);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnName("EMAIL")
                        .HasMaxLength(50);

                    b.Property<string>("Facebook")
                        .HasColumnName("FACEBOOK")
                        .HasMaxLength(300);

                    b.Property<string>("GitHub")
                        .HasColumnName("MEDIUM")
                        .HasMaxLength(300);

                    b.Property<string>("Instegram")
                        .HasColumnName("INSTEGRAM")
                        .HasMaxLength(300);

                    b.Property<string>("LinkEdin")
                        .HasColumnName("LINKEDIN")
                        .HasMaxLength(300);

                    b.Property<string>("Medium")
                        .HasColumnName("GITHUB")
                        .HasMaxLength(300);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnName("NAME")
                        .HasMaxLength(50);

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnName("TITLE")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("PROFILE");
                });

            modelBuilder.Entity("Entity.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Active")
                        .HasColumnName("ACTIVE");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnName("NAME")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("TAG");
                });

            modelBuilder.Entity("Entity.Article", b =>
                {
                    b.HasOne("Entity.Category")
                        .WithMany("Articles")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Entity.ArticleTag", b =>
                {
                    b.HasOne("Entity.Article")
                        .WithMany("ArticleTags")
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Entity.Tag")
                        .WithMany("ArticleTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
