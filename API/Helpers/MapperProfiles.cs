using System.Linq;
using API.Dtos;
using API.Models;
using AutoMapper;

namespace API.Helpers
{
    public class MapperProfiles : Profile
    {
        public MapperProfiles()
        {   
            CreateMap<Attachment, AttachmentToAdd>().ReverseMap();
            CreateMap<AccreditationPattern, AccreditationPatternToAdd>().ReverseMap();
            CreateMap<AppUser, UserToRegister>().ReverseMap();
            CreateMap<UserToReturn, AppUser>();
            CreateMap<AppUser, UserToReturn>()
                .ForMember(u => u.Role, opt => opt.MapFrom(src => src.UserRoles.FirstOrDefault(x => x.UserId==src.Id).Role.Name));
        }
    }
}