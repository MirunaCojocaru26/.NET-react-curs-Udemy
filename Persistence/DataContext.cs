using System;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {    
        }

        public DbSet<Value> Values {get;set;}
        public DbSet<Activity> Activities {get;set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Value>().HasData(
                new Value{Id = 1, Name ="Prima valoare"},
                new Value{Id = 2, Name ="A doua valoare"},
                new Value{Id = 3, Name ="A treia valoare"},
                new Value{Id = 4, Name ="A patra valoare"}
            );
        }
    }
}
