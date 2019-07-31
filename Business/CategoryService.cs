using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.Generic;
using Business.Service;
using Dto;
using Entity;

namespace Business
{
    public class CategoryService : GenericRepository<Category>, ICategory
    {
        private BgContext dc;
        public CategoryService(BgContext context) : base(context)
        {
            dc = context;
        }

        public void Add(string name)
        {
            Category category = new Category();
            category.Name = name;
            category.Active = true;

            base.Add(category);
            base.Save();
        }

        public void Delete(int id)
        {
            var deleteCategory = base.Get(id);
            base.Delete(deleteCategory);
            base.Save();
        }

        public void Edit(DtoCategory category)
        {
            Category data = new Category();
            data.Id = category.Id;
            data.Name = category.Name;
            data.Active = category.Active;

            base.Update(data, category.Id);
            base.Save();
        }

        public DtoCategory GetById(int id)
        {
            var data = base.Get(id);

            DtoCategory category = new DtoCategory();
            category.Id = data.Id;
            category.Name = data.Name;
            category.Active = data.Active;

            return category;
        }

        public List<DtoCategory> List(string name, bool active)
        {
            var list = dc.Categories.Where(c => c.Active == active);

            if (!string.IsNullOrEmpty(name))
            {
                list = list.Where(c => c.Name.Contains(name));
            }

            return list.Select(c => new DtoCategory()
            {
                Id = c.Id,
                Name = c.Name,
                Active = c.Active,
                ArticleCount = c.Articles.Count
            }).ToList();
        }

        public List<DtoCategory> List()
        {
            return dc.Categories.Where(c => c.Active).Select(c => new DtoCategory()
            {
                Id = c.Id,
                Name = c.Name,
                Active = c.Active,
                ArticleCount = c.Articles.Count
            }).ToList();
        }
    }
}