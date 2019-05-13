using Dto;

namespace Business.Service
{
    public interface IUser
    {
        int LogIn(DtoUser user);
    }
}