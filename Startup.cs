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

            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting(); // PRIMEIRO

            app.UseCors("PermitirTudo"); // ENTRE routing e endpoints

            app.UseAuthorization(); // Se tiver auth, mantém

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers(); // FINAL
            });
        }
    }
}
