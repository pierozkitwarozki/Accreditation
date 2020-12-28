using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using API.Repos;
using Microsoft.EntityFrameworkCore;

namespace API.ReposImpl
{
    public class AccreditationPatternRepo : IAccreditationPatternRepo
    {
        private readonly DatabaseContext context;
        public AccreditationPatternRepo(DatabaseContext context)
        {
            this.context = context;
        }
        public async Task AddAsync(AccreditationPattern attachment)
        {
            await context.AddAsync(attachment);
        }

        public void Delete(AccreditationPattern attachment)
        {
            context.Remove(attachment);
        }

        public async Task<IEnumerable<AccreditationPattern>> GetAllAsync()
        {
            return await context.AccreditationPatterns.ToListAsync();
        }

        public async Task<AccreditationPattern> GetAsync(int attachmentId)
        {
            return await context.AccreditationPatterns.FindAsync(attachmentId);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}