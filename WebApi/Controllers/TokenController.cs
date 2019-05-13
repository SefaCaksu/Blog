using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Business.Service;
using Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace WebApi.Controllers
{
    [ApiController]
    public class TokenController : ControllerBase
    {
        readonly IUser _User;

        public TokenController(IUser user)
        {
            _User = user;
        }

        [HttpPost("token")]
        public IActionResult GetToken([FromBody]DtoUser user)
        {
            int userId = _User.LogIn(user);
            if (userId > 0)
                return new ObjectResult(GenerateToken(userId.ToString()));

            return Unauthorized();
        }
        private string GenerateToken(string id)
        {
            var userClaims = new Claim[]{
                new Claim(JwtRegisteredClaimNames.NameId ,id),
            };

            SecurityKey securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("key_dedigin_portekiz_somurge_devleti_olmadan_once_portekiz_portokal_bahcelerinde_bulunurdu."));
            var token = new JwtSecurityToken(
                issuer: "sefa-caksu.blog.com",
                audience: "sefacaksu.blog.com",
                claims: userClaims,
                expires: DateTime.Now.AddMinutes(3),
                signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}