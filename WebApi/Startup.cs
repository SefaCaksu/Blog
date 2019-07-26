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

            //Add Entity Context
            var connection = "Server=.\\;Database=Blog;Trusted_Connection=True;MultipleActiveResultSets=true";//Configuration.GetConnectionString("DatabaseConnection");
            services.AddDbContext<BgContext>(options => options.UseSqlServer(connection, b => b.MigrationsAssembly("WebApi")));

            //Inject Service
            services.AddScoped<IArticle, ArticleService>();
            services.AddScoped<ICategory, CategoryService>();
            services.AddScoped<ITag, TagService>();
            services.AddScoped<IProfile, ProfileService>();
            services.AddScoped<IUser, UserService>();
            services.AddSingleton<IConfiguration>(Configuration);

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
                       ValidAudience = Configuration.GetValue<string>("Auth:ValidAudience"),
                       ValidateIssuer = true,
                       ValidIssuer = Configuration.GetValue<string>("Auth:ValidIssuer"),
                       ValidateLifetime = true,
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetValue<string>("Auth:IssuerSigningKey")))
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
                    Title = Configuration.GetValue<string>("Swagger:Title"),
                    Version = Configuration.GetValue<string>("Swagger:Version"),
                    Contact = new Contact()
                    {
                        Name = Configuration.GetValue<string>("Swagger:Contact:Name"),
                        Url = Configuration.GetValue<string>("Swagger:Contact:Url"),
                        Email = Configuration.GetValue<string>("Swagger:Contact:Email")
                    },
                });

                c.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
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
                corsPolicyBuilder.WithOrigins(Configuration.GetValue<string>("UIUrl"))
                .AllowAnyMethod()
                .AllowAnyHeader()
            );
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseMvc();
            app.UseSwagger().UseSwaggerUI(c =>
               {
                   c.SwaggerEndpoint("/swagger/CoreSwagger/swagger.json", "SpecBlog");
               });
        }
    }
}
