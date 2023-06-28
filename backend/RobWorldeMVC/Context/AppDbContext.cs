using RobWorldeMVC.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Metadata;

namespace backend.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Sessions> Sessions { get; set; }
        public DbSet<Prompts> Prompts { get; set; }
        public DbSet<Attempts> Attempts { get; set; }
        public DbSet<Categories> Categories { get; set; }
    }
}
