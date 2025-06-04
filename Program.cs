using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace EstoqueApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseUrls("http://0.0.0.0:10000"); // Porta explícita pra Render enxergar
    }
}
