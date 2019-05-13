using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business;
using Business.Service;
using Entity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using Swashbuckle.AspNetCore.Swagger;
using WebApi.MiddlewareApiResult;

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
            services.AddMvc()
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
            .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            //SEFA-PC\SQLEXPRESS01
            //Add Entity Context
            var connection = @"Server=.;Database=Blog;Trusted_Connection=True;MultipleActiveResultSets=true";//Configuration.GetConnectionString("DatabaseConnection");
            services.AddDbContext<BgContext>(options => options.UseSqlServer(connection, b => b.MigrationsAssembly("WebApi")));

            //Inject Service
            services.AddScoped<IArticle, ArticleService>();
            services.AddScoped<ICategory, CategoryService>();
            services.AddScoped<ITag, TagService>();
            services.AddScoped<IProfile, ProfileService>();
            services.AddScoped<IUser, UserService>();

            //JWT
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
               {
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateAudience = true,
                       ValidAudience = "sefacaksu.blog.com",
                       ValidateIssuer = true,
                       ValidIssuer = "sefa-caksu.blog.com",
                       ValidateLifetime = true,
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = new SymmetricSecurityKey(
                           Encoding.UTF8.GetBytes("key_dedigin_portekiz_somurge_devleti_olmadan_once_portekiz_portokal_bahcelerinde_bulunurdu."))
                   };

                   options.Events = new JwtBearerEvents
                   {
                       OnTokenValidated = ctx =>
                       {
                           return Task.CompletedTask;
                       },
                       OnAuthenticationFailed = ctx =>
                       {
                           Console.WriteLine("Exception:{0}", ctx.Exception.Message);
                           return Task.CompletedTask;
                       }
                   };
               });

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

            app.UseApiResultMiddleware();
            app.UseCors(corsPolicyBuilder =>
                corsPolicyBuilder.WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader()
            );
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseMvc();
            app.UseSwagger().UseSwaggerUI(c =>
               {
                   c.SwaggerEndpoint("/swagger/CoreSwagger/swagger.json", "sefacaksu");
               });
        }
    }
}
