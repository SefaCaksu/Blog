using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "INSTEGRAM",
                table: "PROFILE",
                newName: "INSTAGRAM");

            migrationBuilder.RenameColumn(
                name: "CONTENT",
                table: "ARTICLE",
                newName: "BODY");

            migrationBuilder.AddColumn<byte[]>(
                name: "IMG",
                table: "ARTICLE",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "READ_COUNT",
                table: "ARTICLE",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IMG",
                table: "ARTICLE");

            migrationBuilder.DropColumn(
                name: "READ_COUNT",
                table: "ARTICLE");

            migrationBuilder.RenameColumn(
                name: "INSTAGRAM",
                table: "PROFILE",
                newName: "INSTEGRAM");

            migrationBuilder.RenameColumn(
                name: "BODY",
                table: "ARTICLE",
                newName: "CONTENT");
        }
    }
}
