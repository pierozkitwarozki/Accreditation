using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DatabaseContext : IdentityDbContext<AppUser, AppRole, int,
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
        public DbSet<AccreditationPattern> AccreditationPatterns { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

             builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(u => u.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(u => u.RoleId)
                .IsRequired();

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