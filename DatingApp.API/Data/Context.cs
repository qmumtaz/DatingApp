namespace DatingApp.API.Data
{
    using DatingApp.API.Models;
    using Microsoft.EntityFrameworkCore;

public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {   
        }
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        
    }
}