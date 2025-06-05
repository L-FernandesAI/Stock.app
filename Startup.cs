using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using EstoqueApp.Data;

namespace EstoqueApp
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<EstoqueDbContext>(options =>
                options.UseSqlite("Data Source=estoque.db"));

            services.AddCors(options =>
            {
                options.AddPolicy("PermitirTudo", builder =>
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader());
            });

            services.AddControllersWithViews();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Joga as migrações no banco no boot da aplicação
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<EstoqueDbContext>();
                context.Database.Migrate(); // SEM ESSA LINHA, TUA TABELA NÃO NASCE
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();             // Primeiro roteia
            app.UseCors("PermitirTudo");  // Depois libera geral
            app.UseAuthorization();       // Aí autentica (se usar auth)

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers(); // E finalmente joga nos controllers
            });
        }
    }
}
