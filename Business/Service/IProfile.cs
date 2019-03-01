using Dto;

namespace Business.Service
{
    public interface IProfile
    {
        DtoProfile GetById();
        void Upsert(DtoProfile profile);
    }

}