using Dto;

namespace Bussiness.Service
{
    public interface IProfile
    {
        DtoProfile GetById();
        void Upsert(DtoProfile profile);
    }

}