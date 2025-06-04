using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SpaServices.Extensions;
using EstoqueApp.Data;
using Microsoft.Extensions.FileProviders;
using System.IO;

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

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("PermitirTudo");

            // 🔥 Serve os arquivos estáticos (incluindo /locales)
            app.UseStaticFiles();

            // 💣 Serve arquivos do SPA (React build)
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            // 👀 Serve /public/locales mesmo fora do build
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(env.ContentRootPath, "ClientApp", "public")),
                RequestPath = ""
            });

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    // 👇 Aponta pro React Dev Server
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
                }
            });
        }
    }
}
