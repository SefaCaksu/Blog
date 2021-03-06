using System.Linq;
using Business.Generic;
using Business.Service;
using Dto;
using Entity;

namespace Business
{
    public class ProfileService : GenericRepository<Profile>, IProfile
    {
        private BgContext dc;
        public ProfileService(BgContext context) : base(context)
        {
            dc = context;
        }

        public DtoProfile GetById()
        {
            var data = dc.Profile.FirstOrDefault();

            DtoProfile profile = new DtoProfile();

            if (data != null)
            {
                profile.Id = data.Id;
                profile.Name = data.Name;
                profile.Title = data.Title;
                profile.Description = data.Description;
                profile.Email = data.Email;
                profile.Facebook = data.Facebook;
                profile.Github = data.GitHub;
                profile.Instagram = data.Instagram;
                profile.Linkedin = data.LinkEdin;
                profile.Medium = data.Medium;
            }

            return profile;
        }

        public void Upsert(DtoProfile profile)
        {
            var data = dc.Profile.FirstOrDefault();

            if (data == null)
            {
                data = new Profile();
                dc.Profile.Add(data);
            }

            data.Name = profile.Name;
            data.Title = profile.Title;
            data.Description = profile.Description;
            data.Email = profile.Email;
            data.Facebook = profile.Facebook;
            data.GitHub = profile.Github;
            data.Instagram = profile.Instagram;
            data.LinkEdin = profile.Linkedin;
            data.Medium = profile.Medium;

            dc.SaveChanges();
        }
    }
}