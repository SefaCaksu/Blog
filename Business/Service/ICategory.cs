using System.Collections.Generic;
using System.Threading.Tasks;
using Dto;

namespace Business.Service
{
    public interface ICategory
    {
        DtoCategory GetById(int id);
        List<DtoCategory> List(string name, bool active);
        void Delete(int id);
        void Edit(DtoCategory category);
        void Add (string name);
    }
}