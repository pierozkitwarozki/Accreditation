using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Models;
using API.Repos;
using API.Services;
using AutoMapper;

namespace API.ServicesImpl
{
    public class AttachmentService : IAttachmentService
    {
        private readonly IMapper mapper;
        private readonly IAttachmentRepo attachmentRepo;
        public AttachmentService(IMapper mapper, IAttachmentRepo attachmentRepo)
        {
            this.attachmentRepo = attachmentRepo;
            this.mapper = mapper;

        }
        public async Task<IAsyncResult> AddAsync(AttachmentToAdd attachmentToAdd)
        {
            var attachment = mapper.Map<Attachment>(attachmentToAdd);

            await attachmentRepo.AddAsync(attachment);

            if(await attachmentRepo.SaveAllAsync()) return Task.CompletedTask; 

            throw new Exception("Error adding attachment");        
        }

        public async Task<IAsyncResult> DeleteAsync(int attachmentId)
        {
            var attachment = await attachmentRepo.GetAsync(attachmentId);

            if(attachment == null) throw new Exception("Not found");

            attachmentRepo.Delete(attachment);

            if(await attachmentRepo.SaveAllAsync()) return Task.CompletedTask;

            throw new Exception("Error deleting attachment");       
        }

        public async Task<IEnumerable<Attachment>> GetAllAsync()
        {
            var attachments = await attachmentRepo.GetAllAsync();

            if(attachments == null || attachments.Count()==0) throw new Exception("No attachments");

            return attachments;
        }

        public async Task<Attachment> GetAsync(int attachmentId)
        {
            var attachment = await attachmentRepo.GetAsync(attachmentId);

            if(attachment == null) throw new Exception("Not found");

            return attachment;
        }
    }
}