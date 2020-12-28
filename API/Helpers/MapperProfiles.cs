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
        }
    }
}