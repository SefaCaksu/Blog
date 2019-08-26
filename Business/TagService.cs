using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.Generic;
using Business.Service;
using Dto;
using Entity;

namespace Business
{
    public class TagService : GenericRepository<Tag>, ITag
    {
        private BgContext dc;
        public TagService(BgContext context) : base(context)
        {
            dc = context;
        }

        public void Add(string name)
        {
            Tag newTag = new Tag();
            newTag.Name = name;
            newTag.Active = true;

            base.Add(newTag);
            base.Save();
        }

        public void Delete(int id)
        {
            var deleteTag = base.Get(id);
            base.Delete(deleteTag);
            base.Save();
        }

        public void Edit(DtoTag tag)
        {
            var editTag = new Tag();
            editTag.Id = tag.Id;
            editTag.Name = tag.Name;
            editTag.Active = tag.Active;

            base.Update(editTag, tag.Id);
            base.Save();
        }

        public List<DtoTag> List(string name, bool active)
        {
            var list = dc.Tags.Where(c => c.Active == active);

            if (!string.IsNullOrEmpty(name))
            {
                list = list.Where(c => c.Name.Contains(name));
            }

            return list.Select(c => new DtoTag()
            {
                Id = c.Id,
                Name = c.Name,
                LinkName = c.Name.LinkReplace(),
                Active = c.Active,
            }).ToList();
        }

        public DtoTag GetById(int id)
        {
            var data = base.Get(id);

            DtoTag tag = new DtoTag();
            tag.Id = data.Id;
            tag.Name = data.Name;
            tag.Active = data.Active;

            return tag;
        }
    }
}