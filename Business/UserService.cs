using Business.Generic;
using Business.Service;
using Dto;
using Entity;

namespace Business
{
    public class UserService : GenericRepository<User>, IUser
    {
        private BgContext dc;
        public UserService(BgContext context) : base(context)
        {
            dc = context;
        }
        public int LogIn(DtoUser user)
        {
            var logUser = base.Find(c => c.Name == user.Name && c.Password == user.Password);

            if (logUser == null)
            {
                return 0;
            }

            return logUser.Id;
        }
    }
}