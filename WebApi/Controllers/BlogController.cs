using System;
using System.Globalization;
using System.Text.RegularExpressions;
using Business.Service;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers {
    [ApiController]
    public class BlogController : ControllerBase {
        readonly ITag _Tag;
        readonly ICategory _Category;
        readonly IProfile _Profile;
        readonly INews _News;

        readonly IArticle _Article;
        public BlogController (ITag Tag, ICategory Category, IProfile Profile, IArticle Article, INews News) {
            _Tag = Tag;
            _Category = Category;
            _Profile = Profile;
            _Article = Article;
            _News = News;
        }

        [Route ("Tag")]
        [HttpGet]
        public object TagList () {
            return _Tag.List ("", true);
        }

        [Route ("Category")]
        [HttpGet]
        public object CategoryList () {
            return _Category.List ();
        }

        [Route ("Profile")]
        [HttpGet]
        public object ProfileGet () {
            return _Profile.GetById ();
        }

        [Route ("News")]
        [HttpPost]
        public object AddNews ([FromBody] string email) {
            if(this.IsValidEmail(email)){
                return _News.Add(email);
            }else{
                return 0;
            }
        }

        [Route ("ArticleTypeCount")]
        [HttpGet]
        public object ArticleTypeCount () {
            return _Article.GetTypeCount ();
        }

        [Route ("ArticleCount")]
        [HttpGet]
        public object ArticleCount (string title, int categoryId, int tagId, byte type) {
            return _Article.Count (title, categoryId, tagId, type);
        }

        [Route ("Article")]
        [HttpGet]
        public object ArticleList (string title, int page, int rowCount, int categoryId, int tagId, byte type) {
            return _Article.List (title, categoryId, tagId, page, rowCount, type);
        }

        //Helper
        bool IsValidEmail (string email) {
            if (string.IsNullOrWhiteSpace (email))
                return false;

            try {
                // Normalize the domain
                email = Regex.Replace (email, @"(@)(.+)$", DomainMapper,
                    RegexOptions.None, TimeSpan.FromMilliseconds (200));

                // Examines the domain part of the email and normalizes it.
                string DomainMapper (Match match) {
                    // Use IdnMapping class to convert Unicode domain names.
                    var idn = new IdnMapping ();

                    // Pull out and process domain name (throws ArgumentException on invalid)
                    var domainName = idn.GetAscii (match.Groups[2].Value);

                    return match.Groups[1].Value + domainName;
                }
            } catch (RegexMatchTimeoutException e) {
                return false;
            } catch {
                return false;
            }

            try {
                return Regex.IsMatch (email,
                    @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
                    @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-0-9a-z]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$",
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds (250));
            } catch (RegexMatchTimeoutException) {
                return false;
            }
        }
    }
}