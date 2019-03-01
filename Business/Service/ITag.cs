using System.Collections.Generic;
using System.Threading.Tasks;
using Dto;
namespace Business.Service
{
    public interface ITag
    {
        DtoTag GetById(int id);
        List<DtoTag> List(string name, bool active);
        void Delete(int id);
        void Edit(DtoTag tag);
        void Add (string name);
    }
}