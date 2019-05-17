using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Business.Service;
using Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace WebApi.Controllers
{
    [ApiController]
    public class TokenController : ControllerBase
    {
        readonly IUser _User;
        readonly IConfiguration _Configuration;

        public TokenController(IUser user, IConfiguration configuration)
        {
            _User = user;
            _Configuration = configuration;
        }

        [HttpPost("token")]
        public IActionResult GetToken([FromBody]DtoUser user)
        {
            int userId = _User.LogIn(user);
            if (userId > 0)
                return new ObjectResult(GenerateToken(userId.ToString()));

            return new ObjectResult(0);
        }

        private object GenerateToken(string id)
        {
            var userClaims = new Claim[]{
                new Claim(JwtRegisteredClaimNames.NameId ,id),
            };

            SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_Configuration.GetValue<string>("Auth:IssuerSigningKey")));
            var token = new JwtSecurityToken(
                issuer: _Configuration.GetValue<string>("Auth:ValidIssuer"),
                audience: _Configuration.GetValue<string>("Auth:ValidAudience"),
                claims: userClaims,
                expires: DateTime.Now.AddMinutes(3),
                signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}