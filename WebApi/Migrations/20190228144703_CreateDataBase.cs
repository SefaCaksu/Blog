using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class CreateDataBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CATEGORY",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NAME = table.Column<string>(maxLength: 50, nullable: false),
                    ACTIVE = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CATEGORY", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "NEWS",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EMAIL = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NEWS", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "PROFILE",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NAME = table.Column<string>(maxLength: 50, nullable: false),
                    EMAIL = table.Column<string>(maxLength: 50, nullable: false),
                    TITLE = table.Column<string>(maxLength: 100, nullable: false),
                    DESCRIPTION = table.Column<string>(maxLength: 400, nullable: false),
                    LINKEDIN = table.Column<string>(maxLength: 300, nullable: true),
                    GITHUB = table.Column<string>(maxLength: 300, nullable: true),
                    MEDIUM = table.Column<string>(maxLength: 300, nullable: true),
                    INSTEGRAM = table.Column<string>(maxLength: 300, nullable: true),
                    FACEBOOK = table.Column<string>(maxLength: 300, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PROFILE", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "TAG",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NAME = table.Column<string>(maxLength: 50, nullable: false),
                    ACTIVE = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TAG", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ARTICLE",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CATEGORY_ID = table.Column<int>(nullable: false),
                    TITLE = table.Column<string>(maxLength: 50, nullable: false),
                    CONTENT = table.Column<string>(nullable: false),
                    CREATED_DATE = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ARTICLE", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ARTICLE_CATEGORY_CATEGORY_ID",
                        column: x => x.CATEGORY_ID,
                        principalTable: "CATEGORY",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ARTICLE_TAG",
                columns: table => new
                {
                    ARTICLE_ID = table.Column<int>(nullable: false),
                    TAG_ID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ARTICLE_TAG", x => new { x.ARTICLE_ID, x.TAG_ID });
                    table.ForeignKey(
                        name: "FK_ARTICLE_TAG_ARTICLE_ARTICLE_ID",
                        column: x => x.ARTICLE_ID,
                        principalTable: "ARTICLE",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ARTICLE_TAG_TAG_TAG_ID",
                        column: x => x.TAG_ID,
                        principalTable: "TAG",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ARTICLE_CATEGORY_ID",
                table: "ARTICLE",
                column: "CATEGORY_ID");

            migrationBuilder.CreateIndex(
                name: "IX_ARTICLE_TAG_TAG_ID",
                table: "ARTICLE_TAG",
                column: "TAG_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ARTICLE_TAG");

            migrationBuilder.DropTable(
                name: "NEWS");

            migrationBuilder.DropTable(
                name: "PROFILE");

            migrationBuilder.DropTable(
                name: "ARTICLE");

            migrationBuilder.DropTable(
                name: "TAG");

            migrationBuilder.DropTable(
                name: "CATEGORY");
        }
    }
}
