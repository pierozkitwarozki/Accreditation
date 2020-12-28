using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
        public DbSet<AccreditationPattern> AccreditationPatterns { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            
          /* builder.Entity<Attachment>()
                .HasOne(p => p.Pattern)
                .WithMany(p => p.Attachments)
                .HasForeignKey(p => p.PatternId)
                .OnDelete(DeleteBehavior.Cascade); */

            builder.Entity<Attachment>()
                .Navigation(x => x.Pattern)
                .AutoInclude();            

            builder.Entity<AccreditationPattern>()
                .Navigation(x => x.Attachments)
                .AutoInclude();
        }
    }
}