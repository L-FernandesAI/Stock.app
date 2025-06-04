using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace EstoqueApp.Data
{
    public class EstoqueDbContextFactory : IDesignTimeDbContextFactory<EstoqueDbContext>
    {
        public EstoqueDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<EstoqueDbContext>();
            optionsBuilder.UseSqlite("Data Source=estoque.db");

            return new EstoqueDbContext(optionsBuilder.Options);
        }
    }
}
