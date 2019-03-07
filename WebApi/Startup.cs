using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business;
using Business.Service;
using Entity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;

namespace WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            //SEFA-PC\SQLEXPRESS01
            //Add Entity Context
            var connection = @"Server=.;Database=Blog;Trusted_Connection=True;MultipleActiveResultSets=true";//Configuration.GetConnectionString("DatabaseConnection");
            services.AddDbContext<BgContext>(options => options.UseSqlServer(connection,b => b.MigrationsAssembly("WebApi")));

            //Inject Service
            services.AddSingleton<IArticle, ArticleService>();
            services.AddSingleton<ICategory, CategoryService>();
            services.AddSingleton<ITag, TagService>();
            services.AddSingleton<IProfile, ProfileService>();

            //Add Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("CoreSwagger", new Info
                {
                    Title = "Sefa Çaksu Blog",
                    Version = "1.0.0",
                    Contact = new Contact()
                    {
                        Name = "Sefa Çaksu",
                        Url = "http://sefacaksu.com",
                        Email = "sefacaksu@gmail.com"
                    },
                });
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
            app.UseSwagger().UseSwaggerUI(c =>
               {
                   c.SwaggerEndpoint("/swagger/CoreSwagger/swagger.json", "sefacaksu");
               });
        }
    }
}
