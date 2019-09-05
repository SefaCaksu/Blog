using System;
using System.Collections.Generic;
using System.Linq;
using Business.Generic;
using Business.Service;
using Dto;
using Entity;

namespace Business {
    public class NewsService : GenericRepository<News>, INews {
        private BgContext dc;
        public NewsService (BgContext context) : base (context) {
            dc = context;
        }

        public List<DtoNews> NewsList () {
            return dc.News.Select (c => new DtoNews () {
                Id = c.Id,
                    Email = c.Email
            }).ToList ();
        }

        public int Add (string email) {
            News news = new News ();
            news.Email = email;
            dc.News.Add (news);
            dc.SaveChanges ();

            return news.Id;
        }
    }
}