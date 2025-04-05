using Microsoft.EntityFrameworkCore;
using Mission11Bellini.Models;

namespace Mission11Bellini
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Book> Books { get; set; }
    }
}
